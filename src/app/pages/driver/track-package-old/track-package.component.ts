import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverApiService } from 'src/app/services/driver-api.service';
// import { } from 'googlemaps';
import { AlertController } from '@ionic/angular';
// import M from 'materialize-css/dist/js/materialize.min.js';
// import { MaterializeAction } from 'angular2-materialize';
import { Platform } from '@ionic/angular';
import { CommonServicesService } from 'src/app/services/common-services.service';
// import { AgmDirectionModule } from 'agm-direction'; // agm-directionS
// declare let $: any;
declare var google;
@Component({
  selector: 'app-track-package',
  templateUrl: './track-package.component.html',
  styleUrls: ['./track-package.component.scss'],
})
export class TrackPackageComponent implements OnInit {
  step1;
  step2;
  step3;
  lat;
  lng;
  currLat;
  currLng;
  totalDuration;
  totalDistance;
  origin: any;
  destination: any;
  origin1: any;
  destination1: any;
  track = [];
  destinationLat: any;
  destinationLng: any;
  renderOptions = {
    suppressMarkers: true,
    draggable: false,
  };
  isIos = false;
  latlng = [
    [24.8735964, 67.0140135],
    [24.8804011, 67.1533675],
  ];
  markerOptions = {
    origin: {
      icon: 'assets/images/car5.png',
      draggable: false,
    },
    destination: {
      icon: 'assets/images/source1.png',
      draggable: false,
    },
  };
  jobId;
  modalActions = new EventEmitter<string>(); // | MaterializeAction
  security_code;

  constructor(
    private commonService: CommonServicesService,
    private router: Router,
    private driverApiService: DriverApiService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private platform: Platform
  ) {
    this.activatedRoute.params.subscribe((data) => {
      this.jobId = data.jobId;
      console.log('job', data);
    });

    this.getCurrentPosition()
      .then((res) => {
        this.getTrackingRecord().then((trackData: any) => {
          console.log(trackData);
          this.track = [
            {
              status: trackData.status,
              poster_id: trackData.poster_id,
              receiver_contact: trackData.receiver_contact,
              receiver_name: trackData.receiver_name || trackData.poster_name,
              job_address: trackData.job_address,
              security_code: trackData.security_code,
              delivery_address: trackData.delivery_address,
              delivery_address_appartment:
                trackData.delivery_address_appartment,
              source_address_appartment: trackData.source_address_appartment,
              poster_contact: trackData.poster_contact,
              poster_name: trackData.poster_name,
              amount: trackData.job_price,
            },
          ];
          setInterval(() => {
            if (trackData.status == 'Accepted') {
              this.track[0].origin = {
                // currLat: trackData.job_latitude,
                // currLng: trackData.job_longitude,
                currLat: 24.8735964,
                currLng: 67.0140135,
              };
              console.log();
              this.track[0].destination = {
                destinationLat: 24.8804011,
                destinationLng: 67.1533675,
              };
              // console.log('track', this.track);
              (this.destinationLat = this.track[0].destination.lat),
                (this.destinationLng = this.track[0].destination.lng);
            } else if (trackData.status == 'Received') {
              this.track[0].origin = { lat: this.currLat, lng: this.currLng };
              this.track[0].destination = {
                lat: trackData.delivery_latitude,
                lng: trackData.delivery_longitude,
              };
            } else {
              this.track[0].origin = {
                lat: trackData.job_latitude,
                lng: trackData.job_longitude,
              };
              this.track[0].destination = {
                lat: trackData.delivery_latitude,
                lng: trackData.delivery_longitude,
              };
            }
            this.origin = this.track[0].origin;
            this.destination = this.track[0].destination;
            console.log('lat, lng', `${this.currLat},${this.currLng}`);
          }, 3000);

          this.showStep();
        });
      })
      .catch((err) => {
        console.log('Geolocation is not supported', err);
      });
  }

  ngOnInit() {
    if (this.platform.is('ios')) {
      this.isIos = true;
    }
  }

  getTrackingRecord() {
    // Get track record of the job
    return new Promise((resolve, reject) => {
      this.driverApiService
        .getJobDetail(this.jobId)
        .then((trackData: any) => {
          // trackData.status = 'Received';
          resolve(trackData);
        })
        .catch((err) => {
          this.router.navigate(['driver/driverDashboard']);
        });
    });
  }

