import { BaseModel } from './base.model';

/**
 * This class represents the association between a SEO Slug and the value it represents.
 * I.e. between "asperin", and product ID: 12356. SEO Tokens are grouped into different namespaces for
 * Category, Product and Content pages.
 */
export class SEOToken extends BaseModel {
  /**
   * Namespace of SEO Token,
   *   - Product
   *   - Category
   *   - Content
   */
  public type = '';

  /**
   * The value the keyword corrosponds to. Ie if type is "Product", then the
   * token value 123456, means "the keyword 'xxx' maps to product id 123456"
   */
  public tokenValue?: string;

  /**
   * The keyword seen on the URL.
   */
  public urlkeyword?: string;

  /**
   * Indicates if this is the most current seo token for this product.
   * If its false, it means its a historic seo token, but the value will still be ok.
   */
  public isActive = false;

  /**
   * ID of seo token
   */
  public id?: string;
}
