import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  Injector,
} from '@angular/core';
// import M from 'materialize-css/dist/js/materialize.min.js';
// import { MaterializeAction } from 'angular2-materialize';
import { AuthService } from 'src/app/services/authguards/auth.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BasePage implements OnInit, AfterViewInit {
  @Input('showBackButton') showBackButton: boolean = false;
  @Input('showHeaderTitle') showHeaderTitle: boolean = true;
  @Input('showMarketIcon') showMarketIcon: boolean = true;
  @Input('showSettingIcon') showSettingIcon: boolean = true;
  @Input('headerTitle') headerTitle: String;
  // @Output('navigateTo') navigateTo: EventEmitter<any> = new EventEmitter<any>();
  elem;
  path;
  userRole = localStorage.getItem('userRole');
  userData = JSON.parse(localStorage.getItem('userData'));
  currentRole = localStorage.getItem('userRole');
  username = this.userData?.full_name;
  isIos = false;

  constructor(
    injector: Injector,
    public location: Location,
    private route: Router // private activatedRoute: ActivatedRoute, // private authService: AuthService, // private platform: Platform
  ) {
    super(injector);
    // this.activatedRoute.url.subscribe((data) => {
    //   this.path = data[0].path;
    //   console.log(this.path);
    // });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // if (this.platform.is('ios')) {
    //   this.isIos = true;
    // }
    // this.elem = document.querySelector('.sidenav');
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
    // this.closeSidenav();
    // this.authService.logout();
    // this.navigateTo.emit('logout');
  }

  // routeTo(link) {
  //   this.closeSidenav();
  //   this.route.navigate([link]);
  // }

  goBack() {
    this.location.back();
  }

  //Post a new job
  postNewJob() {
    // Go to dashboard after posting a new job
    // this.route.navigate(['consumer/postJob']);
    // this.closeSidenav();
    // this.navigateTo.emit('pages/consumer/post-job');
  }

  goToDashboard() {
    if (this.userRole == 'Consumer') {
      // this.navigateTo.emit('pages/consumer/consumer-dashboard');
      // this.route.navigate(['consumer/consumerDashboard']);
    } else if (this.userRole == 'Driver') {
      // this.navigateTo.emit('pages/driver/driver-dashboard');
      // this.route.navigate(['driver/driverDashboard']);
    }
    // this.closeSidenav();
  }
  goToNotification() {
    if (this.userRole == 'Consumer') {
      // this.navigateTo.emit('pages/consumer/consumer-notification');
      // this.route.navigate(['consumer/consumerNotification']);
    } else if (this.userRole == 'Driver') {
      // this.navigateTo.emit('pages/driver/driver-notification');
      // this.route.navigate(['driver/driverNotification']);
    }
    // this.closeSidenav();
  }

  // goTosettings() {
  //   console.log('goTosettings', this.userRole);

  //   if (this.userRole == 'Consumer') {
  //     // this.navigateTo.emit('pages/consumer/consumer-settings');
  //     this.route.navigate(['pages/consumer/settings']);
  //   }

  //   if (this.userRole == 'Driver') {
  //     // this.navigateTo.emit('pages/driver/driver-settings');
  //     this.route.navigate(['pages/settings']);
  //   }
  //   // else {
  //   //   localStorage.setItem('userRole', 'Consumer');
  //   //   this.userRole = 'Consumer';
  //   //   this.route.navigate(['consumer/settings']);
  //   // }
  //   // this.closeSidenav();
  // }

  goTosettings() {
    // this.route.navigate(['/pages/setting']);
    this.navigateTo('pages/setting');
  }

  goToUserSelection() {
    console.log('Home');
    // this.route.navigate(['pages/user-role-selection']);
    this.navigateTo('pages/user-role-selection');
  }
  goToAboutUs() {
    // this.route.navigate(['auth/about']);
    // this.closeSidenav();
  }
  goToContactUs() {
    // this.route.navigate(['auth/contact']);
    // this.closeSidenav();
  }
  goToHelp() {
    // this.route.navigate(['auth/help']);
    // this.closeSidenav();
  }
  goToPolicy() {
    // this, this.route.navigate(['auth/policy']);
    // this.closeSidenav();
  }
  viewMyJobs() {
    // this.route.navigate(['driver/jobList']);
    // this.closeSidenav();
  }
  goToMarketPalace() {
    // this.activatedRoute.url.subscribe((v) => {
    //   if (v[0].path.includes('market-home')) {
    //     this.route.navigate(['auth/userRoleSelection']);
    //   } else {
    //     localStorage.setItem('userRole', 'marketPlace');
    //     this.route.navigate(['marketplace/market-home']);
    //   }
    // });
  }
}
