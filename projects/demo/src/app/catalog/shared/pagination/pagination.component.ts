import { Component, OnInit } from '@angular/core';
import { IProductSearchService } from 'perpendicular-core';

/**
 * Component for navigating back and forwards through pages
 * of product search results
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  /**
   * The current page of the search
   */
  public currentPage: number;

  /**
   * The total number of pages that are currently available
   */
  public totalPages: number;


  /**
   * Default constructor
   */
  constructor(public service: IProductSearchService) {
    this.currentPage = 0;
    this.totalPages = 0;
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
    this.service.state.subscribe(x => {
      this.currentPage = x.pageNumber;
      this.totalPages = x.totalPages;
    });
  }

  /**
   * Handler for navigating to a new page
   */
  public goToPage(page: number): void {
    this.service.pageNumber = page;
  }

}
