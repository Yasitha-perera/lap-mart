import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '@core/cart/cart-item';
import { getCartItems, getCartItemsCount, getCartSubTotal, getEstimatedTax, getOrderTotal, getShippingCost } from '@core/cart/cart-selector';
import { CartStore } from '@core/cart/cart-store';
import { CartService } from '@core/cart/cart.service';
import { LogService } from '@core/log.service';
import { OrderService } from '@core/orders/order.service';
import { combineLatest, Subscription } from 'rxjs';

declare let paypal: any;

@Component({
  selector: 'pm-paypal-checkout',
  templateUrl: './paypal-checkout.component.html',
  styleUrls: ['./paypal-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaypalCheckoutComponent implements OnInit, OnDestroy {
  orderTotalSubscription: Subscription;
  orderTotal:number=0;
  cartItems: CartItem[];
  shippingCost:number;
  itemsCount:number;
  orderSubTotal:number;
  estimatedTax:number;

  constructor(
    private cartService: CartService,
    private router: Router,
    private cartStore: CartStore,
    private logService:LogService,
    private orderService:OrderService
  ) { }

  ngOnInit() {
    // get order details, we will use higher Order observable operator
    // combinelatest to get all order properties.

    this.orderTotalSubscription = combineLatest(
      this.cartStore.select(getOrderTotal),
      this.cartStore.select(getCartItems),
      this.cartStore.select(getShippingCost),
      this.cartStore.select(getCartItemsCount),
      this.cartStore.select(getEstimatedTax),
      this.cartStore.select(getCartSubTotal)
    ).subscribe(([
      orderTotal,cartItems,shippingCost,itemsCount,estimatedTax,
      orderSubTotal,
    ])=>{
      this.logService.log(`Order Total is`,orderTotal);
      this.logService.log(`Cart Items`, cartItems);
      this.orderTotal = orderTotal;
      this.cartItems = cartItems as CartItem[];
      this.shippingCost = shippingCost;
      this.itemsCount = itemsCount;
      this.estimatedTax = estimatedTax as number;
      this.orderSubTotal = orderSubTotal as number;
    });

    //render paypal button pass paypal configuration
    paypal.Button.render(this.paypalConfig,'#paypal-button-container');
  }

  ngOnDestroy(){
    if(this.orderTotalSubscription){
      this.orderTotalSubscription.unsubscribe();
    }
  }

  get paypalConfig(){
    return{
      style:{size:'responsive'},
      env:"sandbox",
      client:{sandbox:"ARaFXzkDzkmElC-aQHQbfx_R8fCKtg-LbSBKsJXluG9xcsoHYxpby8mUe9MIPetsMrnZ_iXz6IbDqgIX"},
      commit: true,
      payment:(data, actions)=>{
        return actions.payment.create({
          payment:{
            transactions:[
              {
                amount:{
                  total: this.orderTotal,
                  currency: "USD", // in production you may want to support other currency.
                },
              },
            ],
          },
        });
      },
      onAuthorize:(data, actions)=>{
        // clear cart
        // navigate to shopping page
        return actions.payment.execute().then((payment)=>{
         this.logService.log(`The payment is successful`, payment);
         const{cart: cartId, id: paymentId} = payment;

         const {
          orderTotal,
          cartItems,
          shippingCost,
          itemsCount,
          estimatedTax,
          orderSubTotal
         } = this;

         this.orderService.submitOrder({
          cartId,
          cartItems,
          orderTotal,
          paymentId,
          shippingCost,
          itemsCount,
          estimatedTax,
          orderSubTotal,
         })
         .subscribe((orderId)=>{
          this.logService.log("Order created successfully", orderId);
          this.logService.log(
            "Redirecting to Thank You Page pending...",
            orderId
          );
          this.cartService.clearCart();
          this.router.navigate(["products"]);
         });
        });
      },
      onCancel:(data)=>{
        this.logService.log(`The payment is cancelled`, data);
      },
      onError:(error)=>{
        this.logService.log(`Payment Error`, error);
      },
    };
  }

}
