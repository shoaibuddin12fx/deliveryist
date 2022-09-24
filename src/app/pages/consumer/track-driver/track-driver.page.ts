import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { errorMessages } from 'src/app/helpers/error_messages';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
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
  jobsList: any;
  jobs: any;
  constructor(
    injector: Injector,
    public activatedRoute: ActivatedRoute,
    private consumerApiService: ConsumerApiService
  ) {
    super(injector);

    // this.activatedRoute.params.subscribe((data) => {
    //   this.jobId = data.id;
    //   console.log('Data Value in job', data);

    //   if (this.jobId) {
    //     this.getJobDetail();
    //   }
    // });
  }

  ngOnInit() {
    console.log('Job Details Current ', this.data.job_data);

    this.jobs = this.data.job_data;

    this.security = localStorage.getItem('security-otp');
    console.log('security', this.security);
  }

  async getJobDetail() {
    const res = (await this.consumerApiService.getCurrentJobDetails(
      this.jobId
    )) as any;
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
        };

        return obj;
      });
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
    if (this.track[0].status === 'Accepted') {
      document.getElementById('truckprogress').style.width = '25.5%';
      this.step1.classList.remove('is-active');
      this.step1.classList.add('is-complete');
      this.step2.classList.add('is-active');
    } else if (this.track[0].status === 'Received') {
      document.getElementById('truckprogress').style.width = '60%';
      this.step1.classList.remove('is-active');
      this.step1.classList.add('is-complete');
      this.step2.classList.add('is-active');
      this.step2.classList.remove('is-active');
      this.step2.classList.add('is-complete');
      this.step3.classList.add('is-active');
    } else if (this.track[0].status === 'Delivered') {
      document.getElementById('truckprogress').style.width = '100%';
      this.step1.classList.remove('is-active');
      this.step1.classList.add('is-complete');
      this.step2.classList.add('is-active');
      this.step2.classList.remove('is-active');
      this.step2.classList.add('is-complete');
      this.step3.classList.add('is-active');
      this.step3.classList.add('is-complete');
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
