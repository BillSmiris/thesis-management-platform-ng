import { Component } from '@angular/core';
import { IdentityService } from '../services/identity/identity.service';
import { LoginRequestModel } from '../services/identity/models/login.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  formData: LoginRequestModel = {
    username: "",
    password: ""
  }

  constructor(private identity: IdentityService) {}

  login() {
    this.identity.login(this.formData);
  }
}
