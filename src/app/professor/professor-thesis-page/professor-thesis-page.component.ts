import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professor-thesis-page',
  templateUrl: './professor-thesis-page.component.html',
  styleUrls: ['./professor-thesis-page.component.css']
})
export class ProfessorThesisPageComponent implements OnInit{
  thesisId?: string;

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if(id) {
        this.thesisId = paramMap.get('id')!;
      }
    });
  }
}
