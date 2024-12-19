import { Component } from '@angular/core';
import { DataAccessService } from 'src/app/services/data-access/data-access.service';
import { ProfessorThesisListResponseItem, ReportResponseListItem } from './professor-thesis-list.model';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx-js-style';

@Component({
  selector: 'app-professor-thesis-list',
  templateUrl: './professor-thesis-list.component.html',
  styleUrls: ['./professor-thesis-list.component.css']
})
export class ProfessorThesisListComponent {
  constructor(private dataAccess: DataAccessService, private router: Router) { }

  fetched: boolean = false;
  error: boolean = false;
  theses: ProfessorThesisListResponseItem[] = [];

  headerCellStyleOptions = {
    font: {
      bold: true,
      color: {
        rgb: "FFFFFF"
      }
    },
    fill: {
      fgColor: {
        rgb: "035"
      }
    },
    alignment: {
      horizontal: "center",
      vertical: "center"
    },
    border: {
      top: {
        style: 'thin',
        color: {
          rgb: "000000"
        }
      },
      right: {
        style: 'thin',
        color: {
          rgb: "000000"
        }
      },
      bottom: {
        style: 'thin',
        color: {
          rgb: "000000"
        }
      },
      left: {
        style: 'thin',
        color: {
          rgb: "000000"
        }
      }
    }
  }

  dataCellStyleOptions = {
    font: {
      bold: false,
      color: {
        rgb: "000000"
      }
    },
    fill: {
      fgColor: {
        rgb: "FFFFFF"
      }
    },
    border: {
      top: {
        style: 'thin',
        color: {
          rgb: "000000"
        }
      },
      right: {
        style: 'thin',
        color: {
          rgb: "000000"
        }
      },
      bottom: {
        style: 'thin',
        color: {
          rgb: "000000"
        }
      },
      left: {
        style: 'thin',
        color: {
          rgb: "000000"
        }
      }
    },
    alignment: {
      horizontal: "right",
      vertical: "center"
    }
  }

  ngOnInit(): void {
    this.fetched = false;
    this.error = false;
    this.dataAccess.getProfessorTheses().subscribe(response => {
      this.theses = response;
      this.fetched = true;
    },
      (error) => {
        this.fetched = false;
        this.error = true;
      }
    );
  }

  view(id: number) {
    this.router.navigate([`professor/thesis/${id}`]);
  }

  report() {
    this.dataAccess.getReport().subscribe(response => {
      this.export(response);
    },
      (error) => {
        console.log(error);
      }
    );
  }

  export(data: ReportResponseListItem[]) {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    let sheetData = [
      [
        { v: 'ID', t: 's', s: this.headerCellStyleOptions },
        { v: 'Title', t: 's', s: this.headerCellStyleOptions },
        { v: 'Student Name', t: 's', s: this.headerCellStyleOptions },
        { v: 'Student Surname', t: 's', s: this.headerCellStyleOptions },
        { v: 'Student Email', t: 's', s: this.headerCellStyleOptions },
        { v: 'Student Phone', t: 's', s: this.headerCellStyleOptions },
        { v: 'Grade', t: 's', s: this.headerCellStyleOptions },
        { v: 'Meetings Scheduled', t: 's', s: this.headerCellStyleOptions },
        { v: 'Files Uploaded', t: 's', s: this.headerCellStyleOptions },
      ]
    ]

    data.forEach((entry) => {
      sheetData.push(
        [
          { v: entry.id+"", t: 's', s: this.dataCellStyleOptions },
          { v: entry.title, t: 's', s: this.dataCellStyleOptions },
          { v: entry.studentFirstName, t: 's', s: this.dataCellStyleOptions },
          { v: entry.studentLastName, t: 's', s: this.dataCellStyleOptions },
          { v: entry.studentEmail, t: 's', s: this.dataCellStyleOptions },
          { v: entry.studentPhone, t: 's', s: this.dataCellStyleOptions },
          { v: entry.grade+"", t: 's', s: this.dataCellStyleOptions },
          { v: entry.numberOfMeetings+"", t: 's', s: this.dataCellStyleOptions },
          { v: entry.numberOfFiles+"", t: 's', s: this.dataCellStyleOptions },
        ]
      );
    })

    const sheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheetData);

    sheet['!cols'] = [
      { wch: 10 },
      { wch: 60 },
      { wch: 30 },
      { wch: 30 },
      { wch: 45 },
      { wch: 25 },
      { wch: 15 },
      { wch: 25 },
      { wch: 25 },
    ]

    XLSX.utils.book_append_sheet(workbook, sheet, 'Report');
    const exportDate = new Date();
    XLSX.writeFile(workbook, `thesisReport${this.getExportTimestamp()}.xlsx`);
  }

  getExportTimestamp(): string {
    const exportDate = new Date();
    return `${('0' + exportDate.getFullYear()).slice(-2)}${('0' + exportDate.getMonth()).slice(-2)}${('0' + exportDate.getDate()).slice(-2)}${('0' + exportDate.getHours()).slice(-2)}${('0' + exportDate.getMinutes()).slice(-2)}${('0' + exportDate.getSeconds()).slice(-2)}`;
  }
}
