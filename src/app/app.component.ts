import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
// import * as AOS from 'aos';
import { AuthService } from './services/authguards/auth.service';
import { UtilityService } from './services/_helpers/utility.service';
import { MessagingService } from './shared/messaging.service';
// import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css';
import { DriverApiService } from './services/driver-api.service';
import { EventsService } from './services/_helpers/events.service';
import { GeolocationsService } from './services/_helpers/geolocation.service';
// import { SplashScreen } from '@capacitor/splash-screen';
import { FirebaseService } from './services/_helpers/firebase.service';

// declare var google;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Deliveroo-PWA';
  currLat;
  currLng;
  currentLocation;
  message;
  successModalEle;
  jobId;

  constructor(
    private route: Router,
    public geolocation: GeolocationsService,
    private messagingService: MessagingService,
    public authService: AuthService,
    public utility: UtilityService,
    private driverApiService: DriverApiService,
    public events: EventsService,
    public firebaseService: FirebaseService
  ) {
    // this.isLoggedIn();
    // this.getCurrentPosition()
    //   .then(() => {
    //     this.getCurrentLocation();
    //   })
    //   .catch((err) => console.log('Geolocation is not supported', err));
    // updates.available.subscribe(event => {
    //   console.log('current version is', event.current);
    //   console.log('available version is', event.available);
    // });
    // updates.activated.subscribe(event => {
    //   console.log('old version was', event.previous);
    //   console.log('new version is', event.current);
    // });
    // updates.available.subscribe(event => {
    //   if ((event)) {
    //     updates.activateUpdate().then(() => document.location.reload());
    //   }
    // });
    // subscribes to firebase
    // firebaseService.getFCMToken();
    // this.events.subscribe('receivePush', this.receivePush.bind(this));
    // this.registerPush();
  }

  registerPush() {
    // this.messagingService.requestPermission();
    // this.messagingService.receiveMessage();
    // this.message = this.messagingService.currentMessage
  }

  // receivePush(data) {
  //   console.log(data);
  // }

  // async isLoggedIn() {
  //   // Go ahead if user already signIn
  //   // if(localStorage.getItem('currentUser')) {
  //   let flag = await this.authService.isAuthenticated();
  //   if (flag) {
  //     if (localStorage.getItem('introVisited') == 'true') {
  //       this.route.navigate(['auth/userRoleSelection']);
  //     }
  //     // else{
  //     //   this.route.navigate(['auth/introductionScreen']);
  //     // }
  //   } else {
  //     this.route.navigate(['auth/login']);
  //   }

  //   // }
  // }

  // goToUserRoleSelection(userData) {
  //   localStorage.setItem('currentUser', JSON.stringify(userData));
  //   this.route.navigate(['auth/userRoleSelection']);
  // }

  ngOnInit() {
    // FCM implementation
    // this.messagingService.requestPermission()
    // this.messagingService.receiveMessage().then((res:any) => {
    //   console.log('the msg is', res)
    //   this.message = res.notification;
    //   this.jobId = JSON.parse(res.data.job).job_id;
    //   this.openModel('msg')
    // });
    // AOS.init();
    // if ('serviceWorker' in navigator) {
    //   let self = this;
    //   // ensure service worker is ready
    //   navigator.serviceWorker
    //     .register('service-worker.js')
    //     .then(function (worker) {
    //       if (!worker) {
    //         return;
    //       }
    //       // PING to service worker, later we will use this ping to identifies our client.
    //       worker.active.postMessage('ping');
    //       worker.getNotifications().then((res) => {
    //         console.log('Got notification', res);
    //       });
    //       // listening for messages from service worker
    //       navigator.serviceWorker.addEventListener(
    //         'message',
    //         function (event: any) {
    //           console.log(event, event['data']['firebase-messaging-msg-data']);
    //           var message =
    //             event['data']['firebase-messaging-msg-data']['data'];
    //           // var messageBody = event.data.data.data.message || JSON.parse(event.data.data.data.message);
    //           // message.body = messageBody;
    //           // message.title = event.data.data.title;
    //           // console.log("msg", message);
    //           self.jobId =
    //             event['data']['firebase-messaging-msg-data']['data']['key_id']; //JSON.parse(message.body).job_id;
    //           console.log('job id', self.jobId);
    //           self.message = message;
    //           self.openModel('msg');
    //           // you can also send a stringified JSON and then do a JSON.parse() here.
    //         }
    //       );
    //     });
    // }
  }

  ngAfterViewInit() {
    // this.successModalEle = document.querySelectorAll('.modal');
    //   M.Modal.init(this.successModalEle, { dismissible: true });
  }

  // getCurrentLocation() {
  //   this.geolocation.getCurrentLocationCoordinates().then((v) => {
  //     let geocoder = new google.maps.Geocoder();
  //     this.currLat = v['lat'];
  //     this.currLng = v['lng'];
  //     let latlng = { lat: this.currLat, lng: this.currLng };
  //     let that = this;
  //     geocoder.geocode({ location: latlng }, (results, status) => {
  //       console.log(status);
  //       if (results[0]) {
  //         that.currentLocation =
  //           results[results.length - 1].address_components[0].short_name;
  //         localStorage.setItem('countryCode', that.currentLocation);
  //         localStorage.setItem('location', JSON.stringify(latlng));
  //         console.log(that.currentLocation);
  //       } else {
  //         console.log('No results found');
  //       }
  //     });
  //   });
  // }

  // getCurrentPosition(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(
  //       (resp) => {
  //         this.currLat = resp.coords.latitude;
  //         this.currLng = resp.coords.longitude;
  //         resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
  //         console.log(this.currLng);
  //         console.log(this.currLat);
  //       },
  //       (err) => {
  //         reject(err);
  //       }
  //     );
  //   });
  // }

  openModel(modal) {
    // var elems = document.getElementById(modal);
    // var instances = M.Modal.getInstance(elems);
    // instances.open();
  }
  closeModel(modal) {
    // var elems = document.getElementById(modal);
    // var instances = M.Modal.getInstance(elems);
    // instances.close();
  }

  // acceptJob() {
  //   this.driverApiService
  //     .applyToJob({
  //       job_id: this.jobId,
  //       bid_details: 'Hello, I can get this delivered. Contact me in chat',
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.closeModel('msg');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}
