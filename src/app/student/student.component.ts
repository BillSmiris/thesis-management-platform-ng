import { Component } from '@angular/core';
import { IdentityService } from '../services/identity/identity.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  constructor(private identity: IdentityService) {}
}
