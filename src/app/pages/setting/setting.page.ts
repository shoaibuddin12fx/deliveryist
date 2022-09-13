import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { AlertsService } from 'src/app/services/_helpers/alerts.service';
import { BasePage } from '../base-page/base-page';
import { ConsumerNotificationComponent } from '../consumer/consumer-notification-old/consumer-notification.component';
import { NotificationPageModule } from '../consumer/notification/notification.module';
import { OrderHistoryComponent } from '../consumer/order-history-old/order-history.component';
import { DeliveryHistoryComponent } from '../driver/delivery-history/delivery-history.component';
import { EarningComponent } from '../driver/earning-old/earning.component';
import { WalletComponent } from '../driver/wallet-old/wallet.component';
import { HelpComponent } from '../help-old/help.component';
import { PolicyComponent } from '../payment-old/policy.component';
import { ProfileComponent } from '../profile-old/profile.component';
import { ReportIssueComponent } from '../report-issue-old/report-issue.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage extends BasePage implements OnInit {
  modalActions = new EventEmitter<string>(); // | MaterializeAction
  successModalEle;
  profileData;
  consumer = false;
  userRole = localStorage.getItem('userRole');
  settingPage: any;

  constructor(
    injector: Injector,
    public commonService: CommonServicesService,
    private route: Router,
    public alert: AlertsService
  ) {
    super(injector);
    this.getProfileData();
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    if (this.userRole == 'Driver') {
      this.consumer = true;
    }
  }

  // hideDriversettings() {
  //   this.consumer = false;
  // }

  goBack() {
    this.location.back();
  }

  getProfileData() {
    this.commonService.getUserProfileData().then((res: any) => {
      console.log(' User Data', res);
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
    // this.route.navigate(['auth/login']);
    this.navigateTo('/pages/login/');
  }

  goToProfile() {
    this.navigateTo('/pages/profile/');
  }

  goToAboutUs() {
    this.route.navigate(['auth/about']);
  }

  goToHelp() {
    this.navigateTo('/pages/help');
  }

  goToPayment() {
    this.navigateTo('/pages/payment/');
  }

  goToNotification() {
    // this.modals.present(ConsumerNotificationComponent);
    this.navigateTo('/pages/notification/');
  }

  goToMyJobs() {
    this.route.navigate(['driver/jobList']);
  }

  goToVehicleDetails() {
    this.route.navigate(['driver/myVehicle']);
  }

  goToDeliveryHistory() {
    // this.modals.present(OrderHistoryComponent);
    this.navigateTo('/pages/order-history/');
  }

  goToRoleSelection() {
    this.route.navigate(['auth/userRoleSelection']);
  }

  ReportIssueComponent() {
    this.navigateTo('/pages/report-issue/');
  }

  goToWallet() {
    // this.modals.present(WalletComponent);
    this.navigateTo('/pages/wallet/');
  }

  goToEarning() {
    // this.modals.present(EarningComponent);
    this.navigateTo('/pages/earning/');
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