  onResponse(event: any) {
    let service = new google.maps.DistanceMatrixService();
    let origin1 = new google.maps.LatLng(this.origin.lat, this.origin.lng);
    let destinationB = new google.maps.LatLng(
      this.destination.lat,
      this.destination.lng
    );
    service.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: [destinationB],
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        this.totalDistance = response.rows[0].elements[0].distance.text;
        this.totalDuration = response.rows[0].elements[0].duration.text;
      }
    );
  }

  //Go for Ratings and Reviews
  // goToRatings(){
  //   this.router.navigate(['driver/driverReviews', {jobId: this.jobId}]);
  // }

  //View driver profile
  viewConsumerDetail(consumerId) {
    this.router.navigate(['driver/viewProfile', { poster_id: consumerId }]);
  }

  showStep() {
    this.step1 = document.getElementById('step1');
    this.step2 = document.getElementById('step2');
    this.step3 = document.getElementById('step3');
    if (this.track[0].status == 'Accepted') {
      this.step1?.classList.remove('is-active');
      this.step1?.classList.add('is-complete');
      this.step2?.classList.add('is-active');
    } else if (this.track[0].status == 'Received') {
      this.step1?.classList.remove('is-active');
      this.step1?.classList.add('is-complete');
      this.step2?.classList.add('is-active');
      this.step2?.classList.remove('is-active');
      this.step2?.classList.add('is-complete');
      this.step3?.classList.add('is-active');
    } else if (this.track[0].status == 'Delivered') {
      this.step1?.classList.remove('is-active');
      this.step1?.classList.add('is-complete');
      this.step2?.classList.add('is-active');
      this.step2?.classList.remove('is-active');
      this.step2?.classList.add('is-complete');
      this.step3?.classList.add('is-active');
      this.step3.classList.add('is-complete');
    }
  }

  getDirection() {
    this.origin1 = { lat: 24.799448, lng: 120.979021 };
    this.destination1 = { lat: 24.799524, lng: 120.975017 };

    // Location within a string
    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }

  getCurrentPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (resp) => {
            this.currLat = resp.coords.latitude;
            this.currLng = resp.coords.longitude;
            resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
          },
          (err) => {
            reject(err);
          }
        );
      }, 1000);
    });
  }
  //Open  Modal
  async openModel(modal) {
    if (modal == 'modal2') {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message:
          '<strong>Have you reached destination and delivered a package to consumer</strong>',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'danger',
            handler: () => {
              console.log('Confirm Cancel');
            },
          },
          {
            text: 'Yes',
            cssClass: 'success',
            handler: (alertData) => {
              //takes the data
              this.changeStatusToReceived('Delivered');
            },
          },
        ],
      });

      await alert.present();

      await alert.onDidDismiss();
    } else if (modal == 'modal1') {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message:
          '<strong>Have you reached destination and accepted a package?</strong>',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'danger',
            handler: () => {
              console.log('Confirm Cancel');
            },
          },
          {
            text: 'Yes',
            cssClass: 'success',
            handler: (alertData) => {
              //takes the data
              this.commonService
                .sendJobCompleteOtp(this.track)
                .then((res: any) => {
                  this.changeStatusToReceived('Received');
                });
            },
          },
        ],
      });

      await alert.present();

      await alert.onDidDismiss();
    } else if (modal == 'otp') {
      const alert = await this.alertController.create({
        message: 'Have you delivered the package and got OTP?',
        inputs: [
          {
            name: 'OTP',
            type: 'text',
            //value: this.track[0]?.security_code,
            placeholder: 'Enter OTP recieved by the reciever',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'danger',
            handler: () => {
              console.log('Confirm Cancel');
            },
          },
          {
            text: 'Confirm',
            cssClass: 'success',
            handler: (alertData) => {
              //takes the data TODO COMMENT
              // this.security_code = alertData.OTP;
              // if (this.security_code != null || this.security_code != '') {
              //   this.verifySecurityToken();
              this.router.navigate(['driver/deliveryCompleted']);
              // } else {
              //   return false;
              // }
            },
          },
        ],
      });

      await alert.present();

      await alert.onDidDismiss();
    }
  }
  //close modal
  closeModel() {
    // var elems = document.getElementById(modal);
    // var instances = M.Modal.getInstance(elems);
    // instances.close();
    this.alertController.dismiss();
  }

  changeStatusToReceived(status) {
    if (status == 'Delivered') {
      this.openModel('otp');
      // this.router.navigate(['driver/driverReviews', {jobId: this.jobId}]);
    } else {
      let jobData: any = {
        job_id: this.jobId,
        status: status,
        latitude: this.currLat,
        longitude: this.currLng,
      };

      this.driverApiService
        .packageStatusChange(jobData)
        .then((res) => {
          console.log(res);
          this.closeModel();
          this.getTrackingRecord().then((trackData: any) => {
            this.track = [
              {
                status: trackData.status,
                poster_id: trackData.poster_id,
                receiver_contact: trackData.receiver_contact,
                receiver_name: trackData.receiver_name || trackData.poster_name,
                job_address: trackData.job_address,
                security_code: trackData.security_code,
                delivery_address: trackData.delivery_address,
                delivery_address_appartment:
                  trackData.delivery_address_appartment,
                source_address_appartment: trackData.source_address_appartment,
                poster_contact: trackData.poster_contact,
                poster_name: trackData.poster_name,
                amount: trackData.job_price,
              },
            ];
            setInterval(() => {
              if (trackData.status == 'Accepted') {
                this.track[0].origin = { lat: this.currLat, lng: this.currLng };
                this.track[0].destination = {
                  lat: trackData.job_latitude,
                  lng: trackData.job_longitude,
                };
                console.log('step 1 complete');
              } else if (trackData.status == 'Received') {
                this.track[0].origin = { lat: this.currLat, lng: this.currLng };
                this.track[0].destination = {
                  lat: trackData.delivery_latitude,
                  lng: trackData.delivery_longitude,
                };
              } else {
                this.track[0].origin = {
                  lat: trackData.job_latitude,
                  lng: trackData.job_longitude,
                };
                this.track[0].destination = {
                  lat: trackData.delivery_latitude,
                  lng: trackData.delivery_longitude,
                };
              }
              this.origin = this.track[0].origin;
              this.destination = this.track[0].destination;
            }, 3000);

            this.showStep();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  verifySecurityToken() {
    if (this.track[0].security_code == this.security_code) {
      let jobData: any = {
        job_id: this.jobId,
        status: 'Delivered',
        latitude: this.currLat,
        longitude: this.currLng,
      };

      this.driverApiService
        .packageStatusChange(jobData)
        .then((res) => {
          console.log(res);
          let reqData = {
            job_id: parseInt(this.jobId),
            amount: this.track[0].amount,
          };
          this.driverApiService.setAmountInWallet(reqData).then((res) => {
            this.router.navigate(['driver/deliveryHistory']);
          });
          this.closeModel();
          this.closeModel();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.security_code = '';
      // M.toast({ html: 'Security code incorrect', classes: 'dlvr-error-toast' });
    }
  }
}
