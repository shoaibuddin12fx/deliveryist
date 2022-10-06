import { Injectable } from '@angular/core';
import { CommonServicesService } from './common-services.service';
import { ApiService } from './_helpers/api.service';
import { UtilityService } from './_helpers/utility.service';
import { config } from '../shared/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ConsumerApiService {
  consumerId = localStorage.getItem('consumerId');
  constructor(
    private commonService: CommonServicesService,
    private apiService: ApiService,
    private utilityService: UtilityService
  ) {}

  // Get the consumer posted job list from id
  getJobList(data) {
    return new Promise((resolve, reject) => {
      //call job list api here
      this.apiService
        .get(config.api.job.getAllJob + data, { withCredentials: false })
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

  // Post a new job
  postNewJob(newJobData) {
    return new Promise((resolve, reject) => {
      //call api to post a new job data
      this.apiService.post(config.api.job.addJob, newJobData, {}).subscribe(
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

  currentTrackJobProgress() {
    return new Promise((resolve, reject) => {
      this.apiService.get(config.api.job.currentTrackJobProgress).subscribe(
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

  userPendingJobs() {
    return new Promise((resolve, reject) => {
      this.apiService.get(config.api.job.userPendingJobs).subscribe(
        (data: any) => {
          if (data.status == 200) {
            // this.utilityService.showToast(data.message, 'success');
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

  getCurrentJobDetails(jobID) {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(config.api.job.currentTrackJobProgress + jobID, {})
        .subscribe(
          (data: any) => {
            console.log('getCurrentJobDetails data', data);

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

  //Get Track Record of Job
  getTrackRecordOfJob(jobData) {
    return new Promise((resolve, reject) => {
      console.log(jobData);
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

  //Get notifications for consumer
  getNotificationByConsumerId() {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(config.api.notification.consumerNotification, {})
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

  //Get notifications for consumer
  getNotifyStatus() {
    return new Promise((resolve, reject) => {
      this.apiService.get(config.api.notification.notifyStatus, {}).subscribe(
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

  //update notification status
  updateNotifyStatus(data) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(config.api.notification.updateNotifyStatus, data, {})
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

  //Delete posted job
  deleteJob(jobId) {
    return new Promise((resolve, reject) => {
      this.apiService.post(config.api.job.cancelJob, jobId, {}).subscribe(
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

  //cancel Driver
  // cancelDriver(jobId){
  //   return new Promise((resolve, reject) => {
  //     this.apiService.post(config.api.job.cancelDriver, jobId, {}).subscribe((data:any) => {
  //       if(data.status == 200){
  //         this.utilityService.showToast(data.message, 'success');
  //         resolve(data);
  //       } else {
  //         this.utilityService.showToast(data.message, 'error');
  //         reject(data.message);
  //       }
  //     })
  //   })
  // }

  //Submit review and ratings
  ratingAndReview(data) {
    return new Promise((resolve, reject) => {
      this.apiService.post(config.api.job.ratingAndReview, data, {}).subscribe(
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

  getConsumerProfileByDriver(data) {
    return new Promise((resolve, reject) => {
      // call Sign up backend api here
      this.apiService.post(config.api.user.consumerProfile, data, {}).subscribe(
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

  // call for calculated amout of order
  getAmountForOrder(data) {
    return new Promise((resolve, reject) => {
      // call Sign up backend api here
      this.apiService.post(config.api.job.calculateAmount, data, {}).subscribe(
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

  getCardDetail() {
    return new Promise((resolve, reject) => {
      // call Sign up backend api here
      this.apiService.post(config.api.pay.cardDetail, {}, {}).subscribe(
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
}
