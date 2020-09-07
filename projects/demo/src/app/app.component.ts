import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

/**
 * Root level component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Default constructor
   */
  constructor(public angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {

  }
}
