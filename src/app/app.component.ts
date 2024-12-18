import { Component, OnInit } from '@angular/core';
import { IdentityService } from './services/identity/identity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private identity: IdentityService) {

  }

  ngOnInit(): void {
    this.identity.init();
  }

  get isAuthorised(): boolean {
    return this.identity.isAuthorised;
  }

  get username(): string {
    return this.identity.username + "";
  }

  get fullName(): string {
    const data = this.identity.personalData;
    return data ? `${data?.firstName} ${data.lastName}` : ''; 
  }

  logout() {
    this.identity.logout();
  }
}
