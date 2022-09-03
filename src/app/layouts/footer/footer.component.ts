import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  userRole = localStorage.getItem('userRole');
  path;
  constructor(private router:Router, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.url.subscribe(data => {
      this.path = data[0].path;
    });
  }

  ngOnInit() {}

  goToDashboard(){
    if(this.userRole == 'Consumer') {
      this.router.navigate(['consumer/consumerDashboard'])
    } else if(this.userRole == 'Driver') {
      this.router.navigate(['driver/driverDashboard'])
    }
  }

  goTosettings(){
    if(this.userRole == 'Consumer') {
      this.router.navigate(['consumer/settings'])
    } else if(this.userRole == 'Driver') {
      this.router.navigate(['driver/driverSetting'])
    } 
  }

  goToNotification(){
    if(this.userRole == 'Consumer') {
      this.router.navigate(['consumer/consumerNotification'])
    } else if(this.userRole == 'Driver') {
      this.router.navigate(['driver/driverNotification'])
    } 
  }

}
