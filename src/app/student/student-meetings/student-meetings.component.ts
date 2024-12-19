import { Component } from '@angular/core';
import { DataAccessService } from 'src/app/services/data-access/data-access.service';
import { StudentMeetingListResponseItem } from './student-meetings.model';

@Component({
  selector: 'app-student-meetings',
  templateUrl: './student-meetings.component.html',
  styleUrls: ['./student-meetings.component.css']
})
export class StudentMeetingsComponent {
  constructor(private dataAccess: DataAccessService) { }

  fetched: boolean = false;
  error: boolean = false;
  meetings: StudentMeetingListResponseItem[] = [];

  ngOnInit(): void {
    this.fetched = false;
    this.error = false;
    this.dataAccess.getStudentMeetings().subscribe(response => {
      this.meetings = response;
      this.fetched = true;
      console.log(this.meetings);
    },
      (error) => {
        this.fetched = false;
        this.error = true;
      }
    );
  } 
}
