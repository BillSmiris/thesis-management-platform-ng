import { Component, Input, OnInit } from '@angular/core';
import { ProfessorThesisResponseModel } from './thesis-view.model';
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

  ngOnInit(): void {
    if(this.thesisId) {
      this.fetched = false;
      this.error = false;
      console.log(this.thesisId)
      this.dataAccess.getProfessorThesisById(+this.thesisId).subscribe(response => {
        this.thesis = response;
        this.fetched = true;
        console.log(this.thesis);
      },
        (error) => {
          this.fetched = false;
          this.error = true;
        }
      );
    }
  }
}
