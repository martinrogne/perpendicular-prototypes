import { first, filter, debounceTime } from 'rxjs/operators';
import { EventEmitter, Injectable, Inject, Optional } from '@angular/core';
import { INotificationService, UIMessage, UIMessageType } from 'perpendicular-core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { NOTIFICATION_SERVICE_STABLE_DELAY } from 'perpendicular-core';

/**
 * Implements a generic message notification system, for the different subsystems to bubble up
 * textual messages to the end user.
 *
 * The idea is that the frontend defines something to read from the [[messages]] subject and display
 * either a popup, a message box or something entirely different in response to each message.
 *
 *
 * There are three kinds of information you can get from this service:
 *
 * - Notifications when background work start and stop
 * - General messages (through the messages observable)
 *
 */
@Injectable()
export class NotificationService extends INotificationService {
  /**
   * Raises an event when the backend provider layer starts or finishes an external HTTP call.
   * Can be used for other long running processes also. The event contains a "reference count" number. If the
   * number is 0, all background work has stopped. If its non-zero, that means some processes are running in the background.
   *
   * You can use this to optionally put up a spinner, when a background service has worked for more than 200 ms.
   */
  public working: EventEmitter<number>;

  public stableDelay = 50;
  private pendingRequestsSubject: BehaviorSubject<number>;
  private refCnt = 0;
  private internalMessages: Subject<UIMessage>;

  /**
   * Default constructor. You should not instantiate this directly; rather get it from the Dependency Injection framework.
   *
   */
  constructor(
    @Optional()
    @Inject(NOTIFICATION_SERVICE_STABLE_DELAY)
    public configStableDelay?: number,
  ) {
    super();
    this.internalMessages = new Subject<UIMessage>();
    this.working = new EventEmitter<number>();
    this.pendingRequestsSubject = new BehaviorSubject(0);
    this.stableDelay = configStableDelay || 50;

    this.working.asObservable().subscribe(x => {
      this.pendingRequestsSubject.next(x);
    });
  }

  /**
   * An observable you can subscribe to, to be notifed on all messages that are passed through the system.
   *
   * @example
   *
   * ## to log all error messages to the console
   * ```
   *   notificationService.messages.filter(x=>x.type == UIMessageType.ERROR).subscribe( x=> {
   *       console.log("An error occured ", x.message);
   *   });
   * ```
   */
  public get messages(): Observable<UIMessage> {
    return this.internalMessages;
  }

  /**
   * Used to notifiy listeners that a backend service call, or other long running process, is in progress
   */
  public backendCallStarted(): void {
    // FIXME: Should do reference counting, and only raise event if more than 1.4 seconds have elapsed
    this.refCnt++;
    this.working.next(this.refCnt);
  }

  /**
   * Used to notifiy listeners that a backend service call, or other long running process, has terminated.
   * It is important to ensure you always call this, if called the [[backendCallStarted()]] function.
   */
  public backendCallEnded(): void {
    this.refCnt--;
    if (this.refCnt < 0) {
      this.refCnt = 0;
    }
    this.working.next(this.refCnt);
  }

  /**
   * Helper function to create a success message.
   * @param messageKey a key like __ERR_ORDER_UPDATE_FAILED_CATENTRY_UNKNOWN that can be used to look up a translated text
   * @param messageCode a code for the specific error 'ERR4004'
   * @param params a map of returned values that relate to the error. The product id that couldnt be added, for instance.
   */
  public success(messageKey: string, messageCode?: string, parameters?: unknown): void {
    this.addMessage(UIMessageType.SUCCESS, messageKey, messageCode, parameters);
  }

  /**
   * Helper function to create an error message.
   * @param messageKey a key like __ERR_ORDER_UPDATE_FAILED_CATENTRY_UNKNOWN that can be used to look up a translated text
   * @param messageCode a code for the specific error 'ERR4004'
   * @param params a map of returned values that relate to the error. The product id that couldnt be added, for instance.
   */
  public error(messageKey: string, messageCode?: string, parameters?: unknown): void {
    this.addMessage(UIMessageType.ERROR, messageKey, messageCode, parameters);
  }

  /**
   * Helper function to create an alert message.
   * @param messageKey a key like __ERR_ORDER_UPDATE_FAILED_CATENTRY_UNKNOWN that can be used to look up a translated text
   * @param messageCode a code for the specific error 'ERR4004'
   * @param params a map of returned values that relate to the error. The product id that couldnt be added, for instance.
   */
  public warn(messageKey: string, messageCode?: string, parameters?: unknown): void {
    this.addMessage(UIMessageType.WARN, messageKey, messageCode, parameters);
  }

  /**
   * Helper function to create an info message.
   * @param messageKey a key like __ERR_ORDER_UPDATE_FAILED_CATENTRY_UNKNOWN that can be used to look up a translated text
   * @param messageCode a code for the specific error 'ERR4004'
   * @param params a map of returned values that relate to the error. The product id that couldnt be added, for instance.
   */
  public info(messageKey: string, messageCode?: string, parameters?: unknown): void {
    this.addMessage(UIMessageType.INFO, messageKey, messageCode, parameters);
  }

  /**
   * Function to push an already prepared UI message type to the right channel.
   * Note: We *could* do this more efficiently by just stuffing it in the channel directly,
   * but I prefer a single flow of data through the layers.
   */
  public bare(message: UIMessage): void {
    switch (message.type) {
      case UIMessageType.SUCCESS:
        this.success(message.messageKey || '', message.messageCode, message.parameters);
        break;
      case UIMessageType.WARN:
        this.warn(message.messageKey || '', message.messageCode, message.parameters);
        break;
      case UIMessageType.ERROR:
        this.error(message.messageKey || '', message.messageCode, message.parameters);
        break;
      case UIMessageType.INFO:
        this.info(message.messageKey || '', message.messageCode, message.parameters);
        break;
    }
  }

  /**
   * Resolves when more than 250ms has elapsed since the last
   * request reported as done.
   */
  public get stable(): Promise<void> {
    return this.pendingRequestsSubject
      .asObservable()
      .pipe(
        debounceTime(this.stableDelay),
        filter(x => x === 0),
        first(),
      )
      .toPromise()
      .then(x => {
        return Promise.resolve();
      });
  }

  private addMessage(type: UIMessageType, messageKey: string, messageCode?: string, parameters?: unknown): void {
    const msg: UIMessage = new UIMessage();
    msg.type = type;
    msg.messageKey = messageKey;
    msg.messageCode = messageCode || '';
    msg.parameters = parameters;
    this.internalMessages.next(msg);
  }
}
