import { Injectable } from "@angular/core";
import { LogService } from "@core/log.service";
import { Product } from "@core/products/product";
import { of } from "rxjs";
import { CartItem } from './cart-item';
import { CartStore } from "./cart-store";

export const ALLOWED_PRODUCT_QUANTITIES = Array.from(
  { length: 30 },
  (v, i) => i + 1
);

@Injectable({
  providedIn: "root",
})
export class CartService {

  constructor(private logService: LogService, private cartStore: CartStore) {}

  addToCart(product: Product, quantity: number) {
    this.logService.log("[Cart] Add Item");
    const cartItemToAdd = {
      ...product,
      quantity,
      itemTotal: product.price * quantity,
    };
    this.cartStore.addCartItem(cartItemToAdd);
    return of(cartItemToAdd);
  }

  updateCartItem(cartItemToUpdate: CartItem){
    cartItemToUpdate = {
      ...cartItemToUpdate,
      itemTotal: cartItemToUpdate.price * cartItemToUpdate.quantity,
    };
    this.cartStore.updateCartItem(cartItemToUpdate);
    return of(cartItemToUpdate);
  }
  removeCartItem(itemtoRemove: CartItem){
    this.cartStore.removeCartItem(itemtoRemove);
    return of(itemtoRemove);
  }
  clearCart() {
    this.cartStore.clearCart();
  }
}
