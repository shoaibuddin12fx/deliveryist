import { Component, EventEmitter, AfterViewInit } from '@angular/core';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { Router } from '@angular/router';
// import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css';
// import { MaterializeAction } from 'angular2-materialize';
import { AlertsService } from 'src/app/services/_helpers/alerts.service';
import { BasePage } from '../../base-page/base-page';
import { ModalService } from 'src/app/services/_helpers/modal.service';
import { ProfileComponent } from '../../profile-old/profile.component';

@Component({
  selector: 'app-driver-settings',
  templateUrl: './driver-settings.component.html',
  styleUrls: ['./driver-settings.component.scss'],
})
export class DriverSettingsComponent implements AfterViewInit {
  modalActions = new EventEmitter<string>(); // | MaterializeAction
  successModalEle;
  profileData;

  constructor(
    private commonService: CommonServicesService,
    private route: Router,
    public alert: AlertsService,
    public modals: ModalService
  ) {
    this.getProfileData();
  }

  getProfileData() {
    this.commonService.getUserProfileData().then((res: any) => {
      console.log(res);
      this.profileData = res['profile'];
    });
  }

  ngAfterViewInit() {
    this.successModalEle = document.querySelectorAll('.modal');
    // M.Modal.init(this.successModalEle, { dismissible: true });
  }

  logout() {
    // this.commonService.signInWithGoogle().then(res => {
    // }).catch(err => console.log(errorMessages.ERROR_SOCIAL_LOGIN, err));
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userData');
    localStorage.removeItem('userId');
    localStorage.removeItem('__paypal_storage__');
    this.route.navigate(['auth/login']);
  }

  goToProfile() {
    this.modals.present(ProfileComponent);
  }

  goToAboutUs() {
    this.route.navigate(['auth/about']);
  }

  goToHelp() {
    this.route.navigate(['auth/help']);
  }

  goToPayment() {
    this.route.navigate(['auth/policy']);
  }

  goToNotification() {
    this.route.navigate(['auth/consumerNotification']);
  }

  goToMyJobs() {
    this.route.navigate(['driver/jobList']);
  }

  goToVehicleDetails() {
    this.route.navigate(['driver/myVehicle']);
  }

  goToDeliveryHistory() {
    this.route.navigate(['driver/deliveryHistory']);
  }

  goToRoleSelection() {
    this.route.navigate(['auth/userRoleSelection']);
  }

  goToReport() {
    this.route.navigate(['auth/reportIssue']);
  }

  goToWallet() {
    this.route.navigate(['driver/wallet']);
  }

  goToEarning() {
    this.route.navigate(['driver/earning']);
  }

  deleteAccount() {
    let data = {
      user_id: localStorage.getItem('userId'),
    };
    this.commonService
      .deleteAccount(data)
      .then((data) => {
        console.log(data);
        this.logout();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openModal(modalId) {
    // var modal = document.getElementById(modalId);
    // var instance = M.Modal.getInstance(modal);
    // instance.open();
  }

  closeModal(modalId) {
    // var modal = document.getElementById(modalId);
    // var instance = M.Modal.getInstance(modal);
    // instance.close();
  }

  showLogoutConfirmation() {
    this.alert
      .presentConfirm(
        'OK',
        'Cancel',
        'Logout',
        'Are you sure you want to logout?'
      )
      .then((data) => {
        if (data == true) {
          this.logout();
        } else {
          return false;
        }
      });
  }

  showDeleteAccountConfirmation() {
    this.alert
      .presentConfirm(
        'OK',
        'Cancel',
        'Delete Account',
        'Are you sure you want to delete your account?'
      )
      .then((data) => {
        if (data == true) {
          this.deleteAccount();
        } else {
          return false;
        }
      });
  }
}
