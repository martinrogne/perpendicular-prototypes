import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Identity, IIdentityService } from 'perpendicular-core';
import { first, mergeMap } from 'rxjs/operators';

/**
 * Authentication interceptor responsible for adding user authentication
 * information to requests performed towards WCS
 */
Injectable({
  providedIn: 'root'
});
export class WCSAuthenticationInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (!req.headers.has('Explicit-Authentication')) {
      return this.injector.get(IIdentityService).state.pipe(
        first(),
        mergeMap(identity => {

          const modifiedRequest = req.clone({
            headers: this.getIdentityHeaders(identity)
          });

          return next.handle(modifiedRequest);
        })
      );
    } else {
      const modifiedRequest = req.clone({
        headers: req.headers.delete('Explicit-Authentication')
      });

      return next.handle(modifiedRequest);
    }
  }

  /**
   * Helper method to prefill headers of outgoing calls with identity tokens, accept types etc.
   */
  protected getIdentityHeaders(identity: Identity | null): HttpHeaders {
    let h: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (!!identity) {
      if (identity.wcToken) {
        h = h.append('WCToken', identity.wcToken);
      }
      if (identity.wcTrustedToken) {
        h = h.append('WCTrustedToken', identity.wcTrustedToken);
      }
      if (identity.inPreviewMode && identity.previewToken) {
        h = h.append('WCPreviewToken', identity.previewToken);
      }
    }
    return h;
  }
}
