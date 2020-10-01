import { BaseModel } from './base.model';

/**
 * This class represents a payment method option for display to the customer.
 *
 */
export class PaymentMethod extends BaseModel {
    /**
     * Display value for this payment method, in the users currently selected language.
     */
    public description = '';

    /**
     * Internal name of payment method
     */
    public paymentMethodName?: string;
}
