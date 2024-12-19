import { Component, Input, OnInit } from '@angular/core';
import { DataAccessService } from 'src/app/services/data-access/data-access.service';
import { ProfessorFileListResponseItem } from './file-view.model';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent implements OnInit {
  @Input() thesisId?: string;

  constructor(private dataAccess: DataAccessService) { }

  fetched: boolean = false;
  error: boolean = false;
  files: ProfessorFileListResponseItem[] = [];

  ngOnInit(): void {
    if (this.thesisId) {
      this.fetched = false;
      this.error = false;
      this.dataAccess.getThesisFiles(+this.thesisId!).subscribe(response => {
        this.files = response;
        this.fetched = true;
      },
        (error) => {
          this.fetched = false;
          this.error = true;
        }
      );
    }
  }

  download(id: number) {
    if (id) {
      this.dataAccess.getFile(id).subscribe(response => {
        // Extract file name from Content-Disposition header
        const contentDisposition = response.headers.get('Content-Disposition');
        const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1]?.replace(/"/g, '') // Extract filename
          : `downloaded_file_${id}`;

        // Create a Blob URL
        const blob = new Blob([response.body!], { type: response.body!.type });
        const url = window.URL.createObjectURL(blob);

        // Create a download link
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

        // Cleanup
        link.remove();
        window.URL.revokeObjectURL(url);
      },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
