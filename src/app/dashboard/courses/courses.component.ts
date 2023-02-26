import { Component } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  constructor(private contract:ContractService){
    this.contract.connectWallet()
    this.contract.addStudent()
  }
}
