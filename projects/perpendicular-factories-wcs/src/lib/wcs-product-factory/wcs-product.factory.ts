import { Inject, Injectable, Optional } from '@angular/core';
import {
  AngleImage,
  Attribute,
  AttributeValue,
  Facet,
  FacetValue,
  IAttachmentFactory,
  IProductFactory,
  Product,
  ProductSearchQuery,
  ProductSearchResult,
  ProductSearchSortMethod,
  PRODUCTSEARCH_DEFAULT_PAGESIZE,
} from 'perpendicular-core';

import { ProvidersWCSConfig } from 'perpendicular-core';
import { WCSProduct } from 'perpendicular-models-wcs';

/**
 * A factory to instantiate and deserialize product information from WebSphere Commerce.
 */
@Injectable()
export class WCSProductFactory extends IProductFactory {
  public imageBaseUrl: string;
  public attachmentBaseUrl: string;
  /**
   * The default page size to use. Can be configured by injecting a config value  for token PRODUCTSEARCH_DEFAULT_PAGESIZE
   */
  private defaultPageSize: number;

  /**
   * Default Constructor. Do not instantiate this directly. Get it from the DI framework.
   *
   * @param imageBaseUrl base URL to prepend to all non-absolute image paths.
   * @param attachmentBaseUrl base URL to prepend to all non-absolute image paths.
   */
  constructor(
    protected config: ProvidersWCSConfig,
    @Optional() protected attachmentFactory: IAttachmentFactory,
    @Optional()
    @Inject(PRODUCTSEARCH_DEFAULT_PAGESIZE)
      configDefaultPageSize: number,
  ) {
    super();
    this.imageBaseUrl = config.imageBaseUrl || '';
    this.attachmentBaseUrl = config.attachmentBaseUrl || '';
    this.defaultPageSize = configDefaultPageSize || 12;
  }

  /**
   * Instantiates a new [[WCSProduct]]
   */
  public newInstance(): Product {
    return new WCSProduct();
  }

  /**
   * Instantiates a new [[WCSProduct]] from deserializing a product response from WebSphere Commerce.
   *
   * @param json product result from calling WebSphere Commerce *productview* REST service.
   */
  public newInstanceFromJSON(json: any): Product {
    let product = this.newInstance();

    if (json && json.catalogEntryView && json.catalogEntryView[0]) {
      product = this.composeProduct(json.catalogEntryView[0]);
    }

    return Object.freeze(product);
  }

  /**
   * Instantiates a new [[WCSProduct]] from deserializing a product response from WebSphere Commerce.
   *
   * @param json product result from calling WebSphere Commerce *productview* REST service.
   */
  public newInstancesFromJSON(json: any): Array<Product> {
    const products: Array<Product> = [];

    if (json && json.catalogEntryView) {
      for (const p of  json.catalogEntryView)  {
        products.push(this.composeProduct(p));
      }
    }

    return products;
  }

  /**
   * Returns a fresh query object
   */
  public newQueryInstance(q?: ProductSearchQuery): ProductSearchQuery {
    const nq = new ProductSearchQuery(q);
    if (!!q) {
      nq.pageSize = q.pageSize;
    } else {
      nq.pageSize = this.defaultPageSize;
    }
    return nq;
  }

  /**
   * Returns a new search result without facets and with default sorting
   */
  public newResultInstance(totalCount: number, pageNumber: number, data: Product[], query: ProductSearchQuery): ProductSearchResult {
    return new ProductSearchResult(totalCount, pageNumber, data, [], new Facet(), [], ProductSearchSortMethod.RELEVANCY, query);
  }

  /**
   * Instantiates a new product search result from the backends json representation
   */
  public newSearchResultInstanceFromJSON(json: any, query: ProductSearchQuery): ProductSearchResult {
    let result = this.newResultInstance(0, 1, [], query);

    if (!!json) {
      result = this.composeSearchResultInstance(json, query);
    }

    return Object.freeze(result);
  }

  /**
   * Instantiates a new facet from the backends json representation
   */
  public newFacetInstance(): Facet {
    return new Facet();
  }

