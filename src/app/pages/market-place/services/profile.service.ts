import { Injectable } from '@angular/core';
import { NetworkService } from 'src/app/services/_helpers/network.service';
import { UtilityService } from 'src/app/services/_helpers/utility.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/_helpers/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public profile;
  key = 'profile';
  constructor(public network: NetworkService,
              public utility: UtilityService,
              private router: Router,
              public storage: StorageService) {
      // this.getUserProfile();
  }

  getUserProfile() {

    // your code for checking credentials and getting tokens for for signing in user
    return new Promise((resolve) => {
      this.network.getProfile().then(async (data) => {

        //  save data like token or user info here
        console.log(data);
        this.profile = data['profile'];
        localStorage.setItem('userData', JSON.stringify(data['profile']));
        localStorage.setItem('userId', this.profile.id);
        resolve(data);
        // const flag = await this.saveData(data);
        // if (flag) {
        //   resolve(data);
        // } else {
        //   resolve(null);
        // }

      }, err => {
        console.log(err);
        resolve(null);
      });

    });

  }
}
