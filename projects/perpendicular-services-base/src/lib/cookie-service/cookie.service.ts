import { PERPENDICULAR_DEFAULT_COOKIE_EXPIRY_IN_SECONDS, ICookieService } from 'perpendicular-core';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, APP_BASE_HREF } from '@angular/common';
import { DOCUMENT } from '@angular/common';

declare var navigator: Navigator;

/**
 * A cookie service for client side
 */
@Injectable()
export class CookieService extends ICookieService {
  /**
   * Constructor.
   */
  constructor(
    @Inject(APP_BASE_HREF) public baseHref: string,
    /* tslint:disable */
    @Inject(DOCUMENT) public document: any,
    /* tslint:enable */
    @Inject(PLATFORM_ID) public platformId: number,
    @Inject(PERPENDICULAR_DEFAULT_COOKIE_EXPIRY_IN_SECONDS) public defaultExpiry: number,
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
    if (!this.isCookiesEnabled()) {
      return;
    }

    const cookieName = encodeURIComponent(name);
    const cookieValue = encodeURIComponent(value);

    let expiryString = '';
    if (!sessionOnly) {
      const d = this.calculateExpiry(name);
      expiryString = `expires=${d.toUTCString()};`;
    }
    let pathString = this.getCookiePath(name);
    if (!!pathString) {
      pathString = `path=${pathString};`;
    }

    let domainString = this.getCookieDomain(name);
    if (!!domainString) {
      domainString = `domain=${domainString}`;
    }

    let secureString = '';
    if (this.createCookieSecure(name)) {
      secureString = 'secure;';
    }

    this.document.cookie = `${cookieName}=${cookieValue};${pathString}${expiryString}${domainString}${secureString}`;
  }

  /**
   * Returns the first value set with for a cookie.
   * Returns empty string, if the cookie did not exist.
   */
  public get(name: string): string {
    if (!this.isCookiesEnabled()) {
      return '';
    }

    const cookieName = encodeURIComponent(name);
    if (this.document.cookie === '') {
      return '';
    }

    const regExp = this.getCookieRegExp(cookieName);
    const result = regExp.exec(this.document.cookie);
    if (result && result.length > 0) {
      return decodeURIComponent(result[1]);
    }
    return '';
  }

  /**
   * Deletes all cookies with the provided name.
   */
  public delete(name: string): void {
    if (!this.isCookiesEnabled()) {
      return;
    }
    const cookieName = encodeURIComponent(name);
    const expiryString = 'Thu, 01 Jan 1970 00:00:01 GMT;';
    let pathString = this.getCookiePath(name);
    if (!!pathString) {
      pathString = `path=${pathString};`;
    }

    let domainString = this.getCookieDomain(name);
    if (!!domainString) {
      domainString = `domain=${domainString}`;
    }

    let secureString = '';
    if (this.createCookieSecure(name)) {
      secureString = 'secure;';
    }

    this.document.cookie = `${cookieName}=;${pathString}${expiryString}${domainString}${secureString}`;
  }

  /**
   * checks if cookies are enabled on the current platform
   */
  public isCookiesEnabled(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (!!this.document && typeof navigator !== 'undefined' && navigator && navigator.cookieEnabled) {
        return true;
      }
    }
    return false;
  }

  /**
   * return all the cookies names
   */
  public getAllCookies(): string[] {
    if (this.isCookiesEnabled()) {
      return this.document.cookie.split(';').reduce((cookies: string[], cookie: string) => {
        const [name, value] = cookie.split('=').map((c: string) => c.trim());
        cookies.push(name);
        return cookies;
      }, []);
    }
    return [];
  }

  /**
   * delete old cookies with the same prefix before saving new cookies
   */
  public setWithUniquePrefix(prefix: string, name: string, value: string, sessionOnly: boolean): void {
    for (const cookie of this.getAllCookies()) {
      if (!!cookie && cookie.startsWith(prefix) && cookie !== name) {
        this.delete(cookie);
      }
    }
    this.set(name, value, sessionOnly);
  }

  /**
   *
   * checks if cookie should be created as a ssl-only cookie.
   * Defaults to false;
   */
  protected createCookieSecure(name: string): boolean {
    return false;
  }

  /**
   * returns domain that cookies should be created under.
   * Defaults to nothing;
   */
  protected getCookieDomain(name: string): string {
    return '';
  }

  /**
   * returns path that cookies should be created for.
   * Defaults to BASE_HREF
   */
  protected getCookiePath(name: string): string {
    return this.baseHref || '/';
  }

  /**
   * Calculates expiry for the specific cookie
   */
  protected calculateExpiry(name: string): Date {
    const d = new Date();
    d.setTime(d.getTime() + this.defaultExpiry * 1000);
    return d;
  }

  /**
   * Taken from https://github.com/7leads/ngx-cookie-service/blob/master/lib/cookie-service/cookie.service.ts
   */
  private getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');
    return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
  }
}
