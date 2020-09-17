import { Order } from '../models/order.model';
import { OrderHistoryQuery } from '../models/order-history.model';
import { OrderHistoryResult } from '../models/order-history.model';
import { ISearchFactory } from './base.factory';

/**
 * An abstract factory to create instances of [[OrderHistory]]
 */
export abstract class IOrderHistoryFactory extends ISearchFactory<Order, OrderHistoryQuery, OrderHistoryResult> {}
