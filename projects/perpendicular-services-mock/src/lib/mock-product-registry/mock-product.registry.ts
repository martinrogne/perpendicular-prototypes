import { Injectable } from '@angular/core';
import { IProductRegistry, Product, IProductFactory } from 'perpendicular-core';

/**
 * Mock version of [[IProductRegistry]] with data fed from [[ProductTestDataGenerator]].
 */
@Injectable()
export class MockProductRegistry extends IProductRegistry {
  /**
   * See [[IProductRegistry]]
   */
  constructor(public factory: IProductFactory) {
    super();
    spyOn(this as IProductRegistry, 'getProduct').and.callThrough();
    spyOn(this as IProductRegistry, 'getProductByPartnumber').and.callThrough();
  }

  /**
   * See [[IProductRegistry]]
   */
  public getProduct(productId: string): Promise<Product> {
    return Promise.resolve(this.factory.newInstance());
  }

  /**
   * See [[IProductRegistry]]
   */
  public getProductByPartnumber(partnumber: string): Promise<Product> {
    return Promise.resolve(this.factory.newInstance());
  }

  /**
   * See [[IProductRegistry]]
   */
  protected fetchItem(...lookupParams: unknown[]): Promise<Product> {
    return Promise.resolve(this.factory.newInstance());
  }
}
