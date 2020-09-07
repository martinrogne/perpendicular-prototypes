import { SimpleChanges } from '@angular/core';


/* tslint:disable */

/**
 * Decorator for reacting to when an input changes its value, to easily be able
 * to declare an input that may have side effects
 */
export function OnInputChange(): Function {
  return function(targetClass: any, functionName: PropertyKey, descriptor: any) {
    const key = Symbol();
    const callbackKey = functionName.toString() + 'Changed';
    const callback = targetClass[callbackKey];

    if (!callback) {
      throw new Error('Missing implementation for callback handler ' + callbackKey);
    }

    Object.defineProperty(targetClass, functionName, {
      set: function(value: any) {

        if (value !== this[key]) {
          this[key] = value;

          callback.call(this, this[key]);
        }
      },
      get: function(): any {
        return this[key];
      }
    });

    return descriptor;
  }
}

/* tslint:enable */
