import { Component, OnInit, EventEmitter } from '@angular/core';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { Router } from '@angular/router';
// import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css';
// import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  modalActions = new EventEmitter<string >(); // | MaterializeAction
  jobsId;
  successModalEle;
  jobsList = [];
  security_code;
  lat;
  lng;

  constructor(
    private route: Router,
    private driverApiService: DriverApiService
  ) {
    this.getMyJobList();
    this.getCurrentPosition();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.successModalEle = document.querySelectorAll('.modal');
    // M.Modal.init(this.successModalEle, { dismissible: true });
  }

  //Get selected job list
  getMyJobList() {
    this.driverApiService
      .driverSelectedjobList({ deliverer_id: localStorage.getItem('userId') })
      .then((res: any) => {
        console.log('JOB LIST', res);

        res.jobs.forEach((element) => {
          this.jobsList.push({
            id: element.id,
            title: element.description,
            jobLabel: element.priority,
            amount: element.job_price,
            sourceAddress: element.job_address,
            destinationAddress: element.delivery_address,
            status: element.status,
            security_code: element.security_code,
            poster_name: element.poster_name,
            poster_contact: element.poster_contact,
          });
          this.security_code = element.security_code;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Update package
  packageStatusUpdate(status, modal) {
    navigator.geolocation.getCurrentPosition((resp) => {
      if (status == 'Delivered') {
        this.openModal('otp', this.jobsId);
      } else {
        let jobData: any = {
          job_id: this.jobsId,
          status: status,
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude,
        };
        this.driverApiService
          .packageStatusChange(jobData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.closeModal(modal);
    });
  }

  //Track package
  trackJob(jobs) {
    this.route.navigate(['driver/trackPackage', { jobId: jobs.id }]);
    console.log('id', jobs.id);
  }

  openModal(modalId, jobId) {
    this.jobsId = jobId;
    var modal = document.getElementById(modalId);
    // var instance = M.Modal.getInstance(modal);
    // instance.open();
  }

  closeModal(modalId) {
    // var modal = document.getElementById(modalId);
    // var instance = M.Modal.getInstance(modal);
    // instance.close();
  }

  verifySecurityToken() {
    if (this.jobsList[0].security_code == this.security_code) {
      let jobData: any = {
        job_id: this.jobsId,
        status: 'Delivered',
        latitude: this.lat,
        longitude: this.lng,
      };

      this.driverApiService
        .packageStatusChange(jobData)
        .then((res) => {
          console.log(res);
          let reqData = {
            job_id: parseInt(this.jobsId),
            amount: this.jobsList[0].amount,
          };
          this.driverApiService.setAmountInWallet(reqData).then((res) => {});
          this.route.navigate(['driver/driverReviews', { jobId: this.jobsId }]);

          this.closeModal('otp');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.security_code = '';
      // M.toast({ html: 'Security code incorrect', classes: 'dlvr-error-toast' });
    }
  }

  getCurrentPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (resp) => {
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
            resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
          },
          (err) => {
            reject(err);
          }
        );
      }, 1000);
    });
  }
}
