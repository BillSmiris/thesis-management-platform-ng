import { Injectable, OnInit } from '@angular/core';
import { Role } from './models/role.model';
import { StudentPersonalData, ProfessorPersonalData } from './models/userData.model';
import { LoginRequestModel } from './models/login.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private _username?: string;
  private _role?: Role;
  private _personalData?: StudentPersonalData | ProfessorPersonalData;
  private _isAuthorised: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  async init() {
    const token = localStorage.getItem('idtkn');
    if (token) {
      this.decodeToken(token);
      this._isAuthorised = true;
      await this.getUserData();
      if(this._role === "STUDENT") {
        this.router.navigate(['/student'], { replaceUrl: true });
      } else if(this._role === "PROFESSOR") {
        this.router.navigate(['/professor'], { replaceUrl: true });
      }
    } else {
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  get username(): string | undefined {
    return this._username;
  }

  get role(): Role | undefined {
    return this._role;
  }

  get personalData(): StudentPersonalData | ProfessorPersonalData | undefined {
    return this._personalData;
  }

  get isAuthorised(): boolean {
    return this._isAuthorised;
  }

  async login(data: LoginRequestModel) {
    try {
      const token = await lastValueFrom(this.loginRequest(data));
      if (token) {
        localStorage.setItem('idtkn', token);
        this.decodeToken(token);
        this._isAuthorised = true;
        await this.getUserData();
        if(this._role === "STUDENT") {
          this.router.navigate(['/student'], { replaceUrl: true });
        } else if(this._role === "PROFESSOR") {
          this.router.navigate(['/professor'], { replaceUrl: true });
        }
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  }

  async getUserData() {
    if (this._role === "STUDENT") {
      try {
        this._personalData = await lastValueFrom(this.getStudentDataRequest());
        console.log(this._personalData);
      } catch (error) {
        console.log('Failed to fetch student data:', error);
      }
    } else if (this._role === "PROFESSOR") {
      try {
        this._personalData = await lastValueFrom(this.getProfessorDataRequest());
        console.log(this._personalData);
      } catch (error) {
        console.log('Failed to fetch professor data:', error);
      }
    }
  }

  decodeToken(token: string) {
    const decodedToken = JSON.parse(window.atob(token.split('.')[1]));
    this._username = decodedToken.sub;
    this._role = decodedToken.role;
  }

  logout() {
    this._username = undefined;
    this._role = undefined;
    this._personalData = undefined;
    localStorage.removeItem('idtkn');
    this._isAuthorised = false;
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  private loginRequest(data: LoginRequestModel) {
    return this.http.post<string>('api/v1/auth/login', data, {
      responseType: 'text' as 'json',
    });
  }

  private getStudentDataRequest() {
    return this.http.get<StudentPersonalData>('api/v1/student/student/data')
    .pipe(map(response => { return response }));
  }

  private getProfessorDataRequest() {
      return this.http.get<ProfessorPersonalData>('api/v1/professor/professor/data')
      .pipe(map(response => { return response }));
  }

}
