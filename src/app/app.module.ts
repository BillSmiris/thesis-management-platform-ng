import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { StudentComponent } from './student/student.component';
import { ProfessorComponent } from './professor/professor.component';
import { FormGroupName, FormsModule } from '@angular/forms';
import { ThesisComponent } from './student/thesis/thesis.component';
import { CardComponent } from './shared/card/card.component';
import { StudentMeetingsComponent } from './student/student-meetings/student-meetings.component';
import { ProfessorThesisListComponent } from './professor/professor-thesis-list/professor-thesis-list.component';
import { ProfessorThesisPageComponent } from './professor/professor-thesis-page/professor-thesis-page.component';
import { ThesisViewComponent } from './professor/professor-thesis-page/thesis-view/thesis-view.component';
import { MeetingsViewComponent } from './professor/professor-thesis-page/meetings-view/meetings-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    StudentComponent,
    ProfessorComponent,
    ThesisComponent,
    CardComponent,
    StudentMeetingsComponent,
    ProfessorThesisListComponent,
    ProfessorThesisPageComponent,
    ThesisViewComponent,
    MeetingsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
