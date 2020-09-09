import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAnalyticsService, IProductFactory, Product } from '@perpendicular/core';

/**
 * Simple component for rendering a product as a tile
 */
@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTileComponent implements OnInit {
  /**
   * The product to be rendered
   */
  @Input() product: Product;

  /**
   * Default constructor
   */
  constructor(public factory: IProductFactory,
              public analyticsService: IAnalyticsService) {
    this.product = this.factory.newInstance();
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
  }

  /**
   * Utility function to inform the analytics service
   * when an interaction occured
   */
  public tileClick(): void {
    // FIXME: list and position should be dynamic here
    this.analyticsService.trackProductClick(this.product, 'search', 0);
  }
}
