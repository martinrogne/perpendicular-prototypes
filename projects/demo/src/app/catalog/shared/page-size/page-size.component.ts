import { Component, OnInit } from '@angular/core';
import { IProductSearchService } from '@perpendicular/core';

/**
 * Component for rendering the page-sizes that can be selected
 */
@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.scss']
})
export class PageSizeComponent implements OnInit {
  /**
   * The list of page sizes the customer can select between
   */
  public pageSizes: Array<number>;

  /**
   * The page size currently set on the search service
   */
  public currentPageSize: number;


  /**
   * Default constructor
   */
  constructor(public service: IProductSearchService) {
    this.pageSizes = [12, 24, 36];
    this.currentPageSize = 12;
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
    this.service.state.subscribe(x => {
      this.currentPageSize = this.service.pageSize;
    });
  }

  /**
   * Handler for changing the page size used for the search service
   */
  public setPageSize(event: Event): void {
    console.log(event);
    // this.service.pageSize = Number(size);
  }

}
