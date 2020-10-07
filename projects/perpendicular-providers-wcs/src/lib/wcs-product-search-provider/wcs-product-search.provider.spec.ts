import { WCSProductSearchProvider } from './wcs-product-search.provider';
import { createHttpFactory, HttpMethod, mockProvider, SpectatorHttp } from '@ngneat/spectator';
import {
  IIdentityService,
  IProductFactory,
  PERPENDICULAR_HTTP,
  ProductSearchQuery,
  ProductSearchSortMethod,
  ProvidersWCSConfig
} from 'perpendicular-core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { WCSProductFactory } from 'perpendicular-factories-wcs';

describe('WCSProductSearchProvier', () => {
  let spectator: SpectatorHttp<WCSProductSearchProvider>;
  const createService = createHttpFactory({
    service: WCSProductSearchProvider,
    mocks: [
      ProvidersWCSConfig,
      WCSProductFactory
    ],
    providers: [
      { provide: PERPENDICULAR_HTTP, useExisting: HttpClient },
      { provide: IProductFactory, useExisting: WCSProductFactory },
      mockProvider(IIdentityService, {
        state: new BehaviorSubject(undefined)
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should create an instance', () => {
    expect(spectator.service).toBeDefined();
  });

  describe('configuration', () => {
    xit('should be able to toggle contract resolution', () => {
      expect(spectator.service.contractId).toBe('10');
    });

    xit('should be able to set the search type', () => {
      expect(spectator.service.searchType).toBe('10');
    });

    xit('should set the base parameters to construct the base urls', () => {
      expect(spectator.service.contractId).toBe('10');
    });
  });

  describe('by id', () => {
    it('should be able to get a product by id', () => {
      const product = spectator.service.getProductById('1');

      spectator.expectOne('null/byIds?id=1', HttpMethod.GET);
    });

    it('will forward the response to the factory', () => {
      const product = spectator.service.getProductById('1');

      const http = spectator.expectOne('null/byIds?id=1', HttpMethod.GET);

      http.flush({});

      expect(spectator.service.productFactory.newInstancesFromJSON).toHaveBeenCalledTimes(1);
      expect(spectator.service.productFactory.newInstancesFromJSON).toHaveBeenCalledWith({});
    });
  });

  describe('by ids', () => {
    it('should be able to get multiple products by ids', () => {
      const product = spectator.service.getProductById(['1', '2', '3']);

      spectator.expectOne('null/byIds?id=1&id=2&id=3', HttpMethod.GET);
    });

    it('will forward the response to the factory', () => {
      const product = spectator.service.getProductById(['1', '2', '3']);

      const http = spectator.expectOne('null/byIds?id=1&id=2&id=3', HttpMethod.GET);

      http.flush({});

      expect(spectator.service.productFactory.newInstancesFromJSON).toHaveBeenCalledTimes(1);
      expect(spectator.service.productFactory.newInstancesFromJSON).toHaveBeenCalledWith({});
    });
  });

  describe('by partnumber', () => {
    it('should be able to get a product by id', () => {
      const product = spectator.service.getProductByPartnumber('P1');

      spectator.expectOne('null/P1', HttpMethod.GET);
    });

    it('will forward the response to the factory', () => {
      const product = spectator.service.getProductByPartnumber('P1');

      const http = spectator.expectOne('null/P1', HttpMethod.GET);

      http.flush({});

      expect(spectator.service.productFactory.newInstanceFromJSON).toHaveBeenCalledTimes(1);
      expect(spectator.service.productFactory.newInstanceFromJSON).toHaveBeenCalledWith({});
    });
  });

  describe('by query', () => {
    describe('search term', () => {
      it('should add the search term to the query, with default parameters', () => {
        const query = new ProductSearchQuery();
        query.searchTerm = 'term';

        const product = spectator.service.getByQuery(query);
        spectator.expectOne(
          'null/bySearchTerm/term?' +
          'searchSource=E&searchType=1000&pageSize=10&pageNumber=1&intentSearchTerm=term',
          HttpMethod.GET);
      });

      it('should be able to set the page size', () => {
        const query = new ProductSearchQuery();
        query.searchTerm = 'term';
        query.pageSize = 20;

        const product = spectator.service.getByQuery(query);

        spectator.expectOne(
          'null/bySearchTerm/term?' +
          'searchSource=E&searchType=1000&pageSize=20&pageNumber=1&intentSearchTerm=term',
          HttpMethod.GET);
      });

      it('should be able to set the page number', () => {
        const query = new ProductSearchQuery();
        query.searchTerm = 'term';
        query.pageNumber = 5;

        const product = spectator.service.getByQuery(query);

        spectator.expectOne(
          'null/bySearchTerm/term?' +
          'searchSource=E&searchType=1000&pageSize=10&pageNumber=5&intentSearchTerm=term',
          HttpMethod.GET);
      });

      it('should be able to set the sorting', () => {
        const query = new ProductSearchQuery();
        query.searchTerm = 'term';
        query.sortMethod = ProductSearchSortMethod.PRODUCTNAME;

        const product = spectator.service.getByQuery(query);

        spectator.expectOne(
          'null/bySearchTerm/term?' +
          'searchSource=E&searchType=1000&pageSize=10&pageNumber=1&orderBy=2&intentSearchTerm=term',
          HttpMethod.GET);
      });

      it('should be able to set the category id in combination with a search term', () => {
        const query = new ProductSearchQuery();
        query.categoryId = '1000';
        query.searchTerm = 'term';

        const product = spectator.service.getByQuery(query);

        spectator.expectOne(
          'null/bySearchTerm/term?' +
          'searchSource=E&searchType=1000&pageSize=10&pageNumber=1&intentSearchTerm=term&categoryId=1000',
          HttpMethod.GET);
      });

      it('will forward the response and the query to the factory', () => {
        const query = new ProductSearchQuery();
        query.categoryId = '1000';
        query.searchTerm = 'term';

        const product = spectator.service.getByQuery(query);

        const http = spectator.expectOne(
          'null/bySearchTerm/term?' +
          'searchSource=E&searchType=1000&pageSize=10&pageNumber=1&intentSearchTerm=term&categoryId=1000',
          HttpMethod.GET);

        http.flush({});

        expect(spectator.service.productFactory.newSearchResultInstanceFromJSON).toHaveBeenCalledTimes(1);
        expect(spectator.service.productFactory.newSearchResultInstanceFromJSON).toHaveBeenCalledWith({}, query);
      });
    });

    describe('category id', () => {
      it('should add the category id to the query, with default parameters', () => {
        const query = new ProductSearchQuery();
        query.categoryId = '1000';

        const product = spectator.service.getByQuery(query);

        spectator.expectOne(
          'null/byCategory/1000?searchSource=E&searchType=1000&pageSize=10&pageNumber=1',
          HttpMethod.GET);
      });

      it('will forward the response and the query to the factory', () => {
        const query = new ProductSearchQuery();
        query.categoryId = '1000';

        const product = spectator.service.getByQuery(query);

        const http = spectator.expectOne(
          'null/byCategory/1000?searchSource=E&searchType=1000&pageSize=10&pageNumber=1',
          HttpMethod.GET);

        http.flush({});

        expect(spectator.service.productFactory.newSearchResultInstanceFromJSON).toHaveBeenCalledTimes(1);
        expect(spectator.service.productFactory.newSearchResultInstanceFromJSON).toHaveBeenCalledWith({}, query);
      });
    });
  });
});
