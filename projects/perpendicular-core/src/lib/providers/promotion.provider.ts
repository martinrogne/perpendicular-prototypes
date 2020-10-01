import { Promotion } from '../models/promotion.model';

/**
 * Provider to fetch promotion metadata for category and product promotions.
 *
 */
export abstract class IPromotionProvider {
    /**
     * Fetches all promotions that are related to a specific product.
     */
    public abstract getPromotionsForProduct(productId: string): Promise<Promotion>;

    /**
     * Fetches all promotions that are related to a specific category
     */
    public abstract getPromotionsForCategory(categoryId: string): Promise<Promotion>;

    /**
     * Fetches a specific promotion by its "external" identifier. Not to be confused with a promotion code applied
     * by a customer.
     */
    public abstract getPromotionByCode(code: string): Promise<Promotion>;
}
