import { Injectable } from '@angular/core';
import { ICookieService } from 'perpendicular-core';

/**
 * A cookie service for client side
 */
@Injectable()
export class PrototypeCookieService extends ICookieService {
  /**
   * Constructor.
   */
  constructor(
  ) {
    super();
  }

  /**
   * Creates the cookie, provided cookies are enabled.
   * If sessionOnly is true, the cookie is created as a session cookie. Otherwise
   * it is created with the default expiry.
   *
   * Cookies are by default created non-secure. You can override this, if by overriding `isCookieSecure`
   * Cookies are by default domainless. You can override this, if by overriding `getCookieDomain`
   * If you need to have different timeouts pr cookie, you can override `calculateExpiry`
   * in you local implementation
   */
  public set(name: string, value: string, sessionOnly: boolean): void {
  }

  /**
   * Returns the first value set with for a cookie.
   * Returns empty string, if the cookie did not exist.
   */
  public get(name: string): string {
    return '';
  }

  /**
   * Deletes all cookies with the provided name.
   */
  public delete(name: string): void {
  }

  /**
   * checks if cookies are enabled on the current platform
   */
  public isCookiesEnabled(): boolean {
    return false;
  }

  /**
   * return all the cookies name
   */
  public getAllCookies(): string[] {
    return [];
  }

  /**
   * delete old cookies with the same prefix before saving new cookies
   */
  public setWithUniquePrefix(prefix: string, name: string, value: string, sessionOnly: boolean): void {
  }
}
