import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authguards/auth.service';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  constructor(
    private authService: AuthService,
    private route: Router,
    private commonService: CommonServicesService
  ) {
    // setTimeout(() => this.isLoggedIn(), 5000);
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.isLoggedIn();
  }

  async isLoggedIn() {
    // Go ahead if user already signIn
    // if (localStorage.getItem('currentUser')) {
    const flag = await this.authService.isAuthenticated();
    if (flag) {
      this.goToUserRoleSelection(
        JSON.parse(localStorage.getItem('currentUser'))
      );
    } else {
      this.route.navigate(['pages/login']);
    }
    // } else {
    //   this.route.navigate(['auth/login']);
    // }
  }
  goToUserRoleSelection(userData) {
    this.commonService.getUserProfileData().then(async (res) => {
      localStorage.setItem('currentUser', JSON.stringify(userData));
      this.route.navigate(['pages/user-role-selection']);
    });
  }
}
