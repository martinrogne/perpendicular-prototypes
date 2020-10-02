import { Component, Input, OnInit } from '@angular/core';
import { CartItem, ICartFactory } from 'perpendicular-core';

/**
 * Component for displaying a single item from the cart
 */
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  /**
   * The item to render
   */
  @Input() item: CartItem;


  /**
   * Default constructor
   */
  constructor() {
    this.item = new CartItem();
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
  }

}
