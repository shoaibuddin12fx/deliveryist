import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { BasePage } from '../../base-page/base-page';
import { JobFilterComponent } from './job-filter/job-filter.component';

@Component({
  selector: 'app-driver-dashbaord',
  templateUrl: './driver-dashbaord.page.html',
  styleUrls: ['./driver-dashbaord.page.scss'],
})
export class DriverDashbaordPage extends BasePage implements OnInit {
  loading = false;
  jobsList = [];
  response: any;
  constructor(injector: Injector, private driverApiService: DriverApiService) {
    super(injector);
    this.getDriversData();
    this.events.subscribe('driverUpdated', this.receiveUpdatedData.bind(this));
  }

  receiveUpdatedData() {
    this.getDriversData();
  }

  ngOnInit() {}

  async getDriversData() {
    const res = await this.utility.getCurrentLocationCoordinates();
    console.log('current position', res);
    const coords = res['coords'];

    this.loading = true;
    const response = await this.driverApiService.getJobList({
      latitude: coords.lat,
      longitude: coords.lng,
    });

    console.log('joblist', response);

    // this.jobsList = this.response.jobs;

    // console.log(this.jobsList);

    if (response['jobs'].length > 0) {
      this.jobsList = response['jobs'].map((element) => {
        let obj = {
          id: element.id,
          poster_name: element.poster_name,
          amount: element.job_price,
          sourceAddress: element.job_address,
          destinationAddress: element.delivery_address,
          rating: element.rating,
          poster_profile_pic: element.poster_profile_pic,
        };

        return obj;
      });
    }
  }

  // openFilter() {
  //   this.openModal();
  //   this.filterActive = true;
  // }

  // // open modal
  // async openModal() {
  //   this.filterActive = true;
  //   const modal = await this.modalController.create({
  //     component: JobFilterComponent,
  //     cssClass: 'decrease-modal-height',
  //   });
  //   const data = await modal.present();
  //   modal.onDidDismiss().then((data) => {
  //     this.filterActive = false;
  //   });
  //   // // this.modalActions.emit({action: 'modal', params: ['open']});
  // }

  // // close modal
  // closeModal() {
  //   // // this.modalActions.emit({action: 'modal', params: ['close']});
  //   // const res = this.utility.s
  //   this.filterActive = false;
  // }

  goToJobDetail(jobs) {
    console.log('Detail', jobs);
    this.navigateTo('pages/driver/apply-to-job/' + jobs.id);
  }

  // goToMyJob() {
  //   this.route.navigate(['driver/jobList']);
  // }

  // changeFilterCarType(event, type) {
  //   this.filterCarType.forEach(ele => {
  //     if (ele.name === type) {
  //       (event.target.checked === true) ? ele.isSelected = true : ele.isSelected = false;
  //     }
  //   });
  // }

  // filterData() {
  //   const data = {
  //     vehicle_type: [],
  //     distance: this.filterDistance,
  //     longitude:this.currLng,
  //     latitude:this.currLat
  //   };
  //   this.filterCarType.forEach(e => (e.isSelected) ? data.vehicle_type.push(e.name) : null);
  //   this.driverApiService.filterJobs(data).then((data: any) => {
  //     console.log(data);
  //     // this.jobsList = [];
  //     // data.jobs.forEach(element => {
  //     //   this.jobsList.push({
  //     //     id: element.id, title: element.description, jobLabel: element.priority, amount: element.job_price, sourceAddress: element.job_address , destinationAddress: element.delivery_address
  //     //   })
  //     // });
  //   }).catch(err => {
  //     console.log(err);
  //   });
  //   this.closeModal();
  // }
}
