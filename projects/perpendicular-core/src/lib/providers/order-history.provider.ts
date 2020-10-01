import { OrderHistoryQuery, OrderHistoryResult } from '../models/order-history.model';
import { ISearchProvider } from './base.search.provider';
import { Order } from '../models/order.model';

/**
 * Provider to fetch [[OrderHistory]] from backend systems.
 *
 * It has been moved to its own provider for now.
 * Eventually this will merge into the OrderService proper, so we dont have two services for fetching
 * order-sets
 */
export abstract class IOrderHistoryProvider extends ISearchProvider<Order, OrderHistoryQuery, OrderHistoryResult> {}
