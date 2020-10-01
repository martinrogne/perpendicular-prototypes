import { BaseModel } from './base.model';

/**
 * This class represents an instance of a payment method on an order.
 * It cannot exist without an associated order object, so no back-pointer is available.
 */
export class PaymentInstruction extends BaseModel {
    /**
     * The payment instruction internal identifier
     */
    public aymentInstructionId?: string;

    /**
     * Status of the payment instruction
     * FIXME: Add enumeration
     */
    public status = '';

    /**
     * The billing address associated with the payment
     */
    public billingAddressId?: string;

    /**
     * The amount in as decimal associated with this payment instruction
     */
    public amount = 0;

    /**
     * 3 letter currency code of the currency of the amount
     */
    public currency = '';

    /**
     * Optional description
     */
    public description = '';

    /**
     * If payment method is a Punch Out payment, this will be the URL to forward the customer to.
     */
    public punchoutURL = '';

    /**
     * "code" of payment method used for this instruction
     */
    public paymentMethodName = '';

    /**
     * helper value to determine if a payment instruction is a punchout instruction.
     * You must override the [[IPaymentInstructionFactory]] and provide your own logic for
     * setting this to true, based on the payment method or order data provided.
     */
    public isPunchoutPaymentInstruction = false;

    /**
     * Protocol data. The data needed by the backend to finalize this payment instruction.
     * Could be things like
     *  - CVC
     *  - Line of credit account number
     */
    public protocolData: any = {};
}
