import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introduction-screens',
  templateUrl: './introduction-screens.component.html',
  styleUrls: ['./introduction-screens.component.scss']
})
export class IntroductionScreensComponent implements OnInit {

  showScreen: boolean = false;
  constructor(private route:Router) { }

  ngOnInit() {
  }

  goToNextFromOrderPlace() {
    this.showScreen = true;
  }

  goToNextFromDelivery() {
    localStorage.setItem('introVisited', 'true');
    this.route.navigate(['auth/login']);
  } 

 
}
