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
  _data;
  routeSet = false;
  @Input() set data(value) {
    if (value && value != this._data) {
      console.log('Received event');

      this.updateMapTargets(value);
      this._data = value;
    }
  }

  get data() {
    return this._data;
  }
  placeMarker: any;
  driverMarker: any;
  timer: any;

  pathCoordinates = [];
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
  });

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
  }

  initializeMapBeforeSetCoordinates() {
    return new Promise(async (resolve) => {
      const res = (await this.utility.getCurrentLocationCoordinates()) as any;
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 14,
        center: res.coords,
        clickableIcons: false,
        disableDefaultUI: true,
        styles: map_styles,
      });
      resolve(true);
    });
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
    this.routeSet = true;
  }

  updateMapTargets(value) {
    console.log('set again', value);

    if (this.placeMarker) {
      this.placeMarker.setMap(null);
    }

    if (this.driverMarker) {
      this.driverMarker.setMap(null);
    }
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
        parseFloat(value.delivery_latitude ?? value.target_lat),
        parseFloat(value.delivery_longitude ?? value.target_lng)
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
    console.log('Done');
    if (!this.routeSet) this.setRouteLines();
  }
}
