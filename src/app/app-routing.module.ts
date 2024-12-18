import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { StudentComponent } from './student/student.component';
import { ProfessorComponent } from './professor/professor.component';
import { ProfessorThesisPageComponent } from './professor/professor-thesis-page/professor-thesis-page.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'student', component: StudentComponent },
  { path: 'professor', component: ProfessorComponent },
  { path: 'professor/thesis/:id', component: ProfessorThesisPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
