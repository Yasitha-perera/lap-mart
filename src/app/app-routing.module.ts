import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@core/auth/auth-guard.service';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'products'

  },
{
 path:'products',
 loadChildren:'./products/products.module#ProductsModule'

},
{
path:'auth',
loadChildren:'./auth/auth.module#AuthModule'
},
{
path:"cart",
loadChildren:"./cart/cart.module#CartModule",
canActivate:[AuthGuardService]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
