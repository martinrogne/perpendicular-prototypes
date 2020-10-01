import { BaseModel } from '../base.model';

/**
 * Types of monetary adjustment applied to a cart, or cart item. Typically a discount.
 */
export enum AdjustmentUsageType {
    /**
     * Unknown, or unmapped adjustment type
     */
    Other = -99,
    /**
     * The tax value of any applied surcharges
     */
    SurchargeTax = -9,
    /**
     * Interest of installment plan
     */
    InstallmentAdjustment = -8,
    /**
     * Indicates this adjustment discounts the shipping fee
     */
    ShippingAdjustment = -7,
    /**
     * Any surcharges applied due to payment options or shipping methods
     */
    Surcharge = -6,
    /**
     * Value of coupons applied to cart
     */
    Coupon = -5,
    /**
     * Value of tax on shipping fee for this cart
     */
    ShippingTax = -4,
    /**
     * Value of sales tax on items in cart.
     */
    SalesTax = -3,
    /**
     * The shipping fee
     */
    Shipping = -2,
    /**
     * Indicates this adjustment discounts the product total of the item or the cart entirely.
     */
    Discount = -1,
}

/**
 * This class represents a promotion or adjustment applied to a cart or cart item.
 * This class is purely for presentational purposes. You do not need to manually tally the value of the
 * adjustments. This is already done in the Cart/Order/CartItem/OrderItem classes.
 */
export class Adjustment extends BaseModel {
    /**
     * What kind of adjustment this is, i.e. Discount on shipping or Discount on product and so forth. See [[AdjustmentUsageType]]
     */
    public usage: AdjustmentUsageType = AdjustmentUsageType.Other;

    /**
     * Internal code of adjustment. Not for display
     */
    public code?: string;

    /**
     * Description of adjustment, for display purposes
     */
    public description = '';

    /**
     * Value of adjustment
     */
    public amount = 0;

    /**
     * Currency of adjustment
     */
    public currency = '';
}
