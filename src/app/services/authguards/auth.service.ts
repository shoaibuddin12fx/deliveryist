import { Injectable } from '@angular/core';
import { NetworkService } from '../_helpers/network.service';
import { UtilityService } from '../_helpers/utility.service';
import { Router } from '@angular/router';
import { StorageService } from '../_helpers/storage.service';
import { ProfileService } from 'src/app/pages/market-place/services/profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public network: NetworkService,
    public utility: UtilityService,
    private router: Router,
    private profileService: ProfileService,
    public storage: StorageService
  ) {}

  signUpUser(formdata) {
    // your code for checking credentials and getting tokens for for signing in user
    return new Promise((resolve) => {
      this.network.postRegister(formdata).then(
        async (data) => {
          //  save data like token or user info here
          console.log(data);
          resolve(data);
          // const flag = await this.saveData(data);
          // if (flag) {
          //   resolve(data);
          // } else {
          //   resolve(null);
          // }
        },
        (err) => {
          console.log(err);
          resolve(null);
        }
      );
    });
  }

  signinUser(formdata) {
    // your code for checking credentials and getting tokens for for signing in user
    return new Promise((resolve) => {
      this.network.postLogin(formdata).then(
        async (data) => {
          console.log({ data });

          //  save data like token or user info here
          const flag = await this.saveData(data);
          if (flag) {
            resolve(data);
          } else {
            resolve(null);
          }
        },
        (err) => {
          console.log(err);
          resolve(null);
        }
      );
    });
  }

  saveData(data) {
    console.log(data);
    return new Promise(async (resolve) => {
      // currently save token here and return
      await this.storage.setKey('token', data['token']);
      await this.profileService.getUserProfile();
      resolve(true);
    });
  }

  async logout() {
    this.storage.removeKey('token');
    let res = await this.network.postLogout();
    this.router.navigate(['/auth/login']);
  }

  // isAuthenticated() {
  //   // here you can check if user is authenticated or not through his token
  //   return new Promise(async resolve => {

  //     resolve(true)
  //     // // check if sesson cookie exist
  //     // let flag = await this.network.isAuthorized();
  //     // console.log(flag);
  //     // let status = flag['status'];
  //     // status == 200 ? resolve(true) : resolve(false);

  //   })

  // }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token
    return new Promise(async (resolve) => {
      resolve(this.network.getProfile());
    });
  }
}
