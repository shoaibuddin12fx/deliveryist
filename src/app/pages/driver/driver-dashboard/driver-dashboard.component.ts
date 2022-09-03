import {
  Component,
  OnInit,
  EventEmitter,
  Injector,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { DriverApiService } from 'src/app/services/driver-api.service';
import 'materialize-css';
// import { MaterializeAction } from 'angular2-materialize';
import { BasePage } from '../../base-page/base-page';
import { ModalController } from '@ionic/angular';
import { JobFilterComponent } from './job-filter/job-filter.component';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.scss'],
})
export class DriverDashboardComponent
  extends BasePage
  implements OnInit, AfterViewInit
{
  // filterCarType = [
  //                 {name: 'SUV', isSelected : true},
  //                 {name: 'Sedan', isSelected : false},
  //                 {name: 'Truck', isSelected : false}
  //               ];
  // filterDistance = 5;
  filterActive = false;
  jobsList = [
    //   {
    //   id: '1',
    //   userName: 'Matthew Parry',
    //   amount: '30',
    //   sourceAddress: '1100, Hidden Ridge, Irving',
    //   destinationAddress: '8801, Rodeo Dr, Irving',
    // }
  ];
  currLat;
  currLng;
  filterModalEle;
  modalActions = new EventEmitter<string>(); // | MaterializeAction
  constructor(
    injector: Injector,
    private route: Router,
    private driverApiService: DriverApiService,
    public modalController: ModalController
  ) {
    super(injector);
    this.getDriversData();
    this.events.subscribe('driverUpdated', this.receiveUpdatedData.bind(this));
  }

  receiveUpdatedData() {
    // setTimeout(() => {
    //   this.getDriversData();
    // }, 5000);
    this.getDriversData();
  }

  ngOnInit() {}

  getDriversData() {
    this.getCurrentPosition()
      .then((res) => {
        console.log('current position', res);

        //console.clear();
        //console.log('getCurrentPosition ' + res);
        //return;
        // Get user posted job list
        this.driverApiService
          // .getJobList({ latitude: this.currLat, longitude: this.currLng })
          .getJobList({ latitude: '22.2629975', longitude: '70.7862588' })
          .then((res: any) => {
            console.log('res', res);
            //console.log('currLng' + this.currLng);
            console.log('result', res);
            this.jobsList = [];
            //return;
            res.jobs.forEach((element) => {
              this.jobsList.push({
                id: element.id,
                poster_name: element.poster_name,
                amount: element.job_price,
                sourceAddress: element.job_address,
                destinationAddress: element.delivery_address,
                rating: element.rating,
                poster_profile_pic: element.poster_profile_pic,
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log('Geolocation is not supported', err);
      });
  }

  openFilter() {
    this.openModal();
    this.filterActive = true;
  }

  // open modal
  async openModal() {
    this.filterActive = true;
    const modal = await this.modalController.create({
      component: JobFilterComponent,
      cssClass: 'decrease-modal-height',
    });
    const data = await modal.present();
    modal.onDidDismiss().then((data) => {
      this.filterActive = false;
    });
    // // this.modalActions.emit({action: 'modal', params: ['open']});
  }

  // close modal
  closeModal() {
    // // this.modalActions.emit({action: 'modal', params: ['close']});
    // const res = this.utility.s
    this.filterActive = false;
  }

  goToJobDetail(jobs) {
    this.route.navigate(['driver/applyToJob', { jobId: jobs.id }]);
  }

  goToMyJob() {
    this.route.navigate(['driver/jobList']);
  }

  getCurrentPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      // setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          this.currLat = resp.coords.latitude;
          this.currLng = resp.coords.longitude;
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
      // }, 1000);
    });
  }

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

  ngAfterViewInit() {
    // alert('hello');
  }
}
