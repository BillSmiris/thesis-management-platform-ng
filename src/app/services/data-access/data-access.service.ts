import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StudentThesisResponseModel } from 'src/app/student/thesis/thesis.model';
import { StudentMeetingListResponseItem } from 'src/app/student/student-meetings/student-meetings.model';
import { ProfessorThesisListResponseItem } from 'src/app/professor/professor-thesis-list/professor-thesis-list.model';
import { ProfessorGradeThesisRequestModel, ProfessorThesisResponseModel } from 'src/app/professor/professor-thesis-page/thesis-view/thesis-view.model';
import { CreateMeetingRequestModel, ProfessorMeetingInfoResponseModel, ProfessorMeetingListResponseItem } from 'src/app/professor/professor-thesis-page/meetings-view/meetings-view.model';
import { ProfessorFileListResponseItem } from 'src/app/professor/professor-thesis-page/file-view/file-view.model';

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

  getProfessorMeetingsForThesis(id: number) {
    return this.http.get<ProfessorMeetingListResponseItem[]>(`api/v1/professor/meeting/thesis/${id}`)
    .pipe(map(response => { return response }));
  }

  createMeeting(model: CreateMeetingRequestModel){
    return this.http.post("api/v1/professor/meeting", model);
  }

  getMeetingInfo(id: number) {
    return this.http.get<ProfessorMeetingInfoResponseModel>(`api/v1/professor/meeting/${id}`)
    .pipe(map(response => { return response }));
  }

  saveMeeting(model: ProfessorMeetingInfoResponseModel){
    return this.http.post("api/v1/professor/meeting/notes", model);
  }

  gradeThesis(model: ProfessorGradeThesisRequestModel) {
    return this.http.post("api/v1/professor/thesis/grade", model);
  }

  uploadFile(formData: FormData) {
    return this.http.post("api/v1/student/file", formData);
  }

  getThesisFiles(id: number) {
    return this.http.get<ProfessorFileListResponseItem[]>(`api/v1/professor/file/thesis/${id}`)
    .pipe(map(response => { return response }));
  }

  getFile(id: number) {
    return this.http.get(`api/v1/professor/file/${id}`, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}
