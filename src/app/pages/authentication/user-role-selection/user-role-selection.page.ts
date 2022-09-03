import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-user-role-selection',
  templateUrl: './user-role-selection.page.html',
  styleUrls: ['./user-role-selection.page.scss'],
})
export class UserRoleSelectionPage extends BasePage implements OnInit {
  // modalActions = new EventEmitter<string|MaterializeAction>();
  userRole;
  userName: any = JSON.parse(localStorage.getItem('userData'));

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  ionViewWillEnter() {
    const fcmToken = localStorage.getItem('fcm_token');
    console.log(fcmToken);

    //
    if (fcmToken) {
      this.commonService.setFcmToken({ fcm_token: fcmToken });
    }
  }

  goAsConsumer() {
    // if (this.geoLocation.getCurrentPosition()) {
    // this.geoLocation
    //   .getCurrentPosition()
    //   .then((resp) => {
    //     console.log('location response', resp);

    this.changeRole('Consumer').then((x) => {
      console.log({ x });

      this.navigateTo('consumer/postJob');
    });
    // })
    // .catch(() => {
    //   alert('Please on your location');
    //   console.log('Error getting location');
    // });
    // } else {
    //   alert('Please on your location');
    // }
  }

  goAsDriver() {
    // this.changeRole('Driver').then(() => {
    //   this.commonApiService.getUserProfileData().then((res: any) => {
    //     if (res.profile.is_vehicle_verified) {
    //       console.log('photo page');
    //       this.route.navigateByUrl('driver/driverDashboard');
    //       // this.route.navigateByUrl('driver/addPhoto');
    //     } else {
    //       // this.route.navigateByUrl('driver/myVehicle');
    //       console.log('photo page');
    //       this.route.navigateByUrl('driver/addPhoto');
    //     }
    //     console.log(res);
    //   });
    // });
  }

  goToMarket() {
    // localStorage.setItem('userRole', 'marketPlace');
    // this.route.navigate(['marketplace']);
  }

  async trackUser() {
    await this.commonService
      .trackUser()
      .then((data) => {})
      .catch((err) => {});
  }

  changeRole(role) {
    return new Promise((resolve, reject) => {
      this.commonService
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
