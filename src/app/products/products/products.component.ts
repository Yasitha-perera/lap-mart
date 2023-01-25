import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsDataService } from '@core/index';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Product } from '@core/products/product';

@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit,
OnDestroy {
dataSource= new MatTableDataSource<Product>();
loading=true;
subscriptions=[];
displayedColumns=['imgUrl', 'name','price', 'action'];

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

constructor(private productDataService: ProductsDataService) {}

  ngOnInit() {
this.subscriptions.push
(this.productDataService
  .getAllProducts()
  .subscribe((products) => this.onDataLoad(products))
  );
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

ngOnDestroy()
{
this.subscriptions.forEach(s => s.unsubscribe()) ;
}
onDataLoad(products: Product[])
{
this.loading=false;
this.dataSource.sort=this.sort;
this.dataSource.paginator=this.paginator;
this.dataSource.data=products;

}
}
