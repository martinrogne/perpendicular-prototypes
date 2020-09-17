import { Inject } from '@angular/core';

import { PaymentMethod } from '../models/payment-method.model';
/**
 * This class serves as an extension point for projects to hook into, and override specific model classes and their
 * deserialization.
 *
 * Perpendicular default behavior is to not know anything about how classes gets filled in. This is left as an excercies for the
 * backend components. That means, that all models here, are abstract superclasses, where each
 * backend component have to provide their own logic on how to deserialize the backend result message into the model.
 */
export abstract class IPaymentMethodFactory {
    /**
     * instantiates a new PaymentMethod object
     */
    public abstract newInstance(): PaymentMethod;

    /**
     * instantiates a new PaymentMethod object from JSON
     */
    public abstract newInstanceFromJSON(json: any): PaymentMethod;
}
