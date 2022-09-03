import { Component, OnInit } from '@angular/core';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { errorMessages } from 'src/app/helpers/error_messages';

@Component({
  selector: 'app-driver-notification',
  templateUrl: './driver-notification.component.html',
  styleUrls: ['./driver-notification.component.scss']
})
export class DriverNotificationComponent implements OnInit {

  notifications = [{id: 1, 'title' : 'Notification Title', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
  {id: 2, 'title' : 'Notification Title', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
  {id: 3, 'title' : 'Notification Title', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
  {id: 4, 'title' : 'Notification Title', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
  ];

  constructor(private driverApiService: DriverApiService) { }

  ngOnInit() {
    //Get notifications
    // this.driverApiService.getNotificationByDriverId().then( res=> {
    //   res =  this.notifications
    // }).catch(err => {
    //   console.log(errorMessages.ERROR_NOTIFICATION);
    // })
  }

  deleteNotification(index){
    this.notifications.splice(index,1);
  }

}
