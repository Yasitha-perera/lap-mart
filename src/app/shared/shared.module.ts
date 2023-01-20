import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { PmMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddToCartComponent } from './cart/add-to-cart/add-to-cart.component';
import { AddToCartDialogComponent } from './cart/add-to-cart-dialog/add-to-cart-dialog.component';
import { CartItemsCountComponent } from './cart/cart-items-count/cart-items-count.component';


@NgModule({
  declarations: [AddToCartComponent,CartItemsCountComponent, AddToCartDialogComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    PmMaterialModule],
exports:[
PmMaterialModule,
FormsModule,
ReactiveFormsModule,
RouterModule,
FlexLayoutModule,
CartItemsCountComponent,
AddToCartComponent,


],
entryComponents:[AddToCartDialogComponent]
})
export class SharedModule { }
