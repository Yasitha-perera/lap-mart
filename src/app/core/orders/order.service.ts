import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { LogService } from '@core/log.service';
import { of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Order } from './order';


@Injectable({
    providedIn:'root'
})
export class OrderService {
    private apiUrl = '/api/orders/';
    constructor(
        private httpClient:HttpClient,
        private authService: AuthService,
        private logService: LogService,
    ){}

    submitOrder({
        cartId,
        paymentId,
        orderTotal,
        cartItems,
        shippingCost,
        itemsCount,
        estimatedTax,
        orderSubTotal
    }){
        // calculate shipping date.
        var today = new Date();
        var after7days = new Date();
        after7days.setDate(today.getDate()+7);

        // get logged in user
        const user = this.authService.loggedInUser;

        // create order object to save in db.
        const order = new Order(
           user.id,
           orderTotal,
           after7days,
           user.fullname,
           cartItems,
           cartId,
           paymentId,
           shippingCost,
           itemsCount,
           estimatedTax,
           orderSubTotal);

           // make http post call to submit order and return server side orderid
           // return type observable<string> = observable<orderId>
           return this.httpClient
           .post(`${this.apiUrl}submit`, order)
           .pipe(
            tap((order:any)=>
            this.logService.log('Order created successfully', order)
           ),
           switchMap((order:any)=>of(order._id)),
           catchError((e)=>{
            this.logService.log(`Server Error Occurred: ${e.error.message}`, e);
            return throwError(
                "Your order could not be submitted now please try again"
            );
           })
           );

    }
}
