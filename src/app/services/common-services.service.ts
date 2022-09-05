import { Injectable, OnInit } from '@angular/core';
// import {
//   FacebookLoginProvider,
//   SocialUser,
//   GoogleLoginProvider,
// } from 'angularx-social-login';
import PhoneNumber from 'awesome-phonenumber';
import { ApiService } from './_helpers/api.service';
import { config } from '../shared/config/api.config';
import { UtilityService } from './_helpers/utility.service';
import { errorMessages } from '../helpers/error_messages';
import { NetworkService } from './_helpers/network.service';
import { StorageService } from './_helpers/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CommonServicesService implements OnInit {
  // user: SocialUser;
  loggedIn: boolean;
  regionCode = localStorage.getItem('countryCode');
  userRole = localStorage.getItem('userRole');
  constructor(
    public apiService: ApiService,
    private network: NetworkService,
    private utility: UtilityService,
    public storage: StorageService
  ) {}

  ngOnInit() {}

  // Check mobile number is valid or not
  isPhoneNumberValid(phoneNumberInput) {
    console.log(phoneNumberInput);
    const pn = new PhoneNumber(
      phoneNumberInput,
      localStorage.getItem('countryCode')
    );
    if (pn.isValid() && pn.isMobile()) {
      return true;
    } else {
      return false;
    }
  }

  // social Login with Facebook
  signInWithFB() {
    let email;
    // return new Promise((resolve, reject) => {
    //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
    //     console.log('in fb', res);
    //     // resolve(res);
    //     if (res) {
    //       this.userSocialLogin({token: res}, 'facebook').then(res => {
    //         resolve(res);
    //       }).catch(err => {
    //         if (err.message === 'No such user') {
    //           err.email = email;
    //         }
    //         reject(err);
    //       });
    //     } else {
    //       reject(null);
    //     }
    //   }).catch(err => reject(err));
    // });
  }

  // Social Login with Google
  async signInWithGoogle() {
    return new Promise((resolve, reject) => {
      let email;
      // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res:any) => {
      //   email = res.email;
      //   this.userLogin({token: res.idToken}).then(res => {
      //     resolve(res);
      //   }).catch(err => {
      //     if(err.message == 'No such user'){
      //       err.email = email;
      //     }
      //       reject(err)
      //     });
      // }).catch(err => reject(err));
      // const provider = new auth.GoogleAuthProvider();
      // this.afAuth.signInWithPopup(provider).then( res => {
      //   const token = this.afAuth.idToken;
      //   if (token) {
      //     this.userSocialLogin({token: res}, 'google').then(res => {
      //       resolve(res);
      //     }).catch(err => {
      //       if (err.message === 'No such user') {
      //         err.email = email;
      //       }
      //       reject(err);
      //     });
      //   } else {
      //     reject(null);
      //   }
      // });
      // this.afAuth.auth.signInWithPopup(provider).then((res:any) => {
      //   this.afAuth.auth.currentUser.getIdToken(true).then(res => {
      //     this.userLogin({token: res}).then(res => {
      //           resolve(res);
      //     }).catch(err => {
      //       if(err.message == 'No such user'){
      //           err.email = email;
      //       }
      //       reject(err)
      //     });
      //   })
      // });
    });
  }

  //Social Logout
  signOutFromSocialAccount() {
    // return new Promise((resolve,reject) => {
    //   this.authService.signOut().then(res => { localStorage.removeItem('currentUser'); resolve(res) }).catch(err => reject(err));
    // })
  }

  // User Social Login
  userSocialLogin(userData, socialPlatform) {
    return new Promise((resolve, reject) => {
      // call Login backend api here
      console.log('in social login', userData, socialPlatform);
      let data;
      if (socialPlatform === 'google') {
        data = {
          display_name: userData.token.user.displayName,
          email: userData.token.user.email,
          social: socialPlatform,
        };
      } else {
        data = {
          display_name: userData.token.name,
          email: userData.token.email,
          social: socialPlatform,
        };
      }
      this.apiService
        .post(config.api.user.socialLogin, data, { withCredentials: false })
        .subscribe(
          (data: any) => {
            if (data.status === 200) {
              this.utility.showToast(data.message, 'success');
              localStorage.setItem('token', data.token);
              // this.getUserProfileData();
              resolve(data);
            }
          },
          (err) => {
            this.utility.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  // Login
  userLogin(userData) {
    return new Promise((resolve, reject) => {
      // call Login backend api here
      this.apiService
        .post(config.api.user.login, userData, { withCredentials: false })
        .subscribe(
          (data: any) => {
            if (data.status === 200) {
              this.utility.showToast(data.message, 'success');
              localStorage.setItem('token', data.token);
              console.log(data);
              this.getUserProfileData();
              resolve(userData);
              // } else {
              //   this.utility.showToast((data.message == 'No such user') ? (errorMessages.ERROR_SOCIAL_LOGIN) : data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            console.log(err.error.message);
            this.utility.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  //signUp
  userSignUp(userData) {
    return new Promise((resolve, reject) => {
      // call Sign up backend api here
      this.apiService.post(config.api.user.register, userData).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.utility.showToast(data.message, 'success');
            localStorage.setItem('token', data.token.access_token);
            this.getUserProfileData();
            resolve(data);
            // } else {
            //   this.utility.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  sendJobCompleteOtp(jobData) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(config.api.job.sendJobCompleteOtp, jobData)
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              console.log('OTP is sent!');
              resolve(data);
            }
          },
          (err) => {
            reject(err.error.message);
          }
        );
    });
  }

  //forgotPassword
  sendForgetPasswordEmail(email) {
    return new Promise((resolve, reject) => {
      this.network.postForgetPassword({ email: email }).then(
        (v) => {
          this.utility.showToast(v['message'], v['bool'] ? 'success' : 'error');
          resolve('');
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  // sendJobCompleteOtp(jobData) {
  //   return new Promise((resolve, reject) => {
  //     this.apiService
  //       .post(config.api.job.sendJobCompleteOtp, jobData)
  //       .subscribe(
  //         (data: any) => {
  //           if (data.status == 200) {
  //             console.log('OTP is sent!');
  //             resolve(data);
  //           }
  //         },
  //         (err) => {
  //           reject(err.error.message);
  //         }
  //       );
  //   });
  // }

  getOTP(email) {
    return new Promise((resolve, reject) => {
      // call get OTP backend api here
      this.apiService.post(config.api.user.getOTP, email, {}).subscribe(
        (data: any) => {
          console.log('sending OTP');
          if (data.status == 200) {
            this.utility.showToast(data.message, 'success');
            resolve(data);
            // } else {
            //   this.utility.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  // verify an otp for forget password
  verifyOTP(data) {
    return new Promise((resolve, reject) => {
      // call verify  OTP backend api here
      this.apiService.post(config.api.user.verifyOTP, data, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.utility.showToast(data.message, 'success');
            localStorage.setItem('token', data.token);
            resolve(data);
            // } else {
            //   this.utility.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  //ResetPassword
  resetPassword(userData) {
    return new Promise((resolve, reject) => {
      // call Reset Password backend api here
      this.apiService
        .post(config.api.user.updatePassword, userData, {})
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              this.utility.showToast(data.message, 'success');

              resolve(data);
              // } else {
              //   this.utility.showToast(data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            this.utility.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  //updateUser Profile
  updateUserProfile(userData) {
    return new Promise((resolve, reject) => {
      // call Sign up backend api here
      this.apiService
        .post(config.api.user.updateProfile, userData, {})
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              this.utility.showToast(data.message, 'success');
              this.getUserProfileData();
              resolve(data);
              // } else {
              //   this.utility.showToast(data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            this.utility.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  // get user profile data
  getUserProfileData() {
    return new Promise((resolve, reject) => {
      // call Sign up backend api here
      this.network.getProfile().then(
        (data: any) => {
          console.log(data);
          if (data['bool'] === true) {
            localStorage.removeItem('userData');
            localStorage.removeItem('userId');
            localStorage.setItem('userData', JSON.stringify(data['profile']));
            localStorage.setItem('userId', data.profile.id);
            resolve(data);
            // } else {
            //   this.utility.showToast(data['message'], 'error');
            //   resolve(null)
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  // Get otp in mobile for sign up
  getOTPforMobileNumberVerification(contact) {
    return new Promise((resolve, reject) => {
      // call get OTP backend api here
      this.apiService.post(config.api.user.getOTP, contact, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            console.log(data);
            this.utility.showToast(data.message, 'success');
            resolve(data);
            // } else {
            //  this.utility.showToast(data.message, 'error');
            //  reject(data.message);
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  // verify and otp for signup
  verifyOTPforMobileNumberVerification(otp) {
    return new Promise((resolve, reject) => {
      // call verify  OTP backend api here
      this.apiService.post(config.api.user.verifyOTP, otp, {}).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status == 200) {
            this.utility.showToast(data.message, 'success');
            resolve(data);
            // } else {
            //   this.utility.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  //delete account of user
  deleteAccount(data) {
    return new Promise((resolve, reject) => {
      this.apiService.post(config.api.user.deleteAccount, data, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.utility.showToast(data.message, 'success');
            resolve(data);
            // } else {
            //   this.utility.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  // report an issue
  reportAnIssue(data) {
    return new Promise((resolve, reject) => {
      this.apiService.post(config.api.user.reportIssue, data, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.utility.showToast(data.message, 'success');
            resolve(data);
            // } else {
            //   this.utility.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  //get device Token
  getDeviceToken(token) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(config.api.user.deviceToken, token, { withCredentials: false })
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              this.utility.showToast(data.message, 'success');
              this.trackUser();
              resolve(data);
              // } else {
              //   this.utility.showToast(data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            this.utility.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  //track user
  trackUser() {
    return new Promise(async (resolve) => {
      const res = await this.utility.getCurrentLocationCoordinates();

      let data = {
        latitude: res['coords'].lat,
        longitude: res['coords'].lng,
      };
      this.apiService.post(config.api.user.trackUser, data, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            // this.utility.showToast(data.message, 'success');
            resolve(data);
            // } else {
            //   this.utility.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          resolve(null);
        }
      );
    });
  }

  //call to change user role from driver to consumer and viceversa
  userRoleChange(role) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(config.api.user.roleChange, role, { withCredentials: false })
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              // this.utility.showToast(data.message, 'success');
              resolve(data);
              // } else {
              //   this.utility.showToast(data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            this.utility.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  //pay with stripe
  payToStripe(payData) {
    return new Promise((resolve, reject) => {
      this.apiService.post(config.api.pay.payToStripe, payData, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.utility.showToast(data.message, 'success');
            resolve(data);
            // } else {
            //   this.utility.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  createPaypalOrder(data) {
    return new Promise((resolve, reject) => {
      this.apiService.post('payment/createPaypalOrder', data, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.utility.showToast(data.message, 'success');
            resolve(data);
            // } else {
            //   this.utility.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  createPaypalcapture(data) {
    return new Promise((resolve, reject) => {
      this.apiService.post('payment/createPaypalCapture', data, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.utility.showToast(data.message, 'success');
            resolve(data);
            // } else {
            //   this.utility.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  setFcmToken(data) {
    return new Promise((resolve, reject) => {
      this.apiService.post('user/setFcmToken', data, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.utility.showToast(data.message, 'success');
            resolve(data);
            // } else {
            //   this.utility.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utility.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }
}
