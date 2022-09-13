import { Injectable } from '@angular/core';
import { UtilityService } from './_helpers/utility.service';
import { ApiService } from './_helpers/api.service';
import { CommonServicesService } from './common-services.service';
import { config } from '../shared/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class DriverApiService {
  constructor(
    private commonService: CommonServicesService,
    private apiService: ApiService,
    private utilityService: UtilityService
  ) {}

  //get driver profile by id
  driverProfileById(driverId) {
    return new Promise((resolve, reject) => {
      // call Sign up backend api here
      this.apiService
        .post(config.api.user.driverProfile, driverId, {})
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              resolve(data);
              // } else {
              //   this.utilityService.showToast(data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            this.utilityService.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  //Get all job list
  getJobList(locationData) {
    return new Promise((resolve, reject) => {
      this.apiService.post(config.api.job.jobList, locationData, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            resolve(data);
            // } else {
            //   this.utilityService.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utilityService.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  //Getjob detail
  getJobDetail(jobData) {
    return new Promise((resolve, reject) => {
      this.apiService.get(config.api.job.trackJob + jobData, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            resolve(data.job);
            // } else {
            //   this.utilityService.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utilityService.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  trackJobLocations(id, data) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(config.api.job.trackJobLocations + id, data)
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              resolve(data.job_locations);
              // } else {
              //   this.utilityService.showToast(data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            this.utilityService.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  gettrackJobLocations(id, params) {
    const str = this.serialize(params);
    return new Promise((resolve, reject) => {
      this.apiService
        .get(config.api.job.gettrackJobLocations + id + '?' + str)
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              resolve(data.job_locations);
              // } else {
              //   this.utilityService.showToast(data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            this.utilityService.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  //apply tojob
  applyToJob(jobData) {
    return new Promise((resolve, reject) => {
      this.apiService.post(config.api.job.applyJob, jobData, {}).subscribe(
        (data: any) => {
          console.log('data', data);

          if (data.status == 200) {
            this.utilityService.showToast(data.message, 'success');
            resolve(data);
            // } else {
            //   this.utilityService.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utilityService.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  //Get job list in which driver is selected for
  driverSelectedjobList(delivererData) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(config.api.job.selectedJobList, delivererData, {})
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              resolve(data);
              // } else {
              //   this.utilityService.showToast(data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            this.utilityService.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  packageStatusChange(jobData) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(config.api.job.packageStatusChange, jobData, {})
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              this.utilityService.showToast(data.message, 'success');
              resolve(data);
              // } else {
              //   this.utilityService.showToast(data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            this.utilityService.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  //setAmount in Wallet
  setAmountInWallet(data) {
    return new Promise((resolve, reject) => {
      this.apiService.post(config.api.pay.setAmountWallet, data, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.utilityService.showToast(data.message, 'success');
            resolve(data);
          }
        },
        (err) => {
          this.utilityService.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  //ratings and re
  ratingAndReview(reviewData) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(config.api.job.driverRatingAndReview, reviewData, {})
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              this.utilityService.showToast(data.message, 'success');
              resolve(data);
              // } else {
              //   this.utilityService.showToast(data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            this.utilityService.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  //get notification by driver id
  getNotificationByDriverId() {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(config.api.notification.driverNotification, {})
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              this.utilityService.showToast(data.message, 'success');
              resolve(data);
              // } else {
              //   this.utilityService.showToast(data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            this.utilityService.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  //submit the driver license detail to admin
  approveDriverLicense(data) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(config.api.job.submitVehicleData, data, {})
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              this.utilityService.showToast(data.message, 'success');
              resolve(data);
              // } else {
              //   this.utilityService.showToast(data.message, 'error');
              //   reject(data.message);
            }
          },
          (err) => {
            this.utilityService.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  // Filter jobs
  filterJobs(data) {
    return new Promise((resolve, reject) => {
      this.apiService.post(config.api.job.filterJob, data, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.utilityService.showToast(data.message, 'success');
            resolve(data);
            // } else {
            //   this.utilityService.showToast(data.message, 'error');
            //   reject(data.message);
          }
        },
        (err) => {
          this.utilityService.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  //get wallet Records
  getWalletRecords(type) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(config.api.wallet.getWalletRecord, type, {})
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              this.utilityService.showToast(data.message, 'success');
              resolve(data);
            }
          },
          (err) => {
            this.utilityService.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  //get cashout
  getPaid(data) {
    return new Promise((resolve, reject) => {
      this.apiService.post(config.api.wallet.getCashOut, data, {}).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.utilityService.showToast(data.message, 'success');
            resolve(data);
          }
        },
        (err) => {
          this.utilityService.showToast(err.error.message, 'error');
          reject(err.error.message);
        }
      );
    });
  }

  //get Earning
  getEarnings(type) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(config.api.wallet.getEarnings, { category: type }, {})
        .subscribe(
          (data: any) => {
            if (data.status == 200) {
              this.utilityService.showToast(data.message, 'success');
              resolve(data);
            }
          },
          (err) => {
            this.utilityService.showToast(err.error.message, 'error');
            reject(err.error.message);
          }
        );
    });
  }

  serialize = (obj) => {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  };
}
