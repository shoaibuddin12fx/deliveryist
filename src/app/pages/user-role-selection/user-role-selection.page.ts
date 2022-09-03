import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-role-selection',
  templateUrl: './user-role-selection.page.html',
  styleUrls: ['./user-role-selection.page.scss'],
})
export class UserRoleSelectionPage implements OnInit {
  // modalActions = new EventEmitter<string|MaterializeAction>();
  userRole;
  userName: any = JSON.parse(localStorage.getItem('userData'));

  constructor(
    private route: Router,
    private commonApiService: CommonServicesService,
    private geoLocation: Geolocation,
    private utility: UtilityService
  ) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    if (!localStorage.getItem('token')) {
      this.route.navigate(['auth/login']);
    }
    SplashScreen.hide();
  }

  ionViewWillEnter() {
    const fcm_token = localStorage.getItem('fcm_token');
    console.log(fcm_token);

    //
    this.commonApiService.setFcmToken({ fcm_token: fcm_token });
  }

  goAsConsumer() {
    // if (this.geoLocation.getCurrentPosition()) {
    this.geoLocation
      .getCurrentPosition()
      .then((resp) => {
        console.log('location response', resp);

        this.changeRole('Consumer').then((x) => {
          console.log({ x });

          this.route.navigateByUrl('consumer/postJob');
        });
      })
      .catch(() => {
        alert('Please on your location');
        console.log('Error getting location');
      });
    // } else {
    //   alert('Please on your location');
    // }
  }

  goAsDriver() {
    this.changeRole('Driver').then(() => {
      this.commonApiService.getUserProfileData().then((res: any) => {
        if (res.profile.is_vehicle_verified) {
          console.log('photo page');
          this.route.navigateByUrl('driver/driverDashboard');
          // this.route.navigateByUrl('driver/addPhoto');
        } else {
          // this.route.navigateByUrl('driver/myVehicle');
          console.log('photo page');
          this.route.navigateByUrl('driver/addPhoto');
        }
        console.log(res);
      });
    });
  }

  goToMarket() {
    localStorage.setItem('userRole', 'marketPlace');
    this.route.navigate(['marketplace']);
  }

  async trackUser() {
    await this.commonApiService
      .trackUser()
      .then((data) => {})
      .catch((err) => {});
  }

  changeRole(role) {
    return new Promise((resolve, reject) => {
      this.commonApiService
        .userRoleChange({ role: role })
        .then((data) => {
          localStorage.setItem('userRole', role);
          this.trackUser();
          resolve('');
        })
        .catch((err) => {
          reject();
        });
    });
  }
  //open modal
  //  openModal(role) {
  //   this.userRole = role;
  //   // this.modalActions.emit({action:"modal",params:['open']});
  // }
}
