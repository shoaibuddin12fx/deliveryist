import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Injector,
} from '@angular/core';
import { UtilityService } from 'src/app/services/_helpers/utility.service';
import { BasePage } from '../../base-page/base-page';
import { Location } from '@angular/common';
import { ProductmapService } from '../services/productmap.service';

declare var google;

@Component({
  selector: 'app-product-location',
  templateUrl: './product-location.component.html',
  styleUrls: ['./product-location.component.scss'],
})
export class ProductLocationComponent extends BasePage implements OnInit {
  /**  ----------------------- Variable Declerations --------------------------- */

  radial_distance = 50;
  marker: any;
  map;
  currLat: any;
  currLng: any;
  currentLocation: any;
  address: any;
  circle: any;
  initcircle: any;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild('searchbox', { read: ElementRef, static: false })
  private searchbar: ElementRef;

  /**  ----------------------- Constructor --------------------------- */

  constructor(
    private injector: Injector,
    public utility: UtilityService,
    public productmapService: ProductmapService,
    public location: Location
  ) {
    super(injector);
    this.map = google.maps.Map;
  }

  /**  ----------------------- LifeCycle Hooks --------------------------- */

  ngOnInit() {
    this.initialize();
  }

  /**  ----------------------- Function Declerations --------------------------- */
  async initialize() {
    await this.getCurrentLocation();
    this.initializeMap();
  }

  /**  ------- Getting Current Location -------- */

  getCurrentLocation() {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: this.currLat, lng: this.currLng };
    const that = this;
    geocoder.geocode({ location: latlng }, (results, status) => {
      console.log(status);
      if (results[0]) {
        that.currentLocation =
          results[results.length - 1].address_components[0].short_name;
        localStorage.setItem('countryCode', that.currentLocation);
        console.log(that.currentLocation);
      } else {
        console.log('No results found');
      }
    });
  }

  /**  ------- Initializing Map For Display -------- */

  async initializeMap() {
    const coordinates = new google.maps.LatLng(
      this.productmapService.productLat,
      this.productmapService.productLng
    );
    const self = this;

    this.marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
      draggable: true,
      title: 'Location',
    });

    google.maps.event.addListener(
      this.marker,
      'dragend',
      async function (event) {
        const lt = event.latLng.lat();
        const lg = event.latLng.lng();
        const coords = { lat: lt, lng: lg };

        console.log(coords);
        self.productmapService.setLatlng(coords);
      }
    );

    this.setSearchBox();

    const mapProperties = {
      center: coordinates,
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
      },
      scaleControl: false,
      overviewMapControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );
    this.marker.setMap(this.map);
  }

  /**  ------- Initializing Search Box -------- */

  setSearchBox() {
    const self = this;
    const searchInput = this.searchbar.nativeElement;
    const searchBox = new google.maps.places.SearchBox(searchInput);
    let markers = [];

    searchBox.addListener('places_changed', function () {
      const places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

      self.marker.setMap(null);
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry) {
          console.log('Returned place contains no geometry');
          return;
        }

        self.marker = new google.maps.Marker({
          position: place.geometry.location,
          map: self.map,
          draggable: true,
          title: 'Destination',
        });
        const coords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        console.log(coords);
        self.productmapService.setLatlng(coords);

        google.maps.event.addListener(self.marker, 'dragend', function (event) {
          const lt = event.latLng.lat();
          const lg = event.latLng.lng();
          const coords = { lat: lt, lng: lg };
          console.log(coords);
          self.productmapService.setLatlng(coords);
        });

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);

          // self.getGeoAddress(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      self.map.fitBounds(bounds);
    });
  }
  goBack() {
    this.location.back();
  }
  async setLocation() {
    this.location.back();
  }
}
