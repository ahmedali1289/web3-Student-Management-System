import { Component,HostListener } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor() {
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
  }
}
