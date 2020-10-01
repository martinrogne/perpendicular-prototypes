import { PaymentInstruction } from '../models/payment-instruction.model';
/**
 * UI service to manage payment instructions on the current cart.
 * FIXME: This should be part of the cart service, i think
 *
 */
export abstract class IPaymentInstructionService {
  /**
   * Adds a payment instruction to the cart, with optional overrides to total amount and billing address
   *
   * @param payMethodId the name of the payment method to add. Usually extracted from [[ICartService#getValidPaymentMethods]]
   * @param piAmount total amount to pay using this payment instruction
   * @param billingAddressId the address to put down as billing address
   */
  public abstract addPaymentInstruction(instruction: PaymentInstruction, piAmount: string, billingAddressId: string): Promise<void>;

  /**
   * Adds a payment instruction and prepares it for checkout, by merging in any protocol data required from backend
   * before finalizing it
   */
  public abstract addPaymentInstructionCheckout(instruction: PaymentInstruction, piAmount: string, billingAddressId: string): Promise<void>;

  /**
   * Removes all payment instructions from the current cart.
   */
  public abstract deleteAllPaymentInstructionsFromCart(): Promise<void>;

  /**
   * Override this to validate the protocol data of the payment method before calling the server
   *
   * @return if the validation fails, return the error code, otherwise return null;
   */
  public abstract validatePaymentInstruction(instruction: PaymentInstruction, piAmount: string, billingAddressId: string): string;

  /**
   * Some payment methods need to be enriched from the backend, before they can be placed.
   * @returns the combined set of protocol data
   */
  protected abstract mergeProtocolDataWithDefault(instruction: PaymentInstruction): Promise<any>;
}
