import { Component, Input, OnInit } from '@angular/core';
import { ICartService, PaymentMethod } from 'perpendicular-core';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  @Input() method: PaymentMethod | undefined;

  constructor(public cartService: ICartService) { }

  ngOnInit(): void {
  }

  public select(): void {
    if (this.method) {
      this.cartService.setPaymentMethod(this.method);
    }
  }

}
