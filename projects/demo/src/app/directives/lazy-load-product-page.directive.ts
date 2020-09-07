import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { IProductSearchService } from '@perpendicular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Utility directive to trigger loading a given product page when it is scrolled into view
 */
@Directive({
  selector: '[appLazyLoadProductPage]'
})
export class LazyLoadProductPageDirective implements OnInit, AfterViewInit, OnDestroy {
  /**
   * The index of the product
   */
  @Input() index: number;

  /**
   * The observer responsible for checking if the element comes into view
   */
  public observer: IntersectionObserver | undefined;

  /**
   * The pagenumber that is currently active
   */
  public pageNumber: number;

  /**
   * The current page size
   */
  public pageSize: number;

  /**
   * Default constructor
   */
  constructor(public element: ElementRef,
              public service: IProductSearchService) {
    this.index = 0;
    this.pageNumber = 0;
    this.pageSize = 0;
  }

  /**
   * Angular lifecycle hook
   */
  public ngOnInit(): void {
    this.service.state.subscribe(x => {
      this.pageNumber = x.query.pageNumber;
      this.pageSize = x.query.pageSize;
    });
  }

  /**
   * Angular lifecycle hook
   */
  public ngAfterViewInit(): void {
    if (this.index % this.pageSize === 0) {
      const pn = Math.floor(this.index / this.pageSize) + 1;

      if (this.pageNumber !== 1 && this.pageNumber === pn) {
        this.element.nativeElement.scrollIntoView();
      }

      this.observer = new IntersectionObserver(entry => {
        if (entry.length === 1 && this.isIntersecting(entry[0])) {
          this.service.pageNumber = pn;
        }
      }, {});

      this.observer.observe(this.element.nativeElement);
    }
  }

  /**
   * Angular lifecycle hook
   */
  public ngOnDestroy(): void {
    if (this.observer) {
      this.observer.unobserve(this.element.nativeElement);
      this.observer.disconnect();
    }
  }

  /**
   * Utility function to check if the element is actually intersecting
   * the view and consequently being displayed
   */
  private isIntersecting(entry: IntersectionObserverEntry): boolean {
    return (entry).isIntersecting && entry.target === this.element.nativeElement;
  }

}
