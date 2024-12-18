import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorThesisPageComponent } from './professor-thesis-page.component';

describe('ProfessorThesisPageComponent', () => {
  let component: ProfessorThesisPageComponent;
  let fixture: ComponentFixture<ProfessorThesisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorThesisPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorThesisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
