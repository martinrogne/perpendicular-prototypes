import { Inject, Injectable } from '@angular/core';

import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderitem.model';
import { OrderSearchQuery, OrderSearchResult } from './../models/order-search.model';
import { ISearchFactory } from '../factories/base.factory';

/**
 * A factory to deserialize profile information about an open basket from WebSphere Commerce.
 */
@Injectable()
export abstract class IOrderFactory  extends ISearchFactory<Order, OrderSearchQuery, OrderSearchResult> {
}
