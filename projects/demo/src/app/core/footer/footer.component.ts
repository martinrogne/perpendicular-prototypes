import { Component, OnInit } from '@angular/core';

/**
 * Component for rendering the persistent footer of the site
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  /**
   * Default constructor
   */
  constructor() { }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
  }

}
