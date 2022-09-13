import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { EventsService } from 'src/app/services/_helpers/events.service';
import { UtilityService } from 'src/app/services/_helpers/utility.service';
const map_styles = require('./map.styles.json');
declare var google;

@Component({
  selector: 'app-track-map',
  templateUrl: './track-map.component.html',
  styleUrls: ['./track-map.component.scss'],
})
export class TrackMapComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;

  data: any;
  placeMarker: any;
  driverMarker: any;
  timer: any;

  pathCoordinates = [];
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
  });

  // @Input()
  // public get data() {
  //   return this._data;
  // }

  // public set data(value: any) {
  //   this._data = value;

  //   clearInterval(this.timer);

  //   if (value) {
  //     this.updateMapTargets(value);
  //   }

  //   //
  // }

  @Output('output') output: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public platform: Platform,
    public utility: UtilityService,
    public events: EventsService
  ) {
    this.initialize();
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  async initialize() {
    await this.platform.ready();

    var self = this;
    this.initializeMapBeforeSetCoordinates();

    this.events.subscribe('update_data', (obj) => {
      self.data = obj;
      this.updateMapTargets(obj);
    });

    this.events.subscribe('update_map_behaviour', (obj) => {
      console.log(obj, self.data);

      const key = obj.key;
      switch (key) {
        case 'start_journey_to_origin':
          self.data.status = key;
          self.playDrivingsGame();
          break;
        case 'arrived_at_pickup':
          break;
        case 'start_journey_to_destination':
          break;
      }
    });
  }

  initializeMapBeforeSetCoordinates() {
    return new Promise(async (resolve) => {
      const res = (await this.utility.getCurrentLocationCoordinates()) as any;
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 13,
        center: res.coords,
        clickableIcons: false,
        disableDefaultUI: true,
        styles: map_styles,
      });
      resolve(true);
    });
  }

  updateMapTargets(value) {
    console.log('set again', value);
    this.data = value;

    // var centerLat = parseFloat(value.coords.lat).toFixed(0);
    // var centerLng = parseFloat(value.coords.lng).toFixed(0);
    // this.map.setCenter({
    //   lat: Number(centerLat),
    //   lng: Number(centerLng),
    // });

    // first set two different pin locations to map and update their marker images
    const image = {
      path: 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805',
      scale: 0.4,
      fillColor: '#427af4', //<-- Car Color, you can change it
      fillOpacity: 1,
      strokeWeight: 1,
      anchor: new google.maps.Point(0, 5),
      rotation: 30, //<-- Car angle
    };

    this.placeMarker = new google.maps.Marker({
      position: new google.maps.LatLng(
        parseFloat(value.target_lat),
        parseFloat(value.target_lng)
      ),
      map: this.map,
      icon: null,
      draggable: false,
      title: 'Destination',
    });

    this.driverMarker = new google.maps.Marker({
      position: new google.maps.LatLng(
        parseFloat(value.driver_lat),
        parseFloat(value.driver_lng)
      ),
      map: this.map,
      icon: image,
      draggable: false,
      title: 'Car',
    });

    // const lastPosn = {};
    // var heading = new google.maps.geometry.spherical.computeHeading(
    //   this.placeMarker.position,
    //   this.driverMarker.position
    // );
    // this.driverMarker.icon.rotation = heading;

    // this.placeMarker.setMap(this.map);
    // this.driverMarker.setMap(this.map);

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(this.placeMarker.position);
    bounds.extend(this.driverMarker.position);
    this.map.fitBounds(bounds);

    this.setRouteLines();
  }

  setRouteLines() {
    const destination = new google.maps.LatLng(this.placeMarker.position);
    const mylocation = new google.maps.LatLng(this.driverMarker.position);

    const request = {
      origin: mylocation,
      destination: destination,
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(Date.now() + 2000), // for the time N milliseconds from now.
        trafficModel: 'bestguess',
      },

      // drivingOptions: DrivingOptions,
      // unitSystem: UnitSystem,
      // waypoints[]: DirectionsWaypoint,
      // optimizeWaypoints: Boolean,
      // provideRouteAlternatives: Boolean,
      // avoidFerries: Boolean,
      // avoidHighways: Boolean,
      // avoidTolls: Boolean,
      // region: String
    };

    this.directionsDisplay.setMap(this.map);
    this.directionsService.route(request, (result, status) => {
      // console.log(status);
      if (status == 'OK') {
        console.log(result);
        this.directionsDisplay.setDirections(result);

        if (result.routes.length > 0) {
          const rts = result.routes[0].overview_path;

          console.log(rts);

          const owrPath = rts.map((item) => {
            var obj = {
              lat: item.lat(),
              lng: item.lng(),
            };
            return obj;
          });

          console.log(owrPath);
          this.pathCoordinates = owrPath;

          // this.playDrivingsGame();
        }
      }
    });
  }

  playDrivingsGame() {
    var self = this;
    var counter = 0;
    this.timer = setInterval(() => {
      console.log(this.pathCoordinates[counter]);

      var latlng = new google.maps.LatLng(
        this.pathCoordinates[counter]['lat'],
        this.pathCoordinates[counter]['lng']
      );
      this.driverMarker.setPosition(latlng);

      if (counter == this.pathCoordinates.length - 1) {
        clearInterval(this.timer);
        counter = 0;

        if (this.data.status == 'start_journey_to_origin') {
          this.data.status = 'arrived_at_pickup';
          const obj = {
            lat: this.pathCoordinates[counter]['lat'],
            lng: this.pathCoordinates[counter]['lng'],
            status: this.data.status,
          };
          this.output.emit({ key: 'driverReachedToPickup', value: obj });
        }

        if (this.data.status == 'arrived_at_pickup') {
        }
      } else {
        counter = counter + 1;
        const obj = {
          lat: this.pathCoordinates[counter]['lat'],
          lng: this.pathCoordinates[counter]['lng'],
          status: this.data.status,
        };
        this.output.emit({ key: 'driverLocationUpdate', value: obj });
      }
    }, 1000);
  }
}
