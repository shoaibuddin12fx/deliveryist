import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
// import M from 'materialize-css/dist/js/materialize.min.js';
// import { MaterializeAction } from 'angular2-materialize';
import { AuthService } from 'src/app/services/authguards/auth.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input('showBackButton') showBackButton: boolean = false;
  @Input('showHeaderTitle') showHeaderTitle: boolean = true;
  @Input('showMarketIcon') showMarketIcon: boolean = true;
  @Input('showSettingIcon') showSettingIcon: boolean = true;
  elem;

  userRole = localStorage.getItem('userRole');
  userData = JSON.parse(localStorage.getItem('userData'));
  @Input() headerTitle: String;
  path;
  currentRole = localStorage.getItem('userRole');
  username = this.userData?.full_name;
  isIos = false;
  constructor(
    private location: Location,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private platform: Platform
  ) {
    this.activatedRoute.url.subscribe((data) => {
      this.path = data[0].path;
      console.log(this.path);
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.platform.is('ios')) {
      this.isIos = true;
    }
    this.elem = document.querySelector('.sidenav');
  }

  openSidenav() {
    // M.Sidenav.init(this.elem, {
    //   edge: 'right',
    //   inDuration: 250,
    // });
  }

  closeSidenav() {
    // let navInstance = M.Sidenav.getInstance(this.elem);
    // navInstance ? navInstance.close() : null;
  }

  dologout() {
    this.closeSidenav();
    this.authService.logout();
  }

  routeTo(link) {
    this.closeSidenav();
    this.route.navigate([link]);
  }

  goBack() {
    this.location.back();
  }

  //Post a new job
  postNewJob() {
    // Go to dashboard after posting a new job
    this.route.navigate(['consumer/postJob']);
    // this.closeSidenav();
  }

  goToDashboard() {
    if (this.userRole == 'Consumer') {
      this.route.navigate(['consumer/consumerDashboard']);
    } else if (this.userRole == 'Driver') {
      this.route.navigate(['driver/driverDashboard']);
    }
    // this.closeSidenav();
  }
  goToNotification() {
    if (this.userRole == 'Consumer') {
      this.route.navigate(['consumer/consumerNotification']);
    } else if (this.userRole == 'Driver') {
      this.route.navigate(['driver/driverNotification']);
    }
    // this.closeSidenav();
  }
  goTosettings() {
    if (this.userRole == 'Consumer') {
      this.route.navigate(['consumer/settings']);
    } else if (this.userRole == 'Driver') {
      this.route.navigate(['driver/driverSetting']);
    } else {
      localStorage.setItem('userRole', 'Consumer');
      this.userRole = 'Consumer';
      this.route.navigate(['consumer/settings']);
    }
    // this.closeSidenav();
  }

  // goTosettings() {
  //   this.route.navigate(['driver/driverSetting']);
  // }
  goToUserSelection() {
    this.route.navigate(['auth/userRoleSelection']);
  }
  goToAboutUs() {
    this.route.navigate(['auth/about']);
    // this.closeSidenav();
  }
  goToContactUs() {
    this.route.navigate(['auth/contact']);
    // this.closeSidenav();
  }
  goToHelp() {
    this.route.navigate(['auth/help']);
    // this.closeSidenav();
  }
  goToPolicy() {
    this, this.route.navigate(['auth/policy']);
    // this.closeSidenav();
  }
  viewMyJobs() {
    this.route.navigate(['driver/jobList']);
    // this.closeSidenav();
  }
  goToMarketPalace() {
    this.activatedRoute.url.subscribe((v) => {
      if (v[0].path.includes('market-home')) {
        this.route.navigate(['auth/userRoleSelection']);
      } else {
        localStorage.setItem('userRole', 'marketPlace');
        this.route.navigate(['marketplace/market-home']);
      }
    });
  }
}
