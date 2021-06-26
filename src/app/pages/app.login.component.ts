import { Component } from '@angular/core';
import {User} from '../controller/model/User.model';
import {AuthenticationService} from "../controller/service/auth/authentication.service";
import {UserAuth} from "../controller/model/user-auth.model";

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {


  constructor(private authenticationService: AuthenticationService) {
  }
  public signIn(){
  this.authenticationService.login();
  }


  get selected(): UserAuth {
    return this.authenticationService.userCandidat;
  }

}
