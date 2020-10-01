import { Injectable } from '@angular/core';
import { Promotion } from '../models/promotion.model';

/**
 * A stateless UI service that allows looking up information about promotions.
 *
 * FIXME: Should be a registry?
 */
@Injectable()
export abstract class IPromotionService<PromotionType extends Promotion = Promotion> {
  /**
   * Returns any promotions that apply to a specific product.
   *
   * NOTE this is intended for use on the Product Detail page, as it is not necessarily quick to determine.
   *
   * @param productId the id of the product or sku currently being displayed.
   */
  public abstract getPromotionsForProduct(productId: string): Promise<PromotionType>;

  /**
   * Returns any promotions that apply to a specific product.
   *
   * @param categoryId the id of the category currently being displayed.
   */
  public abstract getPromotionsForCategory(categoryId: string): Promise<PromotionType>;

  /**
   * Looks up a promotion by its external identifier.
   *
   * @param code the external identifier of the promotion to find. Not to be confused with promtionCodes added by a customer to a cart.
   */
  public abstract getPromotionByCode(code: string): Promise<PromotionType>;
}
