import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(this.showSnackBar));
  }

  private showSnackBar = (response: HttpErrorResponse): Observable<any> => {
    const text = `Error Message: ${response.message}`;

    if (text) {
      this.snackBar.open(text, "Close", { duration: 7000 });
    }

    return throwError(response);
  };
}
