import { Component } from '@angular/core';
import { DataAccessService } from 'src/app/services/data-access/data-access.service';
import { ProfessorThesisListResponseItem } from './professor-thesis-list.model';
import { Router } from '@angular/router';

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
}
