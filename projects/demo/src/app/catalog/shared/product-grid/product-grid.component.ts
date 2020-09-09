import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Product } from '@perpendicular/core';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridComponent implements OnInit {
  /**
   * The list of products to display in the grid
   */
  @Input() products: Array<Product>;

  /**
   * Default constructor
   */
  constructor() {
    this.products = [];
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
  }

  /**
   * We use the index for tracking here in order to re-use the
   * grid tiles as much as possible to minimize popping
   */
  public trackByIndex(index: number, item: Product): number {
    return index;
  }
}
