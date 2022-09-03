import { Component, AfterViewInit, EventEmitter, Injector } from '@angular/core';
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
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BasePage implements AfterViewInit {

  modalActions = new EventEmitter<string>(); // |MaterializeAction
  successModalEle;
  profileData;
  constructor(injector:Injector,private commonService:CommonServicesService, private route: Router, private commonApiService: CommonServicesService, public alert:AlertsService) {
    super(injector)
    this.getProfileData();
  }

  getProfileData(){
    this.commonApiService.getUserProfileData().then((res:any) => {
      console.log(res);
      this.profileData = res['profile']
    })
  }

  ngAfterViewInit(){
    // this.successModalEle = document.querySelectorAll('.modal');
    // M.Modal.init(this.successModalEle, { dismissible: true });
}

  logout(){
    // this.commonService.signInWithGoogle().then(res => {
    // }).catch(err => console.log(errorMessages.ERROR_SOCIAL_LOGIN, err));
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userData')
    localStorage.removeItem('__paypal_storage__');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.route.navigate(['auth/login'])
  }

  goToProfile(){
    this.route.navigate(['auth/profile'])
  }

  goToAboutUs() {
    this.route.navigate(['auth/about']);
  }

  goToHelp(){
    this.route.navigate(['auth/help']);
  }
  goToPolicy(){
    this.route.navigate(['auth/policy']);
  }
  goToNotification(){
    this.route.navigate(['consumer/consumerNotification']);
  }
  goToRoleSelection(){
    this.route.navigate(['auth/userRoleSelection']);
  }
  deleteAccount(){
    let data ={
      user_id: localStorage.getItem('userId')
    }
    this.commonService.deleteAccount(data).then(data => {
      console.log(data);
      this.logout();
    }).catch(err => {
      console.log(err);
    })
  }

  openModal(){
    // var modal = document.getElementById(modalId)
    // var instance = M.Modal.getInstance(modal);
    // instance.open();
  }

  closeModal(){
    // var modal = document.getElementById(modalId)
    // var instance = M.Modal.getInstance(modal);
    // instance.close();
  }

  goToReport(){
    this.route.navigate(['auth/reportIssue']);
  }

  goToPaymentMode(){
    // this.route.navigate(['consumer/cardDetails'])
     this.route.navigate(['consumer/paymentMode'])
  }

  goToOrderHistory(){
    this.route.navigate(['consumer/orderHistory'])
  }

  goToDashboard(){
    this.route.navigate(['consumer/consumerDashboard'])
  }

  goToChatlist(){
    this.route.navigate(['chat/list']);
  }

  goToMyItems(){
    this.route.navigate(['marketplace/myitem']);
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
  showLogoutConfirmation(){
    this.alert.presentConfirm('OK','Cancel','Logout',"Are you sure you want to logout?")
    .then(data=>{
      if(data == true){
        this.logout();
      }
      else{
        return false;
      }
    })
  }

  showDeleteAccountConfirmation(){
    this.alert.presentConfirm('OK','Cancel','Delete Account',"Are you sure you want to delete your account?")
    .then(data=>{
      if(data == true){
        this.deleteAccount();
      }
      else{
        return false;
      }
    })
  }

}
