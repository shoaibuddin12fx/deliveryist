import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { errorMessages } from 'src/app/helpers/error_messages';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  driverId;
  consumerId;
  userRole = localStorage.getItem('userRole');
  pageTitle = this.userRole == 'Consumer' ? 'Driver Profile' : 'Consumer Profile';
  driverProfileData:any  = {
      'firstName': 'John',
      'lastName': 'Doe',
      'stars': 4,
      'completedDeliveries': 35,
  };
  constructor(private router: Router, private driverService: DriverApiService, private activatedRoute: ActivatedRoute, private consumerApiService: ConsumerApiService) {
    this.activatedRoute.params.subscribe((data) => {
      data.driverId ? this.driverId = data.driverId : this.consumerId = data.poster_id;
      console.log(this.driverId)
    })
   }

  ngOnInit() {
    // get driver detail by Id
    if(this.userRole == 'Consumer') {
      this.driverService.driverProfileById({ deliverer_id: this.driverId }).then((res:any) => {
        this.driverProfileData = {
          firstName : res.first_name,
          lastName : res.last_name,
          stars: res.rating,
          completedDeliveries: res.total
        }
        this.colorStar();
      }).catch(err => errorMessages.ERROR_FETCHING_PROFILE);
    } else {
      this.consumerApiService.getConsumerProfileByDriver({ consumer_id: this.consumerId }).then((res:any) => {
        this.driverProfileData = {
          firstName : res.profile.first_name,
          lastName : res.profile.last_name,
          stars: res.rating || 0,
          completedDeliveries: res.total || 0
        }
        this.colorStar();
      }).catch(err => errorMessages.ERROR_FETCHING_PROFILE);
    } 
  }

  colorStar(){
    for(let i=1; i <= this.driverProfileData.stars ; i++){
      let ele = document.getElementById(`star${i}`);
      ele.classList.add('active');
    }
  }

}
