import { Component, Injector, OnInit } from '@angular/core';
import {IProductFactory, IProductSearchService, Product, ProductSearchResult} from '@perpendicular/core';
import { RouteDataBind } from '../../core/decorators/route-data-bind-decorator';
import { ActivatedRoute } from '@angular/router';
import { ServiceStateBind } from '../../core/decorators/service-state-bind-decorator';

/**
 * Component for rendering a catalog results page
 */
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  /**
   * The current state of the search
   */
  @ServiceStateBind(IProductSearchService) searchState: ProductSearchResult | undefined;

  /**
   * Default constructor
   */
  constructor(public service: IProductSearchService,
              public factory: IProductFactory,
              public injector: Injector) {
  }

  /**
   * Angular lifecycle hook
   */
  public ngOnInit(): void {
    console.log('Are we called - baseline');
  }

}
