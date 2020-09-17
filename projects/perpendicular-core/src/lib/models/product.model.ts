import { AngleImage } from './angleimage.model';
import { Attribute } from './productattribute.model';
import { Attachment } from './attachment.model';
import { BaseModel } from './base.model';

/**
 * A product or sku from the catalog. A product is not buyable in itself, only SKUs are. Products serve as wrappers around
 * multiple variants of a product, based on Size, Color, or other attributes.
 */
export abstract class Product extends BaseModel {
  /**
   * Indicates if this product only has one SKU.
   */
  public hasSingleSKU = false;

  /**
   * Product ID of buyable SKU, if only one SKU is available on the product.
   */
  public singleSKUCatalogEntryID?: string;

  /**
   * The unique ID of the parent product. Only applicable for items (type='ItemBean'), and only
   * for product-level SKUs.
   */
  public parentProductCatalogEntryID?: string;

  /**
   * The unique IDs of the parent categories of the product or SKU in their respective catalogs.
   */
  public parentCategoryIds: Array<string> = [];

  /**
   * The products own ID
   */
  public productId?: string;

  /**
   * Name of product, in users currently selected langauge.
   */
  public name = '';

  /**
   * Short description (255 chars max) on product, in users currently selected language.
   */
  public shortDescription = '';

  /**
   * Long descriptipon (1mb max) on product, in users currently selected language.
   */
  public longDescription = '';

  /**
   * Fully qualified URL for Full Image of products.
   */
  public fullImage = '';

  /**
   * Fully qualified URL for Thumbnail Image of products.
   */
  public thumbnailImage = '';

  /**
   * This list price of the product, in the users currently selected currency. This is the price the product
   * "used" to cost. Can be the same as offer price, if product is not discounted.
   * FIXME: should be a number
   */
  public listPrice = 0;

  /**
   * Offer price of product, in users currently selected currency.  This is the price that is charged on checkout.
   */
  public offerPrice = 0;

  /**
   * 3 letter currency code for price display
   */
  public currency = '';

  /**
   * List of document attachments for the product. Each attachment has a type "DOCUMENT","PVT", or other,
   * and should be grouped as such. The path is a fully qualified URL to either load (in case of images), or
   * direct the user to (in case of PDFs or External References)
   */
  public attachments: Array<Attachment> = [];

  /**
   * List of additional product images for the product.
   */
  public angleimages: Array<AngleImage> = [];

  /**
   * Name of manufacturer of the product
   */
  public manufacturer = '';

  /**
   * The manufacturers partnumber for the given product, in case where these may differ.
   */
  public manufacturerPartnumber = '';

  /**
   * The external identifier for the product. Can be shown to customer.
   */
  public partNumber?: string;

  /**
   * Indicator for whether or not the given product is buyable.
   */
  public isBuyable = false;

  /**
   * Indicator for whether or not the item can be bought as a recurring item
   */
  public isRecurringAllowed = false;

  /**
   * The initial date of announcement for the product.
   */
  public announcementDate?: Date;

  /**
   * The date at which the product was, or will be, withdrawn.
   */
  public withdrawalDate?: Date;

  /**
   * List of defining attributes that must be resolved, before a SKU can be added to the basket.
   */
  public definingAttributes: Array<Attribute> = [];

  /**
   * List of descriptive attributes for display.
   */
  public descriptiveAttributes: Array<Attribute> = [];

  /**
   * List of SKUs associated with this product.
   */
  public skus: Array<Product> = [];

  /**
   * List of components associated with this product. Components are only relevant when dealing
   * with Bundles or Kits, in which case the below is a list of the products, and their associated quantity.
   */
  public components: Array<{ product: Product; quantity: number }> = [];

  /**
   * Product types include
   *   - ProductBean
   *   - BundleBean
   *   - PackageBean
   *   - ItemBean
   */
  public type = '';

  /**
   * Reference to store when product has been initially loaded because it was shown in a marketing spot.
   * Used to signal server that customer saw the product in a marketing context.
   * filled only, when product is loaded from marketing content
   */
  public activityId?: string;

  /**
   * The SEO Slug associated with the product. the SEO Slug is unique in the "Product" namespace.
   */
  public seotoken?: string;

  /**
   * Convenience method to check if product is on sale, and should be shown with a splash, or strike-through price display.
   */
  get onSale(): boolean {
    return this.listPrice != null && this.offerPrice != null && this.listPrice > this.offerPrice;
  }

  /**
   * Returns a snippet that can be used for navigation.
   * If no explicit seotoken is set on this product, we use the productId
   */
  get seoslug(): string {
    if (this.seotoken !== undefined) {
      return this.seotoken;
    }

    return String(this.productId);
  }
}
