import { BaseModel } from './base.model';

/**
 * This class represents a payment method option for display to the customer.
 *
 */
export class PaymentInformation extends BaseModel {
    /**
     * Display value for this payment method, in the users currently selected language.
     */
    public description = '';

    /**
     * Internal name of payment method
     */
    public paymentMethodName?: string;

    /**
     * Internal reference to which contract the payment method was authorized under.
     */
    public paymentTermConditionId?: string;

    /**
     * Indicates which details type should be shown. For credit cards this could be a component with
     * card number, expiration date, and cvc, while for invoicing it could contain just the customer number
     * that will be invoiced.
     */
    public attrPageName?: string;

    /**
     * Internal identifier of the payment methods validation policies.
     */
    public policyId?: string;
    // TODO: maybe add an array of usableBillingAddress

    /**
     * Deserializer from backend service
     */
    public fill(backendObject: any): void {
        this.description = backendObject.description;
        this.paymentMethodName = backendObject.paymentMethodName;
        this.paymentTermConditionId = backendObject.paymentTermConditionId;
        this.attrPageName = backendObject.xumet_attrPageName;
        this.policyId = backendObject.xumet_policyId;
    }
}
