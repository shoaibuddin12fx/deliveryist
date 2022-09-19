import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { AutocompletePage } from 'src/app/components/autocomplete/autocomplete.page';
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
  driverInitialLocations: any;

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
        job_id: res.id,
        security_code: res.security_code,
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

      // this.origin = this.track.origin;
      // this.destination = this.track.destination;
      const dis = (await this.utility.getDistanceOfCoordinates(
        this.track.origin,
        this.track.destination
      )) as any;

      this.totalDistance = dis.distance;
      this.totalDuration = dis.duration;

      // this.setMapCoordinatesAndGetReady();
      // await this.gettrackJobLocations();
      // this.updatetrackJobLocations();
    }
  }

  async setMapCoordinatesAndGetReady() {
    const res = await this.modals.present(AutocompletePage);
    console.log(res, this.track.status);

    let data = res.data;
    if (data.coords) {
      this.driverInitialLocations = data;
      this.gettrackJobLocations();
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

  async statusDrivingChange() {
    switch (this.track.status) {
      case 'pending':
        this.track.status = 'start_journey_to_origin';

        this.events.publish('play_data', {
          status: this.track.status,
        });
        // , {
        //   key: 'start_journey_to_origin',
        //   value: { k: 'p' },
        // });

        break;
      case 'set_arrived_at_pickup':
        this.track.status = 'arrived_at_pickup';
        const res3 = await this.updatetrackJobLocations();
        this.events.publish('update_data', res3);
        break;
      case 'start_journey_to_origin':
        break;
      case 'arrived_at_pickup':
        const res = await this.updatetrackJobLocations();
        this.events.publish('update_data', res);
        this.track.status = 'loaded_and_ready_to_start';

        break;
      case 'loaded_and_ready_to_start':
        await this.updatetrackJobLocations();
        this.track.status = 'start_journey_to_destination';
        this.events.publish('play_data', {
          status: this.track.status,
        });
        break;

      case 'start_journey_to_destination':
        console.log('fire start_journey_to_destination');
        await this.updatetrackJobLocations();
        break;
      case 'arrived_at_delivery':
        this.track.status = 'delivery_complete';
        await this.updatetrackJobLocations();

        break;
      case 'delivery_complete':
        this.openOtpModal();

        break;
    }
  }

  async mapOutput($event) {
    console.log($event);
    const key = $event.key;
    const value = $event.value;

    switch (key) {
      case 'loop_completed':
        // this.progressLocations.coords.lat = value.lat;
        // this.progressLocations.coords.lng = value.lng;
        // this.track.status = value.status;

        const current_status = this.track.status;
        console.log('current_status', this.track.status);
        switch (current_status) {
          case 'start_journey_to_origin':
            this.track.status = 'arrived_at_pickup';
            await this.updatetrackJobLocations();

            break;
          case 'arrived_at_pickup':
            this.track.status = 'arrived_at_pickup';

            this.driverInitialLocations = {
              coords: value,
            };

            this.progressLocations = this.driverInitialLocations;
            const res = await this.updatetrackJobLocations();
            // this.events.publish('update_data', res);

            break;

          case 'start_journey_to_destination':
            this.track.status = 'arrived_at_delivery';
            this.driverInitialLocations = {
              coords: value,
            };

            this.progressLocations = this.driverInitialLocations;

            const res2 = await this.updatetrackJobLocations();
            break;
        }
        // this.track.status = value.status;

        break;
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
      case 'driverReachedToDestination':
        this.track.status = 'start_journey_to_destination';

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
      case 'set_arrived_at_pickup':
        return 'Set Arrived at pickup';
        break;
      case 'arrived_at_pickup':
        return 'Arrived at pickup';
        break;
      case 'loaded_and_ready_to_start':
        return 'Start delivery';
        break;
      case 'start_journey_to_destination':
        return 'Loaded & delivery started';
        break;
      case 'arrived_at_delivery':
        return 'Arrived at delivery location';
        break;
      case 'delivery_complete':
        return 'Delivery completed';
        break;
    }
  }

  async gettrackJobLocations() {
    var self = this;
    let loc = null; //(await this.utility.getCurrentLocationCoordinates()) as any;

    // if (this.track.status == 'pending') {
    loc = this.driverInitialLocations;
    // }

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
      console.log('DATA', res);

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
      resolve(res);
    });

    // update map pointers with locations
    //this.progressLocations = res.job_locations;
  }
}
