import { EventEmitter, Injectable } from '@angular/core';
import { INotificationService, UIMessage } from 'perpendicular-core';
import { ReplaySubject, Observable } from 'rxjs';
import { ModifiableState } from '../testutils/utils';

@Injectable()
export class MockNotificationService extends INotificationService implements ModifiableState<UIMessage> {
  /**
   * Event emitter that reports how many background services are currently in progress.
   */
  public working: EventEmitter<number>;

  /**
   * See [[INotificationService]]
   */
  public internalState: ReplaySubject<UIMessage>;

  /**
   * See [[INotificationService]]
   */
  public stable = Promise.resolve();

  /**
   * See [[INotificationService]]
   */
  constructor() {
    super();
    this.internalState = new ReplaySubject();
    this.working = new EventEmitter<number>();

    spyOn(this as INotificationService, 'backendCallStarted').and.callThrough();
    spyOn(this as INotificationService, 'backendCallEnded').and.callThrough();
    spyOn(this as INotificationService, 'success').and.callThrough();
    spyOn(this as INotificationService, 'error').and.callThrough();
    spyOn(this as INotificationService, 'warn').and.callThrough();
    spyOn(this as INotificationService, 'info').and.callThrough();
    spyOn(this as INotificationService, 'bare').and.callThrough();
  }

  /**
   * See [[INotificationService]]
   */
  public get messages(): Observable<UIMessage> {
    return this.internalState.asObservable();
  }

  /**
   * See [[INotificationService]]
   */
  backendCallStarted(): void {}
  /**
   * See [[INotificationService]]
   */
  backendCallEnded(): void {}
  /**
   * See [[INotificationService]]
   */
  success(messageKey: string, messageCode?: string, parameters?: unknown): void {}
  /**
   * See [[INotificationService]]
   */
  error(messageKey: string, messageCode?: string, parameters?: unknown): void {}
  /**
   * See [[INotificationService]]
   */
  warn(messageKey: string, messageCode?: string, parameters?: unknown): void {}
  /**
   * See [[INotificationService]]
   */
  info(messageKey: string, messageCode?: string, parameters?: unknown): void {}
  /**
   * See [[INotificationService]]
   */
  bare(message: UIMessage): void {}

  /**
   * See [[INotificationService]]
   */
  emitNewState(data: UIMessage): void {
    this.internalState.next(data);
  }
}
