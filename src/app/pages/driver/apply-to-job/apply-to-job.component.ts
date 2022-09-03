import { Component, OnInit } from '@angular/core';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { } from 'googlemaps';

declare var google;

@Component({
  selector: 'app-apply-to-job',
  templateUrl: './apply-to-job.component.html',
  styleUrls: ['./apply-to-job.component.scss'],
})
export class ApplyToJobComponent implements OnInit {
  origin: any;
  destination: any;
  lat;
  lng;
  jobsList;
  totalDuration;
  totalDistance;
  track = [
    //   {
    //   sourceAddress: '1100, Hidden Ridge, Irving',
    //   deliveryAddress: '8801, Rodeo Dr, Irving',
    //   jobAmount: '10.48',
    //   itemCategory: 'Electronic',
    //   packageSize: 'small',
    //   deliveryType: 'immidiate',
    //   deliveryDate: '20-02-2020',
    //   instructionForReceiver: 'res.receiver_instructions',
    //   origin: {lat: 'res.job_latitude', lng: 'res.job_longitude'},
    //   destination: {lat: 'res.delivery_latitude', lng: 'res.delivery_longitude'},
    // }
  ];
  icon = 'assets/images/destination1.png';
  jobId;

  constructor(
    private driverApiService: DriverApiService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {
    this.activatedRoute.params.subscribe((data) => {
      this.jobId = data.jobId;
    });
  }

  ngOnInit() {
    // get the job details
    this.driverApiService
      .getJobDetail(this.jobId)
      .then((res: any) => {
        if (res) {
          console.log('Details', res);

          this.track = [
            {
              sourceAddress: res.job_address,
              deliveryAddress: res.delivery_address,
              jobAmount: res.job_price,
              poster_name: res.poster_name,
              itemCategory: res.item_category,
              packageSize: res.package_size,
              deliveryType: res.priority,
              deliveryDate: res.expected_delivery_time,
              package_size: res.package_size,
              photos_urls: res.photos_urls,
              // receiverName: res.receiver_name,
              // 'receiverNumber': res.receiver_contact,
              poster_contact: res.poster_contact,
              priority: res.priority,
              instructionForReceiver: res.receiver_instructions,
              origin: { lat: res.job_latitude, lng: res.job_longitude },
              destination: {
                lat: res.delivery_latitude,
                lng: res.delivery_longitude,
              },
            },
          ];
          this.lat = res.job_latitude;
          this.lng = res.job_longitude;
          this.origin = this.track[0].origin;
          this.destination = this.track[0].destination;
        }
        this.onResponse();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onResponse() {
    const service = new google.maps.DistanceMatrixService();
    const origin1 = new google.maps.LatLng(this.origin.lat, this.origin.lng);
    const destinationB = new google.maps.LatLng(
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

  goToApplyJob() {
    this.driverApiService
      .applyToJob({
        job_id: this.jobId,
        bid_details: 'Hello, I can get this delivered. Contact me in chat',
      })
      .then((res) => {
        console.log('umar', res);
        this.route.navigate(['driver/trackPackage', { jobId: this.jobId }]);
      })
      .catch((err) => {
        console.log({ err });
      });
  }
}
