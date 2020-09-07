/* tslint:disable */

/**
 * Decorator for binding a field to the data from a stateful service
 */
export function ServiceStateBind(service: any): Function {
  return function(targetClass: any, functionName: PropertyKey, descriptor: any) {
    const original = targetClass.ngOnInit;

    targetClass.ngOnInit = function() {
      original.call(this);

      this.injector.get(service).state.subscribe((x: any) => {
        targetClass[functionName] = x;
      });
    }

    return descriptor;
  }
}

/* tslint:enable */
