import { EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

export enum UIMessageType {
  SUCCESS = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}
/**
 * This class contains a message and a type for the message.
 * It is used by the notification framework to raise log style events to the rest of the world.
 *
 * The type can be one of
 * - SUCCESS
 * - INFO
 * - WARN
 * - ERROR
 *
 */
export class UIMessage {
  /**
   * The type of message.
   */
  public type?: UIMessageType;

  /**
   * The localization key of the message
   */
  public messageKey?: string;

  /**
   * The code of the message, if any
   */
  public messageCode?: string;

  /**
   * A map of parameters of the message, if any
   */
  public parameters?: any;

  /**
   * Constructor
   */
  constructor(type?: UIMessageType, messageKey?: string, messageCode?: string, parameters?: any) {
    this.type = type;
    this.messageCode = messageCode;
    this.messageKey = messageKey;
    this.parameters = parameters;
  }
}

/**
 * Defines a UI service that can be used by components to tell the surrounding framework the status of an ongoing action.
 */
export abstract class INotificationService {
  /**
   * Event emitter that reports how many background services are currently in progress.
   */
  public abstract working: EventEmitter<number>;

  /**
   * List of messages that have been raised for end user display.
   */
  public abstract messages: Observable<UIMessage>;

  /**
   * Returns a promise that resolves when all outstanding requests
   * have been completed, for 250 ms.
   *
   * Usually only relevant to test cases that want to ensure every side effect
   * has been applied, before continuing to the next.
   */
  public abstract stable: Promise<void>;

  /**
   * Call this when starting a long running task, to notify frontend that it might be a while before the response comes.
   */
  public abstract backendCallStarted(): void;
  /**
   * Call this when ending a long running task.
   */
  public abstract backendCallEnded(): void;

  /**
   * Helper function to create a success message.
   * @param messageKey a key like __ERR_ORDER_UPDATE_FAILED_CATENTRY_UNKNOWN that can be used to look up a translated text
   * @param messageCode a code for the specific error 'ERR4004'
   * @param params a map of returned values that relate to the error. The product id that couldnt be added, for instance.
   */
  public abstract success(messageKey: string, messageCode?: string, parameters?: any): void;

  /**
   * Helper function to create a error message.
   * @param messageKey a key like __ERR_ORDER_UPDATE_FAILED_CATENTRY_UNKNOWN that can be used to look up a translated text
   * @param messageCode a code for the specific error 'ERR4004'
   * @param params a map of returned values that relate to the error. The product id that couldnt be added, for instance.
   */
  public abstract error(messageKey: string, messageCode?: string, parameters?: any): void;

  /**
   * Helper function to create an alert message.
   * @param messageKey a key like __ERR_ORDER_UPDATE_FAILED_CATENTRY_UNKNOWN that can be used to look up a translated text
   * @param messageCode a code for the specific error 'ERR4004'
   * @param params a map of returned values that relate to the error. The product id that couldnt be added, for instance.
   */
  public abstract warn(messageKey: string, messageCode?: string, parameters?: any): void;

  /**
   * Helper function to create an info message.
   * @param messageKey a key like __ERR_ORDER_UPDATE_FAILED_CATENTRY_UNKNOWN that can be used to look up a translated text
   * @param messageCode a code for the specific error 'ERR4004'
   * @param params a map of returned values that relate to the error. The product id that couldnt be added, for instance.
   */
  public abstract info(messageKey: string, messageCode?: string, parameters?: any): void;

  /**
   * Helper function to raise any type of UI message. Will transfer it to the proper channel.
   */
  public abstract bare(message: UIMessage): void;
}
