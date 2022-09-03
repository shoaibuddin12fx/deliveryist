import {
  Component,
  AfterViewInit,
  EventEmitter,
  Injector,
} from '@angular/core';
import { CommonServicesService } from 'src/app/services/common-services.service';
// import { errorMessages } from 'src/app/helpers/error_messages';
import { Router } from '@angular/router';
// import M from "materialize-css/dist/js/materialize.min.js";
import 'materialize-css';
// import {MaterializeAction} from 'angular2-materialize';
import { AlertController } from '@ionic/angular';
import { BasePage } from '../../base-page/base-page';
import { AlertsService } from 'src/app/services/_helpers/alerts.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends BasePage implements AfterViewInit {
  modalActions = new EventEmitter<string>(); // |MaterializeAction
  successModalEle;
  profileData;
  constructor(injector: Injector) {
    super(injector);
    this.getProfileData();
  }

  getProfileData() {
    // this.commonApiService.getUserProfileData().then((res: any) => {
    //   console.log(res);
    //   this.profileData = res['profile'];
    // });
  }

  ngAfterViewInit() {
    // this.successModalEle = document.querySelectorAll('.modal');
    // M.Modal.init(this.successModalEle, { dismissible: true });
  }

  logout() {
    // this.commonService.signInWithGoogle().then(res => {
    // }).catch(err => console.log(errorMessages.ERROR_SOCIAL_LOGIN, err));
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userData');
    localStorage.removeItem('__paypal_storage__');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.navigateTo(['pages/login']);
  }

  goToProfile() {
    this.navigateTo(['pages/profile']);
  }

  goToAboutUs() {
    this.navigateTo(['pages/about']);
  }

  goToHelp() {
    this.navigateTo(['pages/help']);
  }
  goToPolicy() {
    this.navigateTo(['pages/policy']);
  }
  goToNotification() {
    this.navigateTo(['consumer/consumerNotification']);
  }
  goToRoleSelection() {
    this.navigateTo(['pages/userRoleSelection']);
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

  openModal() {
    // var modal = document.getElementById(modalId)
    // var instance = M.Modal.getInstance(modal);
    // instance.open();
  }

  closeModal() {
    // var modal = document.getElementById(modalId)
    // var instance = M.Modal.getInstance(modal);
    // instance.close();
  }

  goToReport() {
    this.navigateTo(['pages/reportIssue']);
  }

  goToPaymentMode() {
    // this.navigateTo(['consumer/cardDetails'])
    this.navigateTo(['consumer/paymentMode']);
  }

  goToOrderHistory() {
    this.navigateTo(['consumer/orderHistory']);
  }

  goToDashboard() {
    this.navigateTo(['consumer/consumerDashboard']);
  }

  goToChatlist() {
    this.navigateTo(['chat/list']);
  }

  goToMyItems() {
    this.navigateTo(['marketplace/myitem']);
  }

  // async showLogoutConfirmation() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Confirm!',
  //     message: 'Are you sure you want to logout?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //         }
  //       }, {
  //         text: 'Okay',
  //         handler: () => {
  //           this.logout()
  //         }
  //       }
  //     ]
  //   });
  //   this.utility.presentAlert()
  //   await alert.present();
  // }
  showLogoutConfirmation() {
    // this.alert
    //   .presentConfirm(
    //     'OK',
    //     'Cancel',
    //     'Logout',
    //     'Are you sure you want to logout?'
    //   )
    //   .then((data) => {
    //     if (data == true) {
    //       this.logout();
    //     } else {
    //       return false;
    //     }
    //   });
  }

  showDeleteAccountConfirmation() {
    // this.alert
    //   .presentConfirm(
    //     'OK',
    //     'Cancel',
    //     'Delete Account',
    //     'Are you sure you want to delete your account?'
    //   )
    //   .then((data) => {
    //     if (data == true) {
    //       this.deleteAccount();
    //     } else {
    //       return false;
    //     }
    //   });
  }
}
