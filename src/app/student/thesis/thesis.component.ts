import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../../services/data-access/data-access.service';
import { StudentThesisResponseModel } from './thesis.model';

@Component({
  selector: 'app-thesis',
  templateUrl: './thesis.component.html',
  styleUrls: ['./thesis.component.css']
})
export class ThesisComponent implements OnInit {
  constructor(private dataAccess: DataAccessService){}

  fetched: boolean = false;
  error: boolean = false;
  thesis?: StudentThesisResponseModel;

  ngOnInit(): void {
    this.fetched = false;
    this.error = false;
    this.dataAccess.getStudentThesis().subscribe(response => {
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
