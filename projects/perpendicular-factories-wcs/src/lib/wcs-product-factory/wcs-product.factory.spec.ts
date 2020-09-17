import { WCSProductFactory } from './wcs-product.factory';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ProvidersWCSConfig } from 'perpendicular-core';

import single from './data/product-single-response.json';
import multiple from './data/product-multiple-response.json';
import search from './data/product-search-response.json';


fdescribe('WCSProductFactory', () => {
  let spectator: SpectatorService<WCSProductFactory>;
  const createService = createServiceFactory({
    service: WCSProductFactory,
    mocks: [
      ProvidersWCSConfig
    ],
    providers: [
    ]
  });

  beforeEach(() => spectator = createService());

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('single product', () => {
    it('should be able to deserialize a product entity from JSON', () => {
      const product = spectator.service.newInstanceFromJSON(single);

      expect(product.productId).toBe('10114');
    });

    xit('should verify the origin of the object being server', () => {

    });

    xit('should verify that an invalide response returns a placeholder', () => {

    });
  });

  describe('multiple products', () => {
    it('should be able to deserialize multiple product entitiees from JSON', () => {
      const products = spectator.service.newInstancesFromJSON(multiple);

      expect(products.length).toBe(3);
      expect(products[0].productId).toBe('10114');
      expect(products[1].productId).toBe('10115');
      expect(products[2].productId).toBe('10116');
    });

    xit('should verify the origin of the object being server', () => {

    });

    xit('should verify that an invalide response returns a placeholder', () => {

    });
  });

  describe('search result', () => {
    it('should be able to deserialize a search result from JSON', () => {
      const query = spectator.service.newQueryInstance();
      const result = spectator.service.newSearchResultInstanceFromJSON(search, query);

      expect(result.query).toBe(query);
      expect(result.products.length).toBe(24);
      expect(result.products[0].productId).toBe('10114');
    });

    xit('should verify the origin of the object being server', () => {

    });

    xit('should verify that an invalide response returns a placeholder', () => {

    });
  });
});
