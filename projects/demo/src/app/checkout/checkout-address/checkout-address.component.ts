import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAddressFactory, IProfileService } from 'perpendicular-core';

/**
 * Component for rendering an address form in checkout, representing
 * both the billing and the shipping address that the customer
 * will be using
 */
@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  /**
   * The address form
   */
  public addressForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public profileService: IProfileService,
              public addressFactory: IAddressFactory) {
    this.addressForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: ''
    });
  }

  ngOnInit(): void {
  }

  /**
   * Handler for saving the address
   */
  public saveAddress(): void {
    const address = this.addressFactory.newInstance();

    // Form values
    address.firstName = this.addressForm.value.firstName;
    address.lastName = this.addressForm.value.lastName;
    address.email = this.addressForm.value.email;

    // Static values
    address.isShippingAddress = true;
    address.isBillingAddress = true;
    address.isPrimary = true;
    address.nickName = 'Primary';

    this.profileService.saveAddress(address);
  }

}
