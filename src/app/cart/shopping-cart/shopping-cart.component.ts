import { Component, OnInit } from "@angular/core";
import { CartItem } from "@core/cart/cart-item";
import { getCartItems, getCartItemsCount } from "@core/cart/cart-selector";
import { CartStore } from "@core/cart/cart-store";
import { ALLOWED_PRODUCT_QUANTITIES, CartService } from "@core/cart/cart.service";
import { Observable } from "rxjs";

@Component({
  selector: "pm-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements OnInit {
  cartItemsCount: Observable<number>;
  cartItems: Observable<CartItem[]>;
  availableQuantities: number[];
  displayedColumns = ["imgUrl", "name", "price", "quantity", "remove"];

  constructor(private cartStore: CartStore, private cartService: CartService) {}

  ngOnInit() {
    this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES;
    this.cartItemsCount = this.cartStore.select(getCartItemsCount);
    this.cartItems = this.cartStore.select(getCartItems);
  }

  updateCartItem({value}, cartItem: CartItem) {
    console.log("Attempting to update quantity from cart page");
    this.cartService.updateCartItem({...cartItem, quantity: value});
  }

  removeCartItem(cartItem: CartItem) {
    console.log("Attempting to remove item from cart page");
    this.cartService.removeCartItem(cartItem);
  }
}
