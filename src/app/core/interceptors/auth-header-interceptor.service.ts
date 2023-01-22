import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorageService } from "../../core/auth/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthHeaderInterceptorService implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<import("@angular/common/http").HttpEvent<any>> {
    const token = this.tokenStorage.getToken();
    console.log("Passed through the interceptor in request");
    const clonedRequest = req.clone({
      headers: req.headers.set("Authorization", token ? `Bearer ${token}` : ""),
    });
    return next.handle(clonedRequest);
  }
}
