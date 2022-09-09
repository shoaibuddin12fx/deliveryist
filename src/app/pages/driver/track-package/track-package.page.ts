import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { BasePage } from '../../base-page/base-page';
import { HelpModalComponent } from './help-modal/help-modal.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OtpModalComponent } from './otp-modal/otp-modal.component';

declare var google;

@Component({
  selector: 'app-track-package',
  templateUrl: './track-package.page.html',
  styleUrls: ['./track-package.page.scss'],
})
export class TrackPackagePage extends BasePage implements OnInit {
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
  ngOnInit(): void {}

  async getJobDetails() {
    console.log('APPLY TO JOB TS');

    const res = (await this.driverApiService.getJobDetail(this.jobId)) as any;

    if (res) {
      console.log('JobID data', this.jobId);
      console.log('Get Track Detail', res);

      this.job = res;
      console.log('Get Track', this.job);

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

  openOtpModal() {
    this.modals.present(OtpModalComponent);
  }
  openDetail() {
    this.modals.present(OrderDetailComponent);
  }
  openHelp() {
    this.modals.present(HelpModalComponent);
  }
}
