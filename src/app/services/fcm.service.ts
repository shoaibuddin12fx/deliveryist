import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { DataService } from './data.service';
import { DriverApiService } from './driver-api.service';
import { AlertsService } from './_helpers/alerts.service';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor(
    public http: HttpClient,
    private alert: AlertsService,
    public router: Router,
    private driverApiService: DriverApiService,
    private data: DataService
  ) {}
  pushData = {
    collapse_key: 'type_a',
    contentAvailable: true,
    priority: 'high',
    data: {
      body: 'Test Notification Killed ',
      title: 'Hello World',
      referenceId: '4',
      NotificationId: '5',
    },
    notification: {
      body: 'Test Notification Killed ',
      title: 'Hello World',
      referenceId: '4',
      NotificationId: '5',
    },
  };

  init() {
    console.log('Performing FcmService init()');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        alert('FCM Permission not granted');
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
      localStorage.setItem('fcm_token', token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        this.alert.showAlert(notification.body, notification.title);
        //alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (action: ActionPerformed) => {
        //  alert('Push action performed: ' + JSON.stringify(notification));
        console.log('pushNotificationActionPerformed', JSON.stringify(action));
        this.handleNotificationTapped(
          action.notification.data['notificationType'],
          action.notification.data['_id']
        );
      }
    );
  }

  async handleNotificationTapped(type, id) {
    console.log('handleNotificationTapped', { type, id });

    switch (type) {
      case 'job_location':
        const job = (await this.driverApiService.getJobDetail(id)) as any;
        this.data.job_data = job;
        this.navigateTo('pages/track-driver');
        break;
    }
  }

  navigateTo(link, data?: NavigationExtras) {
    console.log(link);
    this.router.navigate([link], data);
  }

  sendPushNotification(to, title, body) {
    console.log('sendPushNotification data');
    var res = this.http.post(
      'https://fcm.googleapis.com/fcm/send',
      {
        ...this.pushData,
        to,
        data: { ...this.pushData.data, title, body },
        notification: { ...this.pushData.data, title, body },
      },
      {
        headers: {
          Authorization:
            'key=AAAAdeFsNRE:APA91bF1Z3NyFd7AKzayC1R9Je6JV6SW099zgX-r2wUoxev4xQf2llHdf7gYu1DwdtRvzqcMNBPL85v7qLLY2KG0mFXnHDL5MMFb5PDbhgndLz0435esnux5l3ITeIHEU_NWHFCPkPp5',
          'Content-Type': 'application/json',
        },
      }
    );
    res.subscribe((response) => {
      console.log('sendPushNotification response', response);
    });
  }
}
