import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Component for rendering the persistent header of the site
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
