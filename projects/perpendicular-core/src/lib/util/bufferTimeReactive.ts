import { Observable, Operator, Subscriber, Subscription } from 'rxjs';
import { TeardownLogic, SchedulerLike as IScheduler, OperatorFunction, asyncScheduler } from 'rxjs';

/**
 * Implementation of the subscriber side of the operator - that is the part that handles reacting
 * to changes received from the preceding observable
 */
class BufferTimeReactiveSubscriber<T> extends Subscriber<T> {
  /**
   * The internal subscription to the source
   */
  private bufferedSubscription: Subscription | null = null;

  /**
   * The accumulated array over the timespan, initialized to the empty set
   */
  private accumulatedValue: T[] = [];

  /**
   * Indicator for whether a value has been received
   */
  private hasValue = false;

  /**
   * Default constructor
   */
  constructor(public destination: Subscriber<T>, private dueTime: number, private limitCount: number, private scheduler: IScheduler) {
    super(destination);
  }

  /**
   * Handler for emitting the next value to the target receiver
   */
  public bufferedNext(): void {
    this.clearBuffer();

    if (this.hasValue) {
      this.destination.next(this.accumulatedValue as any);
      this.accumulatedValue = [];
      this.hasValue = false;
    }
  }

  /**
   * Handler for receiving an internal value
   */
  protected _next(value: T): void {
    this.clearBuffer();
    this.accumulatedValue.push(value);
    this.hasValue = true;
    this.add((this.bufferedSubscription = this.scheduler.schedule(dispatchNext as any, this.dueTime, this)));

    if (this.accumulatedValue.length >= this.limitCount) {
      this.bufferedNext();
    }
  }

  /**
   * Handler for completion
   */
  protected _complete(): void {
    this.bufferedNext();
    this.destination.complete();
  }

  /**
   * Handler for clearing the buffer internally
   */
  private clearBuffer(): void {
    const bufferedSubscription = this.bufferedSubscription;

    if (bufferedSubscription !== null) {
      this.remove(bufferedSubscription);
      bufferedSubscription.unsubscribe();
      this.bufferedSubscription = null;
    }
  }
}

/**
 * Default implementation of the bufferTimeReactive internals, handling the subscription to the source, and
 * the emission of values after time.
 */
class BufferTimeReactiveOperator<T> implements Operator<T, T[]> {
  /**
   * Default constructor
   */
  constructor(private dueTime: number, private limitCount: number, private scheduler: IScheduler) {}

  /**
   * Handle for the source subscription
   */
  call(subscriber: Subscriber<T[]>, source: any): TeardownLogic {
    return source.subscribe(new BufferTimeReactiveSubscriber(subscriber, this.dueTime, this.limitCount, this.scheduler));
  }
}

/**
 * Function declaration for the new operator for RxJS Observables. It is a mixture of the implementation of
 * bufferTime and debounceTime. It addresses a concern with the default bufferTime implementation that arises
 * from the fact that the default .bufferTime starts its timer immediately, and continously emits, even if
 * no input is received.
 *
 * bufferedTimeReactive, by comparison, will only start its timer once an input is received on the subscriber,
 * in a similar fashion to how debounceTime operates.
 */
export function bufferTimeReactive<T>(
  dueTime: number,
  limitCount: number,
  scheduler: IScheduler = asyncScheduler,
): OperatorFunction<T, T[]> {
  return function bufferTimeReactiveOperatorFunction(source: Observable<T>): Observable<T[]> {
    return source.lift(new BufferTimeReactiveOperator(dueTime, limitCount, scheduler));
  };
}

/**
 * Scheduled handler for when a value should be emitted, based on the timer
 */
function dispatchNext(subscriber: BufferTimeReactiveSubscriber<any>): void {
  subscriber.bufferedNext();
}
