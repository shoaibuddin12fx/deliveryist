import { Component, Injector, OnInit } from '@angular/core';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { BasePage } from '../base-page/base-page';
import { JobListPageModule } from '../driver/job-list/job-list.module';

@Component({
  selector: 'app-user-role-selection',
  templateUrl: './user-role-selection.page.html',
  styleUrls: ['./user-role-selection.page.scss'],
})
export class UserRoleSelectionPage extends BasePage implements OnInit {
  // modalActions = new EventEmitter<string|MaterializeAction>();
  userRole;
  JobListPageModule;
  userName: any = JSON.parse(localStorage.getItem('userData'));
  isGeolocationEnabledAndSet = false;
  coords = null;

  constructor(
    injector: Injector,
    private commonApiService: CommonServicesService
  ) {
    super(injector);
  }
  ngOnInit(): void {}

  ionViewWillEnter() {
    const fcm_token = localStorage.getItem('fcm_token');
    console.log(fcm_token);
    this.commonService.setFcmToken({ fcm_token: fcm_token });
    this.getUserLocation();
  }

  getUserLocation() {
    return new Promise(async (resolve) => {
      this.coords = await this.utility.getCurrentLocationCoordinates();

      if (this.coords) {
        console.log(this.coords);
      }
    });

    //   .getCurrentPosition()
  }

  async goAsConsumer() {
    const res = await this.changeRole('Consumer');
    this.navigateTo('pages/consumer/consumer-dashboard');
  }

  async goAsDriver() {
    const res = await this.changeRole('Driver');
    // this.navigateTo('pages/driver/driver-dashbaord');

    // this.navigateTo('pages/driver/add-photo');

    console.log('Checking');
    this.commonApiService.getUserProfileData().then((res: any) => {
      if (res.profile.is_vehicle_verified) {
        console.log('Run When Licence verify go Dash');
        this.navigateTo('pages/driver-dashboard/');
        // this.route.navigateByUrl('driver/driverDashboard');
        // this.route.navigateByUrl('driver/addPhoto');
      } else {
        // this.route.navigateByUrl('driver/myVehicle');
        this.navigateTo('pages/add-photo');
        console.log('Go Add photo page when dont have licence');
        // this.route.navigateByUrl('driver/addPhoto');
      }
      console.log(res);
    });
  }

  async goToMarket() {
    const res = await this.changeRole('Marketplace');
    this.navigateTo('marketplace');
  }

  async trackUser() {
    return await this.commonService.trackUser();
  }

  changeRole(role) {
    return new Promise((resolve) => {
      this.commonService
        .userRoleChange({ role: role })
        .then((data) => {
          console.log(data);
          localStorage.setItem('userRole', role);
          this.trackUser();
          resolve(role);
        })
        .catch((err) => {
          console.error(err);
          resolve(null);
        });
    });
  }
  //open modal
  //  openModal(role) {
  //   this.userRole = role;
  //   // this.modalActions.emit({action:"modal",params:['open']});
  // }
}
