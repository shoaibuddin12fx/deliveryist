import { Component, Injector, OnInit } from '@angular/core';
import { errorMessages } from 'src/app/helpers/error_messages';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage extends BasePage implements OnInit {
  loading = false;
  jobsList: any;
  response: any;
  profileData;
  activeSection = 'pending';
  jobs: any;
  constructor(
    injector: Injector,
    private driverApiService: DriverApiService,
    private consumerApiService: ConsumerApiService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.getCurrentJobs();

    this.pendingJobs();
  }

  pendingJobs() {}

  async getCurrentJobs() {
    const res = await this.consumerApiService.currentTrackJobProgress();
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
        console.log('obj', obj);

        return obj;
      });
    }
  }

  goToSetting() {
    this.navigateTo('pages/settings');
  }

  goToHome() {
    this.navigateTo('pages/user-role-selection');
  }

  goToTrackOrder(jobs) {
    // this.data is our servise
    console.log('Hellow JObs', jobs);

    this.data.job_data = jobs;
    this.navigateTo('pages/track-driver');
  }
}
