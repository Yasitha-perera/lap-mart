import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SharedModule } from '../shared/shared.module';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { PaypalCheckoutComponent } from './paypal-checkout/paypal-checkout.component';

@NgModule({
  declarations: [ShoppingCartComponent, CartSummaryComponent, PaypalCheckoutComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
