import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { BasePage } from '../../base-page/base-page';

declare var google;

@Component({
  selector: 'app-apply-to-job',
  templateUrl: './apply-to-job.page.html',
  styleUrls: ['./apply-to-job.page.scss'],
})
export class ApplyToJobPage extends BasePage implements OnInit {
  job: any;
  origin: any;
  destination: any;
  totalDuration;
  totalDistance;
  track: any;
  //   // {
  //   //   sourceAddress: '1100, Hidden Ridge, Irving',
  //   //   deliveryAddress: '8801, Rodeo Dr, Irving',
  //   //   jobAmount: '10.48',
  //   //   itemCategory: 'Electronic',
  //   //   packageSize: 'small',
  //   //   poster_name: 'Asd',
  //   //   deliveryType: 'immidiate',
  //   //   package_size: 'Truck',
  //   //   poster_contact: '+92 4564545',
  //   //   deliveryDate: '20-02-2020',
  //   //   instructionForReceiver: 'For Details Call Drive (+92 78425444)',
  //   //   origin: { lat: 'res.job_latitude', lng: 'res.job_longitude' },
  //   //   destination: {
  //   //     lat: 'res.delivery_latitude',
  //   //     lng: 'res.delivery_longitude',
  //   //   },
  //   // },
  // ];
  icon = 'assets/images/destination1.png';
  jobId;

  constructor(injector: Injector, private driverApiService: DriverApiService) {
    super(injector);
    this.activatedRoute.params.subscribe((data) => {
      this.jobId = data.id;
      console.log('Data Value in Apply to job', data);

      if (this.jobId) {
        this.getJobDetails();
      }
    });
  }

  ngOnInit() {}

  async getJobDetails() {
    console.log('APPLY TO JOB TS');

    const res = (await this.driverApiService.getJobDetail(this.jobId)) as any;

    if (res) {
      console.log('JobID data', this.jobId);
      console.log('Get Job Detail', res);

      this.job = res;
      console.log('Get Job', this.job);

      this.track = {
        status: res.status,
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
        receiverName: res.receiver_name,
        receiverNumber: res.receiver_contact,
        poster_contact: res.poster_contact,
        priority: res.priority,
        instructionForReceiver: res.receiver_instructions,
        origin: { lat: res.job_latitude, lng: res.job_longitude },
        destination: {
          lat: res.delivery_latitude,
          lng: res.delivery_longitude,
        },
      };

      this.origin = this.track.origin;
      this.destination = this.track.destination;
      const dis = (await this.utility.getDistanceOfCoordinates(
        this.origin,
        this.destination
      )) as any;

      this.totalDistance = dis.distance;
      this.totalDuration = dis.duration;
    }
  }

  goToApplyJob(job) {
    console.log('gotojob', job),
      this.navigateTo('pages/driver/track-package/' + job.id);

    // this.driverApiService
    //   .applyToJob({
    //     job_id: this.jobId,
    //     bid_details: 'Hello, I can get this delivered. Contact me in chat',
    //   })
    //   .then((res) => {
    //     console.log('Job accepted', res);
    //     this.navigateTo('pages/driver/track-package/' + job.id);

    //     console.log('jobID', job);
    //   })
    //   .catch((err) => {
    //     console.log({ err });
    //   });
  }
}
