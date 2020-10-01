import { take, filter } from 'rxjs/operators';
import { Injectable, Optional, Inject } from '@angular/core';

import {
  IProductSearchProvider,
  ISEORegistry,
  ISEOTokenFactory,
  IIdentityService,
  PRODUCTSEARCH_BUFFER_TIME,
  PRODUCTSEARCH_BUFFER_LIMIT,
} from 'perpendicular-core';
import { IProductRegistry } from 'perpendicular-core';
import { Product, SEOToken, IProductFactory, bufferTimeReactive } from 'perpendicular-core';
import { Subject, Observable } from 'rxjs';
import { PRODUCTREGISTRY_CLEAR_ON_IDENTITY_CHANGE } from 'perpendicular-core';

export class ProductRegistryResult {
  constructor(public product: Product, public isFound: boolean) {}
}
/**
 * This class serves as a caching front for fetching single catentry records.
 * I.e. if your minibasket needs to fetch a particular item.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductRegistry extends IProductRegistry {
  /**
   * A queue of fetches that must be completed
   */
  protected fetchQueue: Subject<string> = new Subject<string>();

  /**
   * Queue of products that were resolved from server
   */
  protected receiveQueue: Subject<ProductRegistryResult> = new Subject<ProductRegistryResult>();

  /**
   * The buffer time. -1 means no buffering.
   */
  protected bufferTime: number;

  /**
   * The limit on the amount of events or requests that may be buffered.
   */
  protected bufferLimit: number;

  /**
   * Default constructor. Handled by the DI framework.
   *
   * @param searchProvider a backend communication layer provider that can do product searches.
   */
  constructor(
    public searchProvider: IProductSearchProvider,
    public productFactory: IProductFactory,
    public identityService: IIdentityService,
    @Inject(PRODUCTREGISTRY_CLEAR_ON_IDENTITY_CHANGE) public clearOnIdentityChange: boolean,
    @Optional() protected seoRegistry: ISEORegistry,
    @Optional() protected seoFactory: ISEOTokenFactory,
    @Optional()
    @Inject(PRODUCTSEARCH_BUFFER_TIME)
    protected configBufferTime: number,
    @Optional()
    @Inject(PRODUCTSEARCH_BUFFER_LIMIT)
    protected configBufferLimit: number,
  ) {
    super();

    this.bufferTime = configBufferTime || 50;
    this.bufferLimit = configBufferLimit || 6;
    this.fetchQueue
      .asObservable()
      .pipe(bufferTimeReactive(this.bufferTime, this.bufferLimit))
      .subscribe(x => {
        if (x && x.length) {
          const request = this.searchProvider.getProductById(x);
          request
            .then(products => {
              for (const product of products) {
                this.receiveQueue.next(new ProductRegistryResult(product, true));
              }

              if (x.length !== products.length) {
                for (const productId of x) {
                  if (!products.find(p => p.productId === productId)) {
                    const missingProduct = this.productFactory.newInstance();
                    missingProduct.productId = productId;
                    this.receiveQueue.next(new ProductRegistryResult(missingProduct, false));
                  }
                }
              }
            })
            .catch(err => {
              this.receiveQueue.error(err);
            });
        }
      });

    if (clearOnIdentityChange) {
      this.identityService.state.subscribe(x => {
        this.clear();
      });
    }
  }

  /**
   * Fetches the product denoted by the productId.
   * If the product was "recently" (ever) fetched before, we
   * return that instead.
   *
   * @param productId the products unique ID
   */
  public getProduct(productId: string): Promise<Product> {
    return this.get(productId, false);
  }

  /**
   * Fetches a product based on its partnumber. The PartNumber is the real-world identifier of the product,
   * such as EAN code or otherwise.
   * @param partnumber the EAN, or other human knowable partnumber of the product or SKU.
   */
  public getProductByPartnumber(partNumber: string): Promise<Product> {
    return this.get(partNumber, true);
  }

  /**
   * Adds an entry to the internal cache. As it is a frequent usecase to be able to look up a product by its partnumber,
   * we cache the entry both by partnumber and by productid.
   */
  public addEntry(entry: Product | Promise<Product>, productIdentifier: string, isPartNumber: boolean): void {
    let p: Promise<Product> | null = null;

    if (entry instanceof Product) {
      p = Promise.resolve(entry);
    } else {
      p = entry;
    }
    p.then(product => {
      this.cachedEntries.set(this.getKey(product.productId, false), Promise.resolve(product));
      this.cachedEntries.set(this.getKey(product.partNumber, true), Promise.resolve(product));
      this.addSeoToken(product);
    });
  }

  protected fetchItem(productIdentifier: string, isPartNumber: boolean): Promise<Product> {
    if (isPartNumber) {
      return this.searchProvider.getProductByPartnumber(String(productIdentifier));
    } else {
      if (this.bufferTime === -1) {
        return this.searchProvider.getProductById(productIdentifier).then(arr => {
          return arr[0];
        });
      } else {
        const thePromise = this.receiveQueue
          .asObservable()
          .pipe(
            filter(p => p.product.productId === productIdentifier),
            take(1),
          )
          .toPromise()
          .then(x => {
            if (x.isFound) {
              return Promise.resolve(x.product);
            } else {
              return Promise.resolve(this.productFactory.newInstance());
            }
          });

        this.fetchQueue.next(productIdentifier);
        return thePromise;
      }
    }
  }

  /**
   * If applicable, creates a new SEO token and adds it to the SEO registry.
   */
  protected addSeoToken(entry: Product): void {
    if (!this.seoRegistry || !entry.seotoken) {
      return;
    }

    const s: SEOToken = this.seoFactory.newInstance();
    s.tokenValue = String(entry.productId);
    s.type = 'ProductToken';
    s.urlkeyword = entry.seotoken;

    this.seoRegistry.addEntry(s, true, s.urlkeyword);
  }
}
