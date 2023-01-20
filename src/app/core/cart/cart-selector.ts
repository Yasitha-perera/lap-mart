import { createSelector } from "reselect";
import { CartState } from "./cart-state";

export const getCartItems = (state: CartState) => state.cartItems;

export const getCartItemsCount = (state: CartState) => {
  const cartItems = state.cartItems;
  const totalCartCount = cartItems.reduce(
    (totalCount, currentItem) => totalCount + currentItem.quantity,
    0
  );

  return totalCartCount;
};

export const getIsItemAlreadyInCart = (productId: number) =>
  createSelector(
    getCartItems,
    (items) => items.filter((item) => item.id === productId).length > 0
  );

  export const getCartSubTotal = createSelector(getCartItems, (items) =>
  items.reduce((subTotal, currentItem) => subTotal + currentItem.itemTotal, 0));

  const SHIPPING = 0.01;
  export const getShippingCost = createSelector(
    getCartSubTotal,
    (subTotal) => subTotal * SHIPPING
  );

  const TAX = 0.02;
  export const getEstimatedTax = createSelector(
    getCartSubTotal,
    (subTotal) => subTotal * TAX
  );

  export const getOrderTotal = createSelector(
    getCartSubTotal,
    getShippingCost,
    getEstimatedTax,
    (cartSubTotal, shippingCost, estimatedTax) =>
    Math.round((cartSubTotal + shippingCost + estimatedTax) * 100)/100
  );
