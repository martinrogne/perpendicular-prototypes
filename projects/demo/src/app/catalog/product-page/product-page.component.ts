import { Component, Injector, OnInit } from '@angular/core';
import { RouteDataBind } from '../../core/decorators/route-data-bind-decorator';
import {IProductFactory, Product} from 'perpendicular-core';

/**
 * Component for rendering the detailed product page
 */
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  /**
   * The product to be rendered
   */
  @RouteDataBind() product: Product;

  /**
   * Default constructor
   */
  constructor(public injector: Injector,
              public factory: IProductFactory) {
    this.product = this.factory.newInstance();
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
  }

}
