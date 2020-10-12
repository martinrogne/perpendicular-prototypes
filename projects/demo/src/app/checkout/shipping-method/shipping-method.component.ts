import { Component, Input, OnInit } from '@angular/core';
import { ICartService, ShippingMode } from 'perpendicular-core';

@Component({
  selector: 'app-shipping-method',
  templateUrl: './shipping-method.component.html',
  styleUrls: ['./shipping-method.component.scss']
})
export class ShippingMethodComponent implements OnInit {

  @Input() method: ShippingMode | undefined;

  constructor(public cartService: ICartService) { }

  ngOnInit(): void {
  }

  public select(): void {
    if (this.method  !== undefined && this.method.id !== undefined) {
      this.cartService.setShippingMode(this.method.id);
    }
  }

}
