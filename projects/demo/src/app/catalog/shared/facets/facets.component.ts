import { Component, OnInit } from '@angular/core';
import { Facet, IProductSearchService } from '@perpendicular/core';

/**
 * Component for displaying the list of facets that can be applied
 * to the current search
 */
@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss'],
})
export class FacetsComponent implements OnInit {
  /**
   * The list of facets to display
   */
  public facets: Array<Facet>;

  /**
   * Default constructor
   */
  constructor(public service: IProductSearchService) {
    this.facets = [];
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
    this.service.state.subscribe(x => {
      this.facets = x.facets;
    });
  }

  /**
   * Utility handler for toggling a facet on or off
   */
  public toggleFacet(value: string): void {
    this.service.toggleFacet(value);
  }

  /**
   * Utility function to check if a facet is toggled
   */
  public isFacetToggled(value: string): boolean {
    return this.service.queryHasFacet(value);
  }

}
