import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StudentThesisResponseModel } from 'src/app/student/thesis/thesis.model';
import { StudentMeetingListResponseItem } from 'src/app/student/student-meetings/student-meetings.model';
import { ProfessorThesisListResponseItem } from 'src/app/professor/professor-thesis-list/professor-thesis-list.model';
import { ProfessorThesisResponseModel } from 'src/app/professor/professor-thesis-page/thesis-view/thesis-view.model';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor(private http: HttpClient) { }

  getStudentThesis() {
    return this.http.get<StudentThesisResponseModel>('api/v1/student/thesis')
      .pipe(map(response => { return response }));
  }

  getStudentMeetings() {
    return this.http.get<StudentMeetingListResponseItem[]>('api/v1/student/meeting')
    .pipe(map(response => { return response }));
  }

  getProfessorTheses() {
    return this.http.get<ProfessorThesisListResponseItem[]>('api/v1/professor/thesis')
    .pipe(map(response => { return response }));
  }

  getProfessorThesisById(id: number) {
    return this.http.get<ProfessorThesisResponseModel>(`api/v1/professor/thesis/${id}`)
    .pipe(map(response => { return response }));
  }
}
