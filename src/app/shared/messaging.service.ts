import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import { CommonServicesService } from '../services/common-services.service';
import { EventsService } from '../services/_helpers/events.service';
declare var Pushy;
@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(
    private commonApiService: CommonServicesService, public events : EventsService) {
      // this.angularFireMessaging.messages.subscribe(
      //   (_messaging: AngularFireMessaging) => {
      //     _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      //     _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      //   }
      // )
  }

  requestPermission() {
    // this.angularFireMessaging.requestToken.subscribe(
    //   (token) => {
    //     console.log(token);
    //     localStorage.setItem('DeviceToken', token);
    //   },
    //   (err) => {
    //     console.error('Unable to get permission to notify.', err);
    //   }
    // );
  }
  receiveMessage() {
    // this.angularFireMessaging.messages.subscribe(
    //   (payload) => {
    //     console.log("new message received. ", payload);
    //     this.currentMessage.next(payload);
    //     this.events.publish("receivePush", payload)
    //   })
  }








  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
  // updateToken(userId, token) {
  //   // we can change this function to request our backend service
  //   this.angularFireAuth.authState.pipe(take(1)).subscribe(
  //     () => {
  //       const data = {};
  //       data[userId] = token
  //       this.angularFireDB.object('fcmTokens/').update(data)
  //     })
  // }

  //   requestPermission() {
  //     this.angularFireMessaging.requestToken.subscribe(
  //       (token) => {
  //         console.log("token from firebase",token);
  //         this.commonApiService.getDeviceToken({device_token: token}).then(res => {
  //           localStorage.removeItem('DeviceToken');
  //           localStorage.setItem('DeviceToken', token);
  //         }).catch(err => {
  //           console.log(err);
  //           this.requestPermission();
  //         })
  //       },
  //       (err) => {
  //         console.error('Unable to get permission to notify.', err);
  //       }
  //     );
  //   }

  // //   /**
  // //    * hook method when new notification received in foreground
  // //    */
  //   receiveMessage() {
  //     this.angularFireMessaging.messages.subscribe(
  //       (payload) => {
  //       console.log("new message received. ", payload);
  //       this.currentMessage.next(payload);
  //     })
  //   }


  //Register device for push notifications
  // requestPermission() {

  //   return new Promise( resolve => {
  //     Pushy.register({ appId: '5ee1c915fc2bc49f6b783197' }).then((deviceToken) => {
  //       // Print device token to console
  //       console.log('Pushy device token: ' + deviceToken);

  //       this.commonApiService.getDeviceToken({device_token: deviceToken}).then(res => {
  //         localStorage.removeItem('DeviceToken');
  //         localStorage.setItem('DeviceToken', deviceToken);
  //         resolve(true);
  //       }).catch(err => {
  //         console.log(err);
  //         // this.requestPermission();
  //         resolve(false);
  //       })

  //       // Succeeded, optionally do something to alert the user
  //     }).catch(function (err) {
  //       // Handle registration errors
  //       console.error(err);
  //       resolve(false);
  //     });
  //   })



  // }


  //FCM
  // currentMessage = new BehaviorSubject(null);
  // constructor(private angularFireMessaging: AngularFireMessaging, private commonApiService: CommonServicesService) {
  // this.angularFireMessaging.messaging.subscribe(
  // (_messaging) => {
  // _messaging.onMessage = _messaging.onMessage.bind(_messaging);
  // _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
  // }
  // )
  // }
  // requestPermission() {
  //   this.angularFireMessaging.requestToken.subscribe(
  //           (token) => {
  //             console.log("token from firebase",token);
  //             this.commonApiService.getDeviceToken({device_token: token}).then(res => {
  //               localStorage.removeItem('DeviceToken');
  //               localStorage.setItem('DeviceToken', token);
  //             }).catch(err => {
  //               console.log(err);
  //               // this.requestPermission();
  //             })
  //           },
  //           (err) => {
  //             console.error('Unable to get permission to notify.', err);
  //           }
  //         );
  // }
  // receiveMessage() {
  //   return new Promise((resolve, reject) => {
  //     this.angularFireMessaging.messages.subscribe(
  //       (payload:any) => {
  //       console.log("new message received. ", payload);
  //       resolve(payload);
  //       // this.currentMessage.next(payload);
  //       })
  //   })

  // }
}
