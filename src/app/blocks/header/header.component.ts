import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { User } from '@core/user';
import { EventEmitter } from '@angular/core'

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
@Input()
user:User;

@Output()
logoutEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

}
