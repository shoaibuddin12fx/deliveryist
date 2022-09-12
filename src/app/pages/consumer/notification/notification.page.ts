import { Component, Injector, OnInit } from '@angular/core';
import { errorMessages } from 'src/app/helpers/error_messages';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage extends BasePage implements OnInit {
  notifications = [
    {
      id: 1,
      title: 'Notification Title',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      id: 2,
      title: 'Notification Title',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      id: 3,
      title: 'Notification Title',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      id: 4,
      title: 'Notification Title',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
  ];
  notifyStatus;

  constructor(private consumerService: ConsumerApiService, injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    //Get notifications
    this.getNotifyStatus();
  }

  getNotifyStatus() {
    this.consumerService
      .getNotifyStatus()
      .then((res: any) => {
        this.notifyStatus = res.notify;
      })
      .catch((err) => {
        console.log(errorMessages.ERROR_NOTIFICATION);
      });
  }

  deleteNotification(index) {
    this.notifications.splice(index, 1);
  }

  changeNotifyParam() {
    this.consumerService
      .updateNotifyStatus(this.notifyStatus)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(errorMessages.ERROR_NOTIFICATION);
      });
  }
}
