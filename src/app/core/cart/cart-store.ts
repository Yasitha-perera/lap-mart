import { Store } from "@core/store";
import { CartItem } from "./cart-item";
import { Injectable } from "@angular/core";
import { CartState, initialState } from "./cart-state";
import { LogService } from "@core/log.service";

@Injectable({ providedIn: "root" })
export class CartStore extends Store<CartState> {
  constructor(private logService: LogService) {
    super(initialState);
  }

  addCartItem = (cartItemToAdd: CartItem) => {
    this.logService.log("[Cart] Add Item", cartItemToAdd);

    this.setState({
      ...this.state,
      cartItems: [].concat(this.state.cartItems, cartItemToAdd)
    });
  };

  updateCartItem = (cartItemToUpdate: CartItem) => {
    this.logService.log("[Cart] Update Item", cartItemToUpdate);

    const newCartItems = this.state.cartItems.map(i =>
      i.id === cartItemToUpdate.id ? cartItemToUpdate : i
    );

    this.setState({
      ...this.state,
      cartItems: newCartItems
    });
  };

  removeCartItem = (cartItemToRemove: CartItem) => {
    this.logService.log("[Cart] Remove Item", cartItemToRemove);

    const newCartItems = this.state.cartItems.filter(
      i => i.id !== cartItemToRemove.id
    );

    this.setState({
      ...this.state,
      cartItems: newCartItems
    });
  };

  clearCart = () => {
    this.logService.log("[Cart] Clear Item");

    this.setState(initialState);
  };
}
