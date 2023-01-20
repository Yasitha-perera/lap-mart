import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getCartItemsCount } from '@core/cart/cart-selector';
import { CartStore } from '@core/cart/cart-store';
import { Observable } from 'rxjs';

@Component({
    selector:'pm-cart-items-count',
    templateUrl:'./cart-items-count.component.html',
    styleUrls:['./cart-items-count.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemsCountComponent implements OnInit{

    totalItemsInCart$:Observable<number>;

    constructor(private cartStore: CartStore){}

    ngOnInit() {
        this.totalItemsInCart$ = this.cartStore.select(getCartItemsCount);
    }

}
