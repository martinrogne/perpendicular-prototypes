import { Component, OnInit } from '@angular/core';
import { IProductSearchService } from '@perpendicular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Simple component for rendering a catalog bar for user input
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  /**
   * Form used for entering search input
   */
  public searchForm: FormGroup;

  /**
   * Default constructor
   */
  constructor(public service: IProductSearchService,
              public formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['']
    });
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
  }

  /**
   * Handler for when the user has entered a new catalog term
   */
  public performSearch() {
    this.service.newSearchForSearchTerm(this.searchForm.value.searchTerm);
    this.searchForm.reset();
  }

}
