import { Injectable } from '@angular/core';

import { SEOToken, ISEOTokenFactory } from 'perpendicular-core';
import { WCSSEOToken } from 'perpendicular-models-wcs';

/**
 * An backend specific factory to create instances of [[SEOToken]]
 */
@Injectable()
export class WCSSEOTokenFactory extends ISEOTokenFactory {
  /**
   * Default constructor
   */
  constructor() {
    super();
  }

  /**
   * Creates a new [[SEOToken]]
   */
  public newInstance(): SEOToken {
    return new WCSSEOToken();
  }

  /**
   * Deserializes a new  [[SEOToken]] from a backend response from [[ISEOTokenProvider]]
   */
  public newInstanceFromJSON(json: any, tokenTypeFromQuery?: string, tokenValueFromQuery?: string): SEOToken {
    const result: SEOToken = this.composeSEOToken(json, tokenTypeFromQuery, tokenValueFromQuery);

    return Object.freeze(result);
  }

  /**
   * Deserializes the main object. Serves as extension point. Each object should have its own
   * composeXXX function.
   */
  protected composeSEOToken(json: any, tokenTypeFromQuery?: string, tokenValueFromQuery?: string): SEOToken {
    const result = this.newInstance() as SEOToken;

    result.type = json.tokenName || tokenTypeFromQuery;
    result.urlkeyword = json.urlKeywordName || json.desktopURLKeyword;
    result.tokenValue = json.tokenValue || tokenValueFromQuery;
    result.isActive = Number(json.status) === 1;
    result.id = '' + json.urlKeywordId;

    return result;
  }
}
