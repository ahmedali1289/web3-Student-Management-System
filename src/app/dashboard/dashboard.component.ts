import { Component,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  headerHeight!: number;
  bodyHeight!: number;
  footerHeight!: number;
  sidebarExpanded = true;
  constructor(private http:ApiService) {
    this.updateHeights();
  }
  @HostListener('window:resize')
  onWindowResize() {
    this.updateHeights();
  }
  private updateHeights() {
    const windowHeight = window.innerHeight;
    const headerHeightPercentage = 0.1;
    const footerHeightPercentage = 0.1;
    this.headerHeight = windowHeight * headerHeightPercentage;
    this.bodyHeight = windowHeight * (1 - headerHeightPercentage - footerHeightPercentage);
    this.footerHeight = windowHeight * footerHeightPercentage;
  }
  ngOnInit() {
    // this.http.getMethod('http://localhost:3000/api/auth/me',true).subscribe((res:any)=>{
    //   console.log('====================================');
    //   console.log(res);
    //   console.log('====================================');
    // })
  }
}
