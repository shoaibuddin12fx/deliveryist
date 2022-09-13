import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
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
  progressLocations: any;

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

      await this.gettrackJobLocations();
      this.updatetrackJobLocations();
    }
  }

  openOtpModal() {
    this.modals.present(OtpModalComponent, { track: this.track });
  }
  openDetail() {
    this.modals.present(OrderDetailComponent, { track: this.track });
  }
  openHelp() {
    this.modals.present(HelpModalComponent);
  }

  statusDrivingChange() {
    switch (this.track.status) {
      case 'pending':
        this.track.status = 'start_journey_to_origin';

        this.events.publish('update_map_behaviour', {
          key: 'start_journey_to_origin',
          value: { k: 'p' },
        });

        break;
      case 'start_journey_to_origin':
        break;
      case 'arrived_at_pickup':
        this.track.status = 'start_journey_to_origin';
        break;
    }
  }

  deliveryComplete(job) {
    this.navigateTo('/pages/driver/delivery-completed/' + job.id);
  }

  returnButtonText(status) {
    switch (status) {
      case 'pending':
        return "Let's Starts";
        break;
      case 'start_journey_to_origin':
        return 'On the way';
        break;
      case 'arrived_at_pickup':
        return 'Arrived at pickup';
        break;
    }
  }

  async mockLocations() {
    console.log('location');
    // this.progressLocations = await this.utility.getCurrentLocationCoordinates();

    // console.log(this.progressLocations);

    this.gettrackJobLocations();
  }

  async gettrackJobLocations() {
    var self = this;
    const loc = (await this.utility.getCurrentLocationCoordinates()) as any;
    var params = {
      id: this.jobId,
      driver_lat: loc.coords.lat,
      driver_lng: loc.coords.lng,
      status: this.track.status,
    };

    return new Promise(async (resolve) => {
      let res = (await this.driverApiService.gettrackJobLocations(
        this.jobId,
        params
      )) as any;

      console.log(res);

      res.coords = loc.coords;
      self.progressLocations = res;
      self.events.publish('update_data', res);

      resolve(true);
    });
  }

  async updatetrackJobLocations() {
    return new Promise(async (resolve) => {
      let data = {
        id: this.jobId,
        driver_lat: this.progressLocations.coords.lat,
        driver_lng: this.progressLocations.coords.lng,
        status: this.track.status,
      };

      const res = (await this.driverApiService.trackJobLocations(
        this.jobId,
        data
      )) as any;

      console.log(res);
      resolve(true);
    });

    // update map pointers with locations
    //this.progressLocations = res.job_locations;
  }

  async mapOutput($event) {
    console.log($event);
    const key = $event.key;
    const value = $event.value;

    switch (key) {
      case 'driverLocationUpdate':
        this.progressLocations.coords.lat = value.lat;
        this.progressLocations.coords.lng = value.lng;
        this.track.status = value.status;

        this.updatetrackJobLocations();

        break;
      case 'driverReachedToPickup':
        this.track.status = 'arrived_at_pickup';

        // call api update driver location and now change its course and destination
        this.progressLocations.coords.lat = value.lat;
        this.progressLocations.coords.lng = value.lng;
        this.track.status = value.status;

        await this.updatetrackJobLocations();
        await this.gettrackJobLocations();
        this.updatetrackJobLocations();
        break;
    }
  }
}
