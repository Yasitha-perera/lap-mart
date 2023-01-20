import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CartItem } from '@core/cart/cart-item';
import { getIsItemAlreadyInCart } from '@core/cart/cart-selector';
import { CartStore } from '@core/cart/cart-store';
import { ALLOWED_PRODUCT_QUANTITIES, CartService } from '@core/cart/cart.service';
import { Product } from '@core/products/product';
import { Observable } from 'rxjs';
import { AddToCartDialogComponent } from '../add-to-cart-dialog/add-to-cart-dialog.component';

@Component({
    selector: 'pm-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrls:['./add-to-cart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartComponent implements OnInit{
    @Input() product: Product;
    availableQuantities: number[];
    quantity: number;
    isItemAlreadyInCart: Observable<boolean>;
    constructor(private cartStore: CartStore, private cartService: CartService, private matDialog: MatDialog){}

    ngOnInit(){
        this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES;
        this.isItemAlreadyInCart = this.cartStore.select(
            getIsItemAlreadyInCart(this.product.id)
        );
    }

    addItemToCart(){
        this.cartService.addToCart(this.product, this.quantity)
        .subscribe((cartItem) =>this.openDialog(cartItem));
    }

    openDialog(cartItem: CartItem){
        this.matDialog.open(AddToCartDialogComponent, {
            width: "350px",
            height: "250px",
            data: {cartItem},
            disableClose: true
        });
    }
}
