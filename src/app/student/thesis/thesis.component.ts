import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../../services/data-access/data-access.service';
import { StudentThesisResponseModel } from './thesis.model';

@Component({
  selector: 'app-thesis',
  templateUrl: './thesis.component.html',
  styleUrls: ['./thesis.component.css']
})
export class ThesisComponent implements OnInit {
  constructor(private dataAccess: DataAccessService) { }

  fetched: boolean = false;
  error: boolean = false;
  thesis?: StudentThesisResponseModel;

  selectedFile: File | null = null;

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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('thesisId', this.thesis!.id+"");

      console.log(formData)

      this.dataAccess.uploadFile(formData).subscribe(response => {
        console.log(response);
      },
        (error) => {  
          console.log(error);
        } 
      );
    }
  }
}
