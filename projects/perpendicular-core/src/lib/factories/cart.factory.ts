import { CartItemComponent } from './../models/cart/cartitemcomponent.model';
import { Inject, Injectable } from '@angular/core';

import { Cart } from '../models/cart/cart.model';

/**
 * A factory to deserialize profile information about an open basket from WebSphere Commerce.
 */
@Injectable()
export abstract class ICartFactory {
    /**
     * Instantiates a new cart model.
     */
    public abstract newInstance(): Cart;

    /**
     * Instantiates a new Cart object, and deserializes the json coming from WebSphere Commerce.
     */
    public abstract newInstanceFromJSON(json: any): Cart;

    /**
     * Returns a new mutable cart item component, initialzed with the passed values.
     */
    public abstract newCartItemComponent(productId: string, quantity: number): CartItemComponent;

    /**
     * Returns a new immutable cart item component, initialzed with data from the backend.
     */
    public abstract newCartItemComponentFromJson(json: any): CartItemComponent;
}
