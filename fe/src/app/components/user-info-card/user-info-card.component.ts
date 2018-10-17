import {Component, Input} from '@angular/core';

import {User} from '../../models';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.scss']
})
export class UserInfoCardComponent{
  @Input() userInfo: User;

  constructor() { }
}
