import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { Cart, ICartService, ICartFactory } from 'perpendicular-core';
import { ServiceStateBind } from '../decorators/service-state-bind-decorator';

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
   * The current state of the cart
   */
  @ServiceStateBind(ICartService) public cart: Cart | undefined;

  /**
   * Default constructor
   */
  constructor(
              public injector: Injector,
              public factory: ICartFactory) {
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
  }

}
