import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from "../../core/auth/token-storage.service";
import { Observable } from 'rxjs';

@Injectable({
providedIn:"root"
})
export class AuthHeaderInterceptorService implements HttpInterceptor {
constructor(private tokenStorage:TokenStorageService){}
  intercept(req: HttpRequest<any>,
    next: HttpHandler):
   Observable<import("@angular/common/http").HttpEvent<any>>
   {

const token = this.tokenStorage.getToken();
const clonedRequest = req.clone({
headers:req.headers.set("Authorization", token ? `Bearer ${token}`:"")
});
    return next.handle(clonedRequest);
  }
}

