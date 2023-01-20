import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { throwIfAlreadyLoaded } from './utils/module-import-guard';
import { AuthHeaderInterceptorService } from './interceptors/auth-header-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { HttpErrorInterceptorService } from './interceptors/http-error-interceptor.service';

@NgModule({
  declarations: [],
  providers: [
    {
    provide:HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptorService,
    multi:true
    },
{
provide:HTTP_INTERCEPTORS,
useClass:HttpErrorInterceptorService,
multi:true
}
      ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ]
})
export class CoreModule {
constructor(@Optional() @SkipSelf() parentModule:CoreModule)
{
throwIfAlreadyLoaded(parentModule,'CoreModule');
}
}
