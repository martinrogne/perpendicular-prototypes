import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Utility service to check which platform we are running on, and get access to the native window
 */
@Injectable()
export class WindowRef {
  /**
   * Constructor
   */
  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  /**
   * Returns true, if we are NOT on server side
   */
  public get isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * Get window object, if in a browser
   */
  public get nativeWindow(): any {
    if (this.isPlatformBrowser) {
      return window;
    } else {
      return null;
    }
  }
}
