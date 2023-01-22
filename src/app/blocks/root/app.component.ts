import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { merge, Observable, Subscription } from "rxjs";
import { AuthService } from "../../core/auth/auth.service";
import { User } from "../../core/user";

@Component({
  selector: "pm-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  user$: Observable<User>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = merge(this.authService.findMe(), this.authService.user);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
