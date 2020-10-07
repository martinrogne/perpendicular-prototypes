import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { HttpClient } from '@angular/common/http';
import { ProvidersWCSConfig, PERPENDICULAR_HTTP, ICartFactory } from 'perpendicular-core';
import { WCSCartFactory } from 'perpendicular-factories-wcs';
import { WCSCartProvider } from './wcs-cart.provider';

describe('WCSCartProvider', () => {
  let spectator: SpectatorHttp<WCSCartProvider>;
  const createService = createHttpFactory({
    service: WCSCartProvider,
    mocks: [
      WCSCartFactory
    ],
    providers: [
      ProvidersWCSConfig,
      { provide: PERPENDICULAR_HTTP, useExisting: HttpClient },
      { provide: ICartFactory, useExisting: WCSCartFactory },
    ]
  });

  beforeEach(() => spectator = createService());

  it('should create an instance', () => {
    expect(spectator.service).toBeDefined();
  });

  xdescribe('configuration', () => {

  });

  describe('get cart', () => {
    it('should be able to get the current cart', () => {
      const product = spectator.service.getCart();

      spectator.expectOne('/wcs/resources/store/0/cart/@self', HttpMethod.GET);
    });

    it('will forward the response to the factory', () => {
      const product = spectator.service.getCart();

      const http = spectator.expectOne('/wcs/resources/store/0/cart/@self', HttpMethod.GET);

      http.flush({});

      expect(spectator.service.cartFactory.newInstanceFromJSON).toHaveBeenCalledTimes(1);
      expect(spectator.service.cartFactory.newInstanceFromJSON).toHaveBeenCalledWith({});
    });
  });

  describe('basic cart operations', () => {
    it('should be able to add a single item to cart', () => {
      const product = spectator.service.addToCart(['ID-1000'], [1]);

      const req = spectator.expectOne('/wcs/resources/store/0/cart', HttpMethod.POST);
      const body = req.request.body;

      expect(body.orderItem).toBeDefined();
      expect(body.orderItem.length).toBe(1);
    });

    it('should be able to add multiple items to cart', () => {
      const product = spectator.service.addToCart(['ID-1000', 'ID-1001'], [2]);

      const req = spectator.expectOne('/wcs/resources/store/0/cart', HttpMethod.POST);
      const body = req.request.body;

      expect(body.orderItem).toBeDefined();
      expect(body.orderItem.length).toBe(2);
    });

    it('should be able to update the quantity of an item in cart', () => {
      const product = spectator.service.adjustQuantity('ID-1000', 5);

      const req = spectator.expectOne('/wcs/resources/store/0/cart/@self/update_order_item', HttpMethod.PUT);
      const body = req.request.body;

      expect(body.orderItem).toBeDefined();
      expect(body.orderItem.length).toBe(1);
    });

    it('should be be able to delete an item from cart', () => {
      const product = spectator.service.removeFromCart('ID-1000');

      const req = spectator.expectOne('/wcs/resources/store/0/cart/@self/delete_order_item', HttpMethod.PUT);
      const body = req.request.body;

      expect(body.orderItemId).toBe('ID-1000');
    });
  });
});
