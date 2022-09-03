import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { Router } from '@angular/router';
// import { MaterializeAction } from 'angular2-materialize';
import { errorMessages } from 'src/app/helpers/error_messages';
import { successMessages } from 'src/app/helpers/success_messages';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  modalActions = new EventEmitter<string>(); // |MaterializeAction
  userOTP;
  otpEntered:boolean = false;
  forgetPasswordForm: FormGroup;
  constructor(private commonService: CommonServicesService, private route: Router) {
    // create form
    this.forgetPasswordForm = new FormGroup({
      'email': new FormControl(null, [ Validators.email, Validators.required ]),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required)
    })
  }

  ngOnInit() {

  }

  onForgetPassword() {
    if (this.forgetPasswordForm.controls['email'].valid) {
      const data = {
        email: this.forgetPasswordForm.controls['email'].value.toLowerCase(),
        forgetpassword: true,
      };
      // call forgot password API

      this.commonService.getOTP(data).then((res:any) => {
        (res.status == 200) ? this.openModal() : null;
      })
   }
  }

  goToChangePassword(){
    if(this.userOTP.length > 0) {
      // this.modalActions.emit({action:"modal",params:['close']});
      this.commonService.verifyOTP({ otp: parseInt(this.userOTP),  forgetpassword: true }).then((res:any) => {
        (res.status == 200) ? this.otpEntered = true : this.otpEntered = false;
      })
    }
  }

  goToLogin(){
    this.route.navigate(['auth/login'])
  }

  //open modal
   openModal() {
    // this.modalActions.emit({action:"modal",params:['open']});
  }

  onResetPassword(){
    //call reset password API
    if(this.forgetPasswordForm.valid){
      let data = {
        email: this.forgetPasswordForm.controls['email'].value.toLowerCase(),
        new_password: this.forgetPasswordForm.controls['password'].value
      }
      this.commonService.resetPassword(data).then(res => {
        console.log(successMessages.PASSWORD_RESET);
        this.route.navigate(['auth/userRoleSelection'])
      }).catch((err) => {
        console.log(errorMessages.ERROR_RESET_PASSWORD);
        this.route.navigate(['auth/forgetPassword']);
      })

    }

  }
}