  /**
   * Instantiates a new facet from the backends json representation
   */
  public newFacetInstanceFromJSON(json: any): Facet {
    const result = this.composeFacetInstance(json);
    return Object.freeze(result);
  }

  /**
   * Instantiates a new facet value
   */
  public newFacetValueInstance(): FacetValue {
    return new FacetValue();
  }

  /**
   * Instantiates a new facet value from the backends json representation
   */
  public newFacetValueInstanceFromJSON(json: any): FacetValue {
    const result = this.composeFacetValueInstance(json);
    return Object.freeze(result);
  }

  protected composeFacetValueInstance(json: any): FacetValue {
    const facetvalue = this.newFacetValueInstance();

    // prettify price facets
    if (json.label.startsWith('({')) {
      const l = json.label.match(/\{(.*)[\]\}]/);
      if (!!l) {
        // l should now be * 100, or * TO 100, normalize it first.
        let matchedValue = l[1];
        matchedValue = matchedValue.replace(' TO ', ' ');

        // then split
        const range = matchedValue.split(' ');
        if (range[0] === '*') {
          facetvalue.name = 'Less than ';
        } else {
          facetvalue.name = range[0] + ' - ';
        }
        if (range[1] !== '*') {
          facetvalue.name += range[1];
        }
      } else {
        facetvalue.name = json.label;
      }
    } else {
      facetvalue.name = json.label;
    }
    facetvalue.value = json.value;
    facetvalue.count = json.count;
    return facetvalue;
  }

  protected composeFacetInstance(json: any): Facet {
    const facet = this.newFacetInstance();
    facet.name = json.name || '';
    facet.facetAttr = json.value;

    for (const fv of json.entry) {
      const facetValue = this.newFacetValueInstanceFromJSON(fv);
      facet.values.push(facetValue);
    }

    return facet;
  }

  protected composeSearchResultInstance(json: any, query: ProductSearchQuery): ProductSearchResult {
    const result = this.newResultInstance(0, 1, [], query);
    result.sortMethod = query.sortMethod;
    if (!json) {
      return result;
    }

    let newPageNumber = 0;
    if (json.recordSetTotal > 0) {
      newPageNumber = Math.ceil((Number(json.recordSetStartNumber) + 1) / query.pageSize);
    }

    // in case the new result lies *after* the page we are looking at.
    if (newPageNumber > query.pageNumber) {
      query.pageNumber = newPageNumber;
    }

    result.totalCount = Number(json.recordSetTotal);
    result.pageNumber = newPageNumber;

    if (!!json.catalogEntryView) {
      for (const pJson of json.catalogEntryView) {
        const product = this.composeProduct(pJson);
        result.result.push(product);
      }
    }

    if (!!json.facetView) {
      for (const fJson of json.facetView) {
        const facet = this.newFacetInstanceFromJSON(fJson);

        if (facet.facetAttr === 'parentCatgroup_id_search') {
          result.categoryFacet = facet;
        } else {
          result.facets.push(facet);
        }
      }
    }

    if (json.metaData && json.metaData.spellcheck && json.metaData.spellcheck.length > 0) {
      result.spellCheck = json.metaData.spellcheck;
    } else {
      result.spellCheck = [];
    }

    result.totalPages = Math.ceil(result.totalCount / query.pageSize);

    return result;
  }

  protected composeProduct(json: any): Product {
    const p: WCSProduct = this.newInstance() as WCSProduct;

    p.productId = String(json.uniqueID);
    p.name = json.name;
    p.seotoken = json.seotoken;

    // deal with store based seo token overrides. If a product has multiple tokens, they are returned
    // semi-kolon seperated. Its not exactly clear though, what order they come in, so we just grab the last, as it will
    // we just as right as any other.
    if (p.seotoken && p.seotoken.indexOf(';') > -1) {
      const tokens = p.seotoken.split(';');
      p.seotoken = tokens[tokens.length - 1];
    }
    p.shortDescription = json.shortDescription;
    p.longDescription = json.longDescription;
    p.thumbnailImage = this.makeUrl(this.imageBaseUrl, json.thumbnail);
    p.isBuyable = json.buyable === 'true';
    p.isRecurringAllowed = json.disallowRecurringOrder === '0';
    p.manufacturerPartnumber = json.mfPartNumber_ntk;
    p.parentProductCatalogEntryID = !!json.parentCatalogEntryID ? String(json.parentCatalogEntryID) : undefined as unknown as string;

    if (json.parentCatalogGroupID) {
      if (json.parentCatalogGroupID instanceof Array) {
        for (const id of json.parentCatalogGroupID) {
          const categorySplit: string[] = id.split('_', 2);

          if (categorySplit[0] === '' + this.config.catalogId) {
            p.parentCategoryIds.push(categorySplit[1]);
          }
        }
      } else {
        p.parentCategoryIds.push(json.parentCatalogGroupID);
      }
    }

    p.components = new Array<{ product: Product; quantity: number }>();
    if (json.components) {
      for (const c of json.components) {
        const quantity: number = Number(c.quantity);
        const component: Product = this.newInstanceFromJSON(c);

        p.components.push({ product: component, quantity });
      }
    }

    if (json.startDate) {
      p.announcementDate = new Date(json.startDate);
      if (!p.announcementDate || isNaN(p.announcementDate.getTime())) {
        p.announcementDate = this.convertDate(json.startDate);
      }
    }

    if (json.endDate) {
      p.withdrawalDate = new Date(json.endDate);
      if (!p.withdrawalDate || isNaN(p.withdrawalDate.getTime())) {
        p.withdrawalDate = this.convertDate(json.endDate);
      }
    }

    if (!json.fullImage && json.thumbnailImage) {
      p.fullImage = p.thumbnailImage;
    } else {
      p.fullImage = this.makeUrl(this.imageBaseUrl, json.fullImage);
    }
    p.manufacturer = json.manufacturer;
    p.partNumber = json.partNumber;
    p.type = json.catalogEntryTypeCode;

    for (const priceIdx in json.price) {
      if (!json.price.hasOwnProperty(priceIdx)) {
        continue;
      }

      const price = json.price[priceIdx];

      if (price.value !== '' && price.value !== null) {
        if ('Display' === price.usage) {
          p.listPrice = Number(price.value);
          p.currency = price.currency;
        }
        if ('Offer' === price.usage) {
          p.offerPrice = Number(price.value);
          p.currency = price.currency;
        }
      }
    }

    if (Number.isNaN(p.offerPrice)) {
      p.offerPrice = undefined as unknown as number;
    }

    if (p.listPrice === undefined || Number.isNaN(p.listPrice)) {
      p.listPrice = p.offerPrice;
    }

    p.attachments = new Array();
    p.angleimages = new Array();

    this.composeAngleImages(p, json);

    for (const otherAttachmentIdx in json.attachments) {
      if (!json.attachments.hasOwnProperty(otherAttachmentIdx)) {
        continue;
      }

      const attachment = json.attachments[otherAttachmentIdx];

      if (this.attachmentFactory) {
        if (attachment.usage !== 'ANGLEIMAGES_FULLIMAGE' && attachment.usage !== 'ANGLEIMAGES_THUMBNAIL') {
          p.attachments.push(this.attachmentFactory.newInstanceFromJSON(attachment));
        }
      }
    }

    p.hasSingleSKU = json.hasSingleSKU;
    if (json.singleSKUCatalogEntryID) {
      p.singleSKUCatalogEntryID = String(json.singleSKUCatalogEntryID);
    }

    if (json.catalogEntryTypeCode === 'ItemBean') {
      p.hasSingleSKU = true;
      p.singleSKUCatalogEntryID = p.productId;
    }

    // Parse attributes
    p.definingAttributes = new Array();
    p.descriptiveAttributes = new Array();

    for (const attributeIdx in json.attributes) {
      if (!json.attributes.hasOwnProperty(attributeIdx)) {
        continue;
      }

      const attribute = json.attributes[attributeIdx];
      const attr: Attribute = new Attribute();

      attr.name = attribute.name;
      attr.sequence = Number(attribute.sequence);
      attr.displayable = attribute.displayable;
      attr.comparable = attribute.comparable;
      attr.identifier = attribute.identifier;
      attr.isImageAttribute = false;

      for (const valueIdx in attribute.values) {
        if (!attribute.values.hasOwnProperty(valueIdx)) {
          continue;
        }

        const attrVal: AttributeValue = new AttributeValue();
        const inAttrValue = attribute.values[valueIdx];
        attrVal.identifier = inAttrValue.identifier;
        attrVal.value = inAttrValue.value;
        if (inAttrValue.image1path !== undefined) {
          attr.isImageAttribute = true;
          attrVal.imageurlSelected = this.makeUrl(this.imageBaseUrl, inAttrValue.image1path);

          // HOLY CRAP THIS IS STUPID
          attrVal.imageurlDeselected = attrVal.imageurlSelected.replace('_enabled', '_disabled');
        }
        attr.values.push(attrVal);
      }

      if (attribute.usage === 'Defining') {
        p.definingAttributes.push(attr);
      }
      if (attribute.usage === 'Descriptive') {
        p.descriptiveAttributes.push(attr);
      }
    }
    if (!!p.definingAttributes) {
      // sequence on item and product can be different.., so for now, we simply sort them by identifier.
      p.definingAttributes.sort((x: Attribute, y: Attribute) => (x.identifier || '').localeCompare(y.identifier || ''));
    }
    // Parse SKU's
    for (const skuIdx in json.sKUs) {
      if (!json.sKUs.hasOwnProperty(skuIdx)) {
        continue;
      }

      p.skus.push(this.newInstanceFromJSON(json.sKUs[skuIdx]));
    }

    let userData = {};
    if (json.UserData && json.UserData.length > 0) {
      userData = json.UserData[0];
    }

    this.composeUserData(p, userData);

    return p;
  }

  protected composeUserData(p: WCSProduct, json: any): void {
    p.length = Number(json.length) || 0;
    p.width = Number(json.width) || 0;
    p.height = Number(json.height) || 0;
    p.weight = Number(json.weight) || 0;
    p.unitOfMeasure = json.quantityUnitOfMeasure || 'C62';
    p.weightUnitOfMeasure = json.weightUnitOfMeasure || 'KGM';
    p.dimensionsUnitOfMeasure = json.sizeUnitOfMeasure || 'CMT';
    p.nominalQuantity = Number(json.nominalQuantity) || 1;
    p.quantityMultiple = Number(json.quantityMultiple) || 1;
  }

  /**
   * Helper function to deal with weird time format returned from wc9
   */
  protected convertDate(s: string): Date {
    const parts = s.split(' ');
    const months: any = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
    const month: string = months[parts[1]];
    if (parts.length > 5 && month) {
      return new Date(parts[5] + '-' + month + '-' + parts[2]);
    }
    return undefined as unknown as Date;
  }

  protected composeAngleImages(p: Product, json: any): void {
    // first, iterate to find angle images FULL
    for (const fuAttachmentIdx in json.attachments) {
      if (!json.attachments.hasOwnProperty(fuAttachmentIdx)) {
        continue;
      }

      const attachment = json.attachments[fuAttachmentIdx];
      if (attachment.usage === 'ANGLEIMAGES_FULLIMAGE') {
        const ai: AngleImage = new AngleImage();
        ai.fullImage = this.makeUrl(this.attachmentBaseUrl, attachment.attachmentAssetPath);
        p.angleimages.push(ai);
      }
    }

    let imageIdx = 0;
    for (const thAttachmentIdx in json.attachments) {
      if (!json.attachments.hasOwnProperty(thAttachmentIdx)) {
        continue;
      }

      const attachment = json.attachments[thAttachmentIdx];
      if (attachment.usage === 'ANGLEIMAGES_THUMBNAIL') {
        p.angleimages[imageIdx++].thumbnailImage = this.makeUrl(this.attachmentBaseUrl, attachment.attachmentAssetPath);
      }
    }
  }

  protected makeUrl(base: string, value: string): string {
    if (!value) {
      return undefined as unknown as string;
    }

    if (value.toLowerCase().startsWith('http')) {
      return value;
    }

    if (!base.endsWith('/')) {
      base += '/';
    }

    if (value.startsWith('/')) {
      value = value.substr(1);
    }

    return base + value;
  }
}
