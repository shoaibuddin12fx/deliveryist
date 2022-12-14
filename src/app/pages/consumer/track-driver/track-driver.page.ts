import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { errorMessages } from 'src/app/helpers/error_messages';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-track-driver',
  templateUrl: './track-driver.page.html',
  styleUrls: ['./track-driver.page.scss'],
})
export class TrackDriverPage extends BasePage implements OnInit {
  step1;
  step2;
  step3;
  lat: any;
  lng: any;
  profileData;
  totalDuration;
  totalDistance;
  origin: any;
  destination: any;
  securityCode: any;
  track = [];
  security: any = 0;
  progressLocations;
  driverInfo = [];
  renderOptions = {
    suppressMarkers: true,
    draggable: false,
  };
  markerOptions = {
    origin: {
      icon: 'assets/images/destination1.png',
      draggable: false,
    },
    destination: {
      icon: 'assets/images/source1.png',
      draggable: false,
    },
  };
  jobId;
  driverInitialLocations: any;
  jobsList: any;
  jobs: any;
  jobStatus;
  constructor(
    injector: Injector,
    public activatedRoute: ActivatedRoute,
    private consumerApiService: ConsumerApiService,
    private firebase: FirebaseService,
    private driverApiService: DriverApiService
  ) {
    super(injector);

    // this.activatedRoute.params.subscribe((data) => {
    //   this.jobId = data.id;
    //   console.log('Data Value in job', data);
    this.jobs = this.data.job_data;

    if (this.jobs) {
      this.getJobDetail();
    }
    // });
  }

  ngOnInit() {
    console.log('Job Details Current ', this.data.job_data);
    let self = this;
    this.jobs = this.data.job_data;
    if (this.jobs) {
      console.log('JobId', this.jobs.id);

      this.firebase.getJobData(this.jobs.id).subscribe((data) => {
        let job = this.jobs;
        console.log(data.type);
        if (data.type != 'removed') {
          let obj = data.payload.data();
          if (self.progressLocations?.status != obj?.status) {
            self.progressLocations = obj;
            this.jobStatus = obj.status;
            this.showStep();
          } else self.progressLocations = obj;
        }
      });
    }

    this.security = localStorage.getItem('security-otp');
    console.log('security', this.security);
  }

  async getJobDetail() {
    const res = await this.consumerApiService.getCurrentJobDetails(
      this.jobs.id
    );
    console.log('CourrentJOb', res);

    if (res['jobs'].length > 0) {
      this.jobsList = res['jobs'].map((element) => {
        let obj = {
          id: element.id,
          poster_name: element.poster_name,
          amount: element.job_price,
          sourceAddress: element.job_address,
          destinationAddress: element.delivery_address,
          rating: element.rating,
          poster_profile_pic: element.poster_profile_pic,
          reciver_profile_pic: element.receiver.profile_pic,
          reciver_first_name: element.receiver.first_name,
          reciver_last_name: element.receiver.last_name,
          reciver_full_name:
            element.receiver.first_name + ' ' + element.receiver.last_name,
          status: element.status,
        };
        this.jobStatus = element.status;

        return obj;
      });
      if (res && res['jobLocation'].length) {
        let jobLocation = res['jobLocation'][0];
        this.progressLocations = { ...jobLocation, id: jobLocation.job_id };
        this.jobStatus = jobLocation.status;
      }

      this.jobsList = this.jobsList[0];
      this.showStep();
    }
  }

  // getTrackingRecord(jobId) {
  //   // Get track record of the job
  //   return new Promise((resolve, reject) => {
  //     console.log(jobId);
  //     this.consumerApiService
  //       .getTrackRecordOfJob(jobId)
  //       .then((trackData: any) => {
  //         console.log('trackData', trackData);
  //         resolve(trackData);
  //       })
  //       .catch((err) => {
  //         this.router.navigate(['consumer/consumerDashboard']);
  //       });
  //   });
  // }

  // onResponse(event: any) {
  //   const service = new google.maps.DistanceMatrixService();
  //   const origin1 = new google.maps.LatLng(this.origin.lat, this.origin.lng);
  //   const destinationB = new google.maps.LatLng(
  //     this.destination.lat,
  //     this.destination.lng
  //   );
  //   service.getDistanceMatrix(
  //     {
  //       origins: [origin1],
  //       destinations: [destinationB],
  //       unitSystem: google.maps.UnitSystem.IMPERIAL,
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (response, status) => {
  //       this.totalDistance = response.rows[0].elements[0].distance.text;
  //       this.totalDuration = response.rows[0].elements[0].duration.text;
  //     }
  //   );
  // }

  // Go for Ratings and Reviews
  goToRatings() {
    this.router.navigate(['consumer/reviews', { jobId: this.jobId }]);
  }

  // View driver profile
  viewDriverDetail() {
    this.router.navigate([
      'consumer/viewProfile',
      { driverId: this.track[0].driverId },
    ]);
  }

  showStep() {
    this.step1 = document.getElementById('step1');
    this.step2 = document.getElementById('step2');
    this.step3 = document.getElementById('step3');
    var status = this.jobStatus;
    console.log('Status is', status);

    if (status === 'Accepted') {
      document.getElementById('truckprogress').style.width = '31%';
      this.step1?.classList.remove('is-active');
      this.step1?.classList.add('is-complete');
      this.step2?.classList.add('is-active');
    } else if (
      status === 'arrived_at_pickup' ||
      status === 'start_journey_to_origin'
    ) {
      document.getElementById('truckprogress').style.width = '51%';
      this.step1?.classList.remove('is-active');
      this.step1?.classList.add('is-complete');
      this.step2?.classList.add('is-active');
      this.step2?.classList.remove('is-active');
      this.step2?.classList.add('is-complete');
      this.step3?.classList.add('is-active');
    } else if (status === 'arrived_at_delivery') {
      document.getElementById('truckprogress').style.width = '70%';
      this.step1?.classList.remove('is-active');
      this.step1?.classList.add('is-complete');
      this.step2?.classList.add('is-active');
      this.step2?.classList.remove('is-active');
      this.step2?.classList.add('is-complete');
      this.step3?.classList.add('is-active');
      this.step3?.classList.add('is-complete');
    } else if (status === 'delivery_complete') {
      document.getElementById('truckprogress').style.width = '95%';
      this.step1?.classList.remove('is-active');
      this.step1?.classList.add('is-complete');
      this.step2?.classList.add('is-active');
      this.step2?.classList.remove('is-active');
      this.step2?.classList.add('is-complete');
      this.step3?.classList.add('is-active');
      this.step3?.classList.add('is-complete');
    }
  }

  goToHome() {
    this.navigateTo('pages/user-role-selection/');
  }

  goToSetting() {
    this.navigateTo('pages/setting');
  }

  goBack() {
    this.location.back();
  }
}
