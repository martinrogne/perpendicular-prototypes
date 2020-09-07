/* tslint:disable */

import { ActivatedRoute } from '@angular/router';

/**
 * Decorator for binding a field to the data received from a route parameter
 * more easily
 */
export function RouteDataBind(): Function {
  return function(targetClass: any, functionName: PropertyKey, descriptor: any) {
    const original = targetClass.ngOnInit;

    targetClass.ngOnInit = function() {
      original.call(this);

      this.injector.get(ActivatedRoute).data.subscribe((x: any) => {
        if (x[functionName]) {
          targetClass[functionName] = x[functionName];
        }
      });
    }

    return descriptor;
  }
}

/* tslint:enable */
