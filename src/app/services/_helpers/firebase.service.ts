import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { NetworkService } from './network.service';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public events: EventsService, public network: NetworkService) {}

  // setupFMC() {

  //   this.fcm.subscribeToTopic('all');
  //   this.fcm.onNotification().subscribe(data => {
  //     if (!data.wasTapped) {
  //       this.audio.play("");
  //       if (data['showalert'] != null) {
  //         this.events.publish('user:shownotificationalert', data);
  //       } else {
  //         this.events.publish('user:shownotification', data);
  //       }
  //     };
  //   })
  //   this.fcm.onTokenRefresh().subscribe(token => {
  //     this.sqlite.setFcmToken(token);
  //     this.events.publish('user:settokentoserver');
  //   });

  // }

  setupFMC() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      // alert('Push registration success, token: ' + token.value);
      localStorage.setItem('fcm_token', token.value);
      this.events.publish('user:settokentoserver');
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // alert('Push received: ' + JSON.stringify(notification));
        this.events.publish('dashboard:notificationReceived');
        this.events.publish('dashboard:refreshpage');
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
        this.events.publish('dashboard:refreshpage');
      }
    );
  }

  async getFCMToken() {
    return new Promise((resolve) => {
      PushNotifications.register();
      resolve(true);
      // this.fcm.getToken().then(v => resolve(v), (err) =>
      // { console.log(err); resolve(null) }).catch(v => { console.log(v); resolve(null) })
    });
  }
}
