import { Component, Input, OnInit } from '@angular/core';
import { ProfessorGradeThesisRequestModel, ProfessorThesisResponseModel } from './thesis-view.model';
import { DataAccessService } from 'src/app/services/data-access/data-access.service';

@Component({
  selector: 'app-thesis-view',
  templateUrl: './thesis-view.component.html',
  styleUrls: ['./thesis-view.component.css']
})
export class ThesisViewComponent implements OnInit {
  @Input() thesisId?: string;

  constructor(private dataAccess: DataAccessService) { }

  fetched: boolean = false;
  error: boolean = false;
  thesis?: ProfessorThesisResponseModel;

  grade: boolean = false;

  ngOnInit(): void {
    if(this.thesisId) {
      this.fetchThesis();
    }
  }

  fetchThesis() {
    this.fetched = false;
    this.error = false;
    console.log(this.thesisId)
    this.dataAccess.getProfessorThesisById(+this.thesisId!).subscribe(response => {
      this.thesis = response;
      this.fetched = true;
    },
      (error) => {
        this.fetched = false;
        this.error = true;
      }
    );
  }

  onOverlayClose() {
    this.grade = false;
  }

  onGrade() {
    this.grade = true;
  }

  onOk(grade: number) {
    const gradeThesisModel: ProfessorGradeThesisRequestModel = {
      id: +this.thesisId!,
      grade: grade
    }
    this.dataAccess.gradeThesis(gradeThesisModel).subscribe(response => {
      this.onOverlayClose();
      this.fetchThesis();
    },
      (error) => {
        console.log(error);
      }
    );
  }
}
