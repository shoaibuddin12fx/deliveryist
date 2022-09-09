import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DriverApiService } from 'src/app/services/driver-api.service';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss'],
})
export class JobFilterComponent implements OnInit {

  jobsList = [];
  filterCarType = [
    {name: 'SUV', isSelected : true},
    {name: 'Sedan', isSelected : false},
    {name: 'Truck', isSelected : false}
  ];
  filterDistance = 5;

  currLat;
  currLng;
  filterModalEle;
  constructor(public modal:ModalController, private driverApiService: DriverApiService) { 

    this.getCurrentPosition().then((res) => {
      // Get user posted job list
      this.driverApiService.getJobList({latitude: this.currLat, longitude: this.currLng }).then((res: any) => {
        console.log(res);
        res.jobs.forEach(element => {
          this.jobsList.push({
            id: element.id,
            poster_name: element.poster_name,
            amount: element.job_price,
            sourceAddress: element.job_address,
            destinationAddress: element.delivery_address,
            rating: element.rating,
            poster_profile_pic: element.poster_profile_pic
          });
        });
      }).catch(err => { console.log(err); });
    }).catch(err => {
      console.log('Geolocation is not supported', err);
    });
  }

  
  ngOnInit() {}


  dismiss(){
    this.modal.dismiss();
  }


  changeFilterCarType(event, type) {
    console.log(type);
    this.filterCarType.forEach(ele => {
      if (ele.name === type) {
        (event.target.checked === true) ? ele.isSelected = true : ele.isSelected = false;
      }
    });
  }

  filterData() {
    const data = {
      vehicle_type: [],
      distance: this.filterDistance,
      longitude:this.currLng,
      latitude:this.currLat
    };

    console.log(data);
    this.filterCarType.forEach(e => (e.isSelected) ? data.vehicle_type.push(e.name) : null);
    this.driverApiService.filterJobs(data).then((data: any) => {
      console.log(data);
      this.jobsList = [];
      data.jobs.forEach(element => {
        this.jobsList.push({
          id: element.id, title: element.description, jobLabel: element.priority, amount: element.job_price, sourceAddress: element.job_address , destinationAddress: element.delivery_address
        })
      });
      console.log(this.jobsList);
    }).catch(err => {
      console.log(err);
    });
    this.dismiss();
  }


  getCurrentPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      // setInterval(() => {
        navigator.geolocation.getCurrentPosition((resp) => {
          this.currLat = resp.coords.latitude;
          this.currLng = resp.coords.longitude;
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
      // }, 1000);
    });
  }

  
}
