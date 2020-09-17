import { BaseModel } from '../base.model';

/**
 * This represents an action to be taken when clicking the the piece of content. This may
 * be a form of redirect to a product or a category (in the form of a SEO url), a prompt
 * to add an item to cart, or other types of interaction.
 *
 * The options for the various types are:
 * - NavigateToSeoToken (target is the token)
 * - NavigateToUrl (target is the url)
 * - AddToCart (target is the partnumber of the item to add)
 * - AddToWishlist (target is the partnumber of the item to add)
 * - AddPromotionAndItemToCart (target is the promotion code, auxiliary is the partnumber)
 * - IssueCoupon (target is the coupon code to add)
 */
export class MarketingAction extends BaseModel {
    /**
     * The type of the action, as associated with a click on the piece of content. The type
     * of action is indicated by the respective enum, and dictates the meaning of the target,
     * and auxiliary.
     */
    public type: MarketingActionType = MarketingActionType.None;

    /**
     * The primary value associated with the action. See the list above for respective mappings.
     */
    public target = '';

    /**
     * The auxiliary value associated with the action, for actions that may perform multiple interactions.
     * This is currently only used in the case of AddPromotionAndItemToCart. See the list above for
     * respective mappings.
     */
    public auxiliary = '';
}

/**
 * Enumeration representing the different types of actions that are available on marketing
 * content when it is created by a business user through the administration tools.
 */
export enum MarketingActionType {
    None,
    NavigateToSeoToken,
    NavigateToUrl,
    AddToCart,
    AddToWishlist,
    DisplayPromotion,
    AddPromotionAndItemToCart,
    IssueCoupon,
}
