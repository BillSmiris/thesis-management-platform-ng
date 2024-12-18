import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorThesisListComponent } from './professor-thesis-list.component';

describe('ProfessorThesisListComponent', () => {
  let component: ProfessorThesisListComponent;
  let fixture: ComponentFixture<ProfessorThesisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorThesisListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorThesisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
