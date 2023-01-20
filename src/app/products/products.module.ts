import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductsDataService } from '../core/products/products-data.service';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { PmMaterialModule } from '../shared/material-module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    PmMaterialModule,
    SharedModule],
providers:[ProductsDataService]
})
export class ProductsModule { }
