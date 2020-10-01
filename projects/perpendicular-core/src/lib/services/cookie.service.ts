import { Injectable, Inject } from '@angular/core';

/**
 * A generic service to access cookies.
 */
@Injectable()
export abstract class ICookieService {
  public abstract set(name: string, value: string, sessionOnly: boolean): void;
  public abstract get(name: string): string;
  public abstract delete(name: string): void;
  public abstract isCookiesEnabled(): boolean;
  public abstract getAllCookies(): string[];
  public abstract setWithUniquePrefix(prefix: string, name: string, value: string, sessionOnly: boolean): void;
}
