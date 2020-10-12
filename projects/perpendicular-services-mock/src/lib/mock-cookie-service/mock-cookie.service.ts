import { Injectable } from '@angular/core';
import { ICookieService } from 'perpendicular-core';

/**
 * A cookie service for client side
 */
@Injectable()
export class MockCookieService extends ICookieService {
  /**
   * See [[ICookieService]]
   */
  constructor() {
    super();

    spyOn(this as ICookieService, 'set').and.callThrough();
    spyOn(this as ICookieService, 'get').and.callThrough();
    spyOn(this as ICookieService, 'delete').and.callThrough();
    spyOn(this as ICookieService, 'isCookiesEnabled').and.callThrough();
    spyOn(this as ICookieService, 'getAllCookies').and.callThrough();
    spyOn(this as ICookieService, 'setWithUniquePrefix').and.callThrough();
  }

  /**
   * See [[ICookieService]]
   */
  public set(name: string, value: string, sessionOnly: boolean): void {}

  /**
   * See [[ICookieService]]
   */
  public get(name: string): string {
    return '';
  }

  /**
   * See [[ICookieService]]
   */
  public delete(name: string): void {}

  /**
   * See [[ICookieService]]
   */
  public isCookiesEnabled(): boolean {
    return true;
  }

  /**
   * See [[ICookieService]]
   */
  public getAllCookies(): string[] {
    return [];
  }

  /**
   * See [[ICookieService]]
   */
  public setWithUniquePrefix(prefix: string, name: string, value: string, sessionOnly: boolean): void {}
}
