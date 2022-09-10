import { Component, Injector, OnInit } from '@angular/core';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-delivery-completed',
  templateUrl: './delivery-completed.page.html',
  styleUrls: ['./delivery-completed.page.scss'],
})
export class DeliveryCompletedPage extends BasePage implements OnInit {
  job: any;
  origin: any;
  destination: any;
  totalDuration;
  totalDistance;
  track: any;
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
      console.log('Delviery Compelete Detail', res);

      this.job = res;

      this.track = {
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
  goToDriver() {
    this.navigateTo('/pages/user-role-selection/');
  }
}
