import { Component, OnInit } from '@angular/core';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
import { errorMessages } from 'src/app/helpers/error_messages';

@Component({
  selector: 'app-consumer-notification',
  templateUrl: './consumer-notification.component.html',
  styleUrls: ['./consumer-notification.component.scss']
})
export class ConsumerNotificationComponent implements OnInit {

  notifications = [{id: 1, 'title' : 'Notification Title', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
  {id: 2, 'title' : 'Notification Title', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
  {id: 3, 'title' : 'Notification Title', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
  {id: 4, 'title' : 'Notification Title', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
  ];
  notifyStatus;

  constructor(private consumerService: ConsumerApiService) { }

  ngOnInit() {
    //Get notifications
    this.getNotifyStatus();
  }

  getNotifyStatus() {
    this.consumerService.getNotifyStatus().then((res:any)=> {
     this.notifyStatus = res.notify;
    }).catch(err => {
      console.log(errorMessages.ERROR_NOTIFICATION);
    })
  }

  deleteNotification(index){
    this.notifications.splice(index,1);
  }

  changeNotifyParam(){
    this.consumerService.updateNotifyStatus(this.notifyStatus).then((res:any)=> {
      console.log(res);
     }).catch(err => {
       console.log(errorMessages.ERROR_NOTIFICATION);
     })
  }

}
