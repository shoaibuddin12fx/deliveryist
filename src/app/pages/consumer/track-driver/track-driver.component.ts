import { Component, OnInit } from '@angular/core';
// import { } from 'googlemaps';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var google;

@Component({
  selector: 'app-track-driver',
  templateUrl: './track-driver.component.html',
  styleUrls: ['./track-driver.component.scss']
})
export class TrackDriverComponent implements OnInit {

  step1; step2; step3;
  lat: any;
  lng: any;
  totalDuration;
  totalDistance;
  origin: any;
  destination: any;
  securityCode: any;
  track = [];
  driverInfo = [];
  renderOptions = {
    suppressMarkers: true,
    draggable: false
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

  constructor(
    private router: Router,
    private consumerAPIService: ConsumerApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((data) => {
      this.jobId = data.jobId;
      console.log(this.jobId);
      console.log(data);
      this.getTrackingRecord(this.jobId).then((trackData: any) => {
        this.track = [
          { status: trackData.status,
            origin: { lat: trackData.job_latitude, lng: trackData.job_longitude },
            destination: { lat: trackData.delivery_latitude, lng: trackData.delivery_longitude },
            driverId: trackData.receiver_id,
            rating: trackData.rating || 0,
            driverName: trackData.receiver_name,
            driverNumber: trackData.receiver_contact
          },
        ];
        this.origin = this.track[0].origin;
        this.destination = this.track[0].destination;
        this.securityCode = trackData.security_code;
        this.lat = trackData.job_latitude;
        this.lng = trackData.job_longitude;
        // if (this.track[0].driverId) {
        //   this.consumerAPIService.getConsumerProfileByDriver({ consumer_id: this.track[0].driverId }).then((res: any) => {
        //   this.track[0].driverNumber = '+' + res.profile.contact.number;
        //   console.log('getConsumerProfileByDriver res', res);
        //   this.driverInfo = res;
        //   }).catch(err => console.log(err));
        // }
        this.showStep();
        console.log('this.track', this.track);
    });
    });
  }

  ngOnInit() {
  }

  getTrackingRecord(jobId) {
    // Get track record of the job
    return new Promise((resolve, reject) => {
      console.log(jobId)
      this.consumerAPIService.getTrackRecordOfJob(jobId).then((trackData: any) => {
        console.log('trackData', trackData);
        resolve(trackData);
      }).catch(err => {
        this.router.navigate(['consumer/consumerDashboard']);
      });
    });
  }

  onResponse(event: any) {
    const service = new google.maps.DistanceMatrixService();
    const origin1 = new google.maps.LatLng(this.origin.lat, this.origin.lng);
    const destinationB = new google.maps.LatLng(this.destination.lat, this.destination.lng);
    service.getDistanceMatrix(
    {
      origins: [origin1],
      destinations: [destinationB],
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
        this.totalDistance = response.rows[0].elements[0].distance.text;
        this.totalDuration = response.rows[0].elements[0].duration.text;
      });
    }

  // Go for Ratings and Reviews
  goToRatings() {
    this.router.navigate(['consumer/reviews', {jobId: this.jobId}]);
  }

  // View driver profile
  viewDriverDetail() {
    this.router.navigate(['consumer/viewProfile', { driverId : this.track[0].driverId }]);
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
}
