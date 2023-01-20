import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';


@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LoginComponent implements OnInit {

  email : string;
  error : BehaviorSubject<string>;
  password : string;
  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.error = new BehaviorSubject('');
  }

  login(){
    this.setError('');
    this.authService.login(this.email, this.password).subscribe(
      (redirectUrl)=> this.router.navigate([redirectUrl]),
      (e)=> this.setError(e)
      );
  }

  private setError(msg: any){
    return this.error.next(msg);
  }
  hide= true;
}
