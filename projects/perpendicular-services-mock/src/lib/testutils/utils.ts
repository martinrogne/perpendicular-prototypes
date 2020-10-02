export interface ModifiableState<T> {
  emitNewState(data: T): void;
}

export function AsModifiableState<T>(x: unknown): ModifiableState<T> {
  return x as ModifiableState<T>;
}

export function AsSpy(x: unknown): jasmine.Spy {
  return (x as jasmine.Spy);
}

export function AsSpyProperty(object: unknown, methodName: string, accessor: 'get' | 'set'): jasmine.Spy {
  let descriptor = object;
  let proto = object;

  do {
    descriptor = Object.getOwnPropertyDescriptor(proto, methodName);
    proto = Object.getPrototypeOf(proto);
  } while (!descriptor && proto);

  // @ts-ignore
  return (descriptor[accessor] as jasmine.Spy);
}
