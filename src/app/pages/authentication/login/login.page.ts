import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { errorMessages } from 'src/app/helpers/error_messages';
import { AuthService } from 'src/app/services/authguards/auth.service';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { GeolocationsService } from 'src/app/services/_helpers/geolocation.service';
import { MessagingService } from 'src/app/shared/messaging.service';
import { BasePage } from '../../base-page/base-page';

declare let google;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BasePage implements OnInit {
  loginForm: FormGroup;
  loginSuccessful = false;
  regionCode = localStorage.getItem('countryCode');
  currLat: any;
  currLng: any;
  currentLocation: string;
  loading = false;

  constructor(injector: Injector) {
    super(injector);
    this.setupForm();
  }

  setupForm() {
    // create form
    this.loginForm = new FormGroup({
      email: new FormControl('anupresy@gmail.com', [
        Validators.email,
        Validators.required,
      ]),
      // 'countryCode': new FormControl(PhoneNumber.getCountryCodeForRegionCode(this.regionCode), []),
      // 'mobile': new FormControl(null, []),
      password: new FormControl('@1981king', Validators.required),
    });
  }

  // async isLoggedIn() {
  //   // Go ahead if user already signIn
  //   if (localStorage.getItem('currentUser')) {
  //     const flag = await this.authService.isAuthenticated();
  //     if (flag) {
  //       this.goToUserRoleSelection(
  //         JSON.parse(localStorage.getItem('currentUser'))
  //       );
  //     }
  //   }
  // }

  ngOnInit() {
    SplashScreen.hide();
  }

  // Go to signUp
  goToSignUp() {
    this.route.navigate(['pages/signUp']);
  }

  // After Login button clicked
  onLogin() {
    if (this.loginForm.valid) {
      const formVal = this.loginForm.value;
      // if (this.loginForm.value.mobile != null) {
      //   let phNoValid = this.commonService.isPhoneNumberValid(
      // this.loginForm.controls['countryCode'].value.toString() + this.loginForm.controls['mobile'].value);
      //   // Check mobile number entered is valid or not
      //   if (phNoValid) {
      //     delete formVal['email'];
      //     this.userLogin(formVal);
      //   } else {
      //     this.loginForm.controls['mobile'].setErrors({ valid: false });
      //     this.loginForm.invalid;
      //   }
      // } else
      if (this.loginForm.value.email != null) {
        const data = {
          email: formVal.email.toLowerCase(),
          password: formVal.password,
        };
        this.userLogin(data);
      }
    }
  }

  getCurrentLocation() {
    this.geolocation.getCurrentLocationCoordinates().then((v) => {
      const geocoder = new google.maps.Geocoder();
      this.currLat = v['lat'];
      this.currLng = v['lng'];
      const latlng = { lat: this.currLat, lng: this.currLng };
      const that = this;
      geocoder.geocode({ location: latlng }, (results, status) => {
        console.log(status);
        if (results[0]) {
          that.currentLocation =
            results[results.length - 1].address_components[0].short_name;
          localStorage.setItem('countryCode', that.currentLocation);
          localStorage.setItem('location', JSON.stringify(latlng));
          console.log(that.currentLocation);
        } else {
          console.log('No results found');
        }
      });
    });
  }
  getCurrentPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          this.currLat = resp.coords.latitude;
          this.currLng = resp.coords.longitude;
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
          console.log(this.currLng);
          console.log(this.currLat);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  signInWithFB() {
    // this.commonService.signInWithFB().then((res: any) => {
    //   if (res) {
    //     if (res.otp_verified) {
    //       this.goToUserRoleSelection(res);
    //     } else {
    //       this.goToMobileVarification(res);
    //     }
    //   }
    // }).catch(err => console.log(errorMessages.ERROR_SOCIAL_LOGIN, err));
  }

  async signInWithGoogle() {
    this.commonService
      .signInWithGoogle()
      .then((res: any) => {
        // this.messagingService.requestPermission();
        if (res) {
          if (res.otp_verified) {
            this.goToUserRoleSelection(res);
          } else {
            this.goToMobileVarification(res);
          }
        }
      })
      .catch((err) => {
        console.log('in error login', err);
        console.log(errorMessages.ERROR_SOCIAL_LOGIN, err);
        if (err === 'No such user') {
          this.route.navigate(['auth/signUp', { userEmail: err.email }]);
        }
      });
  }

  goToUserRoleSelection(userData) {
    this.commonService.getUserProfileData().then(async (res) => {
      localStorage.setItem('currentUser', JSON.stringify(userData));
      this.route.navigate(['pages/userRoleSelection']);
    });
  }

  goToMobileVarification(userData) {
    this.route.navigate(['auth/sign-up'], {
      queryParams: { isSocialLoginInitiated: 'true' },
    });
  }

  userLogin(userData) {
    // this.fbService.loginViaEmailUserWithBaseLink(userData['email'], userData['password']).then( res => {
    // console.log(res);
    // this.loginSuccessful = true;
    // this.messagingService.requestPermission();
    // this.goToUserRoleSelection(res);
    // })
    this.loading = true;
    this.commonService.userLogin(userData).then(
      async (res) => {
        this.loginSuccessful = true;
        this.loading = false;
        // await this.messagingService.requestPermission();
        this.goToUserRoleSelection(res);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  goToForgotPassword() {
    this.route.navigate(['auth/forgetPassword']);
  }
}
