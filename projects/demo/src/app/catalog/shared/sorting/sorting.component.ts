import {Component, OnInit} from '@angular/core';
import {IProductSearchService, ProductSearchSortMethod} from '@perpendicular/core';

/**
 * Component for selecting the method of sorting that should be applied
 */
@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {
  /**
   * The currently selected sorted option
   */
  public selectedSortingMethod: ProductSearchSortMethod;

  /**
   * Possible sorting methods
   */
  public sortingMethods: Array<ProductSearchSortMethod>;

  /**
   * Local declaration of ProductSearchSortMethod to make it usable in templating
   */
  public sortMethod = ProductSearchSortMethod;


  /**
   * Default constructor
   */
  constructor(public service: IProductSearchService) {
    this.selectedSortingMethod = ProductSearchSortMethod.RELEVANCY;
    this.sortingMethods = [
      ProductSearchSortMethod.RELEVANCY,
      ProductSearchSortMethod.MANUFACTURER,
      ProductSearchSortMethod.PRODUCTNAME,
      ProductSearchSortMethod.PRICE_ASC,
      ProductSearchSortMethod.PRICE_DESC
    ];
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
    this.service.state.subscribe(x => {
      this.selectedSortingMethod = x.sortMethod;
    });
  }

  /**
   * Handler for changing the sorting type currently being used
   */
  public changeSorting(event: Event): void {
    console.log(event);
  }

}
