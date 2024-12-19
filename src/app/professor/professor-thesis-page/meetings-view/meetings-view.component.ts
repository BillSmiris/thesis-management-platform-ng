import { Component, Input } from '@angular/core';
import { DataAccessService } from 'src/app/services/data-access/data-access.service';
import { CreateMeetingRequestModel, ProfessorMeetingInfoResponseModel, ProfessorMeetingListResponseItem } from './meetings-view.model';

@Component({
  selector: 'app-meetings-view',
  templateUrl: './meetings-view.component.html',
  styleUrls: ['./meetings-view.component.css']
})
export class MeetingsViewComponent {
  @Input() thesisId?: string;

  constructor(private dataAccess: DataAccessService) { }

  fetched: boolean = false;
  error: boolean = false;
  meetings: ProfessorMeetingListResponseItem[] = [];

  editMeeting: boolean = false;
  newMeeting: boolean = false;

  newMeetingModel: CreateMeetingRequestModel = {
    thesisId: 0,
    agenda: "",
    date: new Date()
  }

  meetingModel?: ProfessorMeetingInfoResponseModel;

  ngOnInit(): void {
    if (this.thesisId) {
      this.newMeetingModel.thesisId = +this.thesisId;
      this.fetchMeetings();
    }
  }

  fetchMeetings() {
    this.fetched = false;
    this.error = false;
    this.dataAccess.getProfessorMeetingsForThesis(+this.thesisId!).subscribe(response => {
      this.meetings = response;
      this.fetched = true;
    },
      (error) => {
        this.fetched = false;
        this.error = true;
      }
    );
  }

  create() {
    this.newMeetingModel.agenda = "";
    this.newMeetingModel.date = new Date();
    this.newMeeting = true;
  }

  edit(id: number) {
    this.dataAccess.getMeetingInfo(id).subscribe(response => {
      this.meetingModel = response;
      this.editMeeting = true;
      console.log(this.meetingModel)
    },
      (error) => {
        console.log(error);
      }
    );
  }

  onOverlayClose() {
    this.editMeeting = false;
    this.newMeeting = false;
  }

  onCreate() {
    this.dataAccess.createMeeting(this.newMeetingModel).subscribe(response => {
      this.onOverlayClose();
      this.fetchMeetings();
    },
      (error) => {
        console.log(error);
      }
    );
  }

  onSave() {
    this.dataAccess.saveMeeting(this.meetingModel!).subscribe(response => {
      this.onOverlayClose();
      this.fetchMeetings();
    },
      (error) => {
        console.log(error);
      }
    );
  }
}
