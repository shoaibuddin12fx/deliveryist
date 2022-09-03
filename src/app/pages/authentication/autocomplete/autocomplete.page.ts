import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Injector,
} from '@angular/core';
import { UtilityService } from 'src/app/services/_helpers/utility.service';
import { BasePage } from '../../base-page/base-page';
import { Location } from '@angular/common';
import { ProductmapService } from '../../market-place/services/productmap.service';
import { FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/_helpers/modal.service';

declare var google;

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.page.html',
  styleUrls: ['./autocomplete.page.scss'],
})
export class AutocompletePage extends BasePage implements OnInit {
  /**  ----------------------- Variable Declerations --------------------------- */
  signupForm: FormGroup;

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
  GoogleAutocomplete;
  lstAdd: any = [];
  lstPlaces = [];

  /**  ----------------------- Constructor --------------------------- */

  constructor(
    private injector: Injector,
    public utility: UtilityService,
    public productmapService: ProductmapService,
    public location: Location,
    public modals: ModalService
  ) {
    super(injector);
    this.map = google.maps.Map;
  }

  ionViewDidEnter() {
    this.setSearchBox();
  }

  /**  ----------------------- LifeCycle Hooks --------------------------- */

  ngOnInit() {
    // this.initialize();
  }

  /**  ----------------------- Function Declerations --------------------------- */
  // async initialize() {
  //   await this.getCurrentLocation();
  //   this.initializeMap();
  // }

  /**  ------- Getting Current Location -------- */

  // getCurrentLocation() {
  //   const geocoder = new google.maps.Geocoder();
  //   const latlng = { lat: this.currLat, lng: this.currLng };
  //   const that = this;
  //   geocoder.geocode({ location: latlng }, (results, status) => {
  //     console.log(status);
  //     if (results[0]) {
  //       that.currentLocation =
  //         results[results.length - 1].address_components[0].short_name;
  //       localStorage.setItem('countryCode', that.currentLocation);
  //       console.log(that.currentLocation);
  //     } else {
  //       console.log('No results found');
  //     }
  //   });
  // }

  /**  ------- Initializing Map For Display -------- */

  async initializeMap() {
    const coordinates = new google.maps.LatLng(
      //  this.productmapService.productLat,
      //  this.productmapService.productLng
      24.9180271,
      67.0970916
    );
    const self = this;
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: coordinates,
    });
    console.log('MAP', this.map);

    // return;

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

  // setSearchBox() {
  //   const self = this;
  //   const searchInput = this.searchbar.nativeElement;
  //   const searchBox = new google.maps.places.SearchBox(searchInput);
  //   let markers = [];

  //   searchBox.addListener('places_changed', function () {
  //     const places = searchBox.getPlaces();
  //     if (places.length == 0) {
  //       return;
  //     }

  //     self.marker.setMap(null);
  //     markers = [];

  //     // For each place, get the icon, name and location.
  //     const bounds = new google.maps.LatLngBounds();
  //     places.forEach(function (place) {
  //       if (!place.geometry) {
  //         console.log('Returned place contains no geometry');
  //         return;
  //       }

  //       self.marker = new google.maps.Marker({
  //         position: place.geometry.location,
  //         map: self.map,
  //         draggable: true,
  //         title: 'Destination',
  //       });
  //       const coords = {
  //         lat: place.geometry.location.lat(),
  //         lng: place.geometry.location.lng(),
  //       };
  //       console.log(coords);
  //       self.productmapService.setLatlng(coords);

  //       google.maps.event.addListener(self.marker, 'dragend', function (event) {
  //         const lt = event.latLng.lat();
  //         const lg = event.latLng.lng();
  //         const coords = { lat: lt, lng: lg };
  //         console.log(coords);
  //         self.productmapService.setLatlng(coords);
  //       });

  //       if (place.geometry.viewport) {
  //         // Only geocodes have viewport.
  //         bounds.union(place.geometry.viewport);

  //         // self.getGeoAddress(place.geometry.viewport);
  //       } else {
  //         bounds.extend(place.geometry.location);
  //       }
  //     });
  //     self.map.fitBounds(bounds);
  //   });
  // }
  goBack() {
    this.location.back();
  }
  async setLocation() {
    this.location.back();
  }

  searchChange($event) {
    let v = $event.target.value;
    console.log(v);

    let vItems = [];

    if (v == '') {
      vItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: v },
      (predictions, status) => {
        vItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            vItems.push(prediction);
          });
          this.lstPlaces = vItems;

          console.log('Shayan', this.lstPlaces);

          // this.signupForm.controls['contact'].patchValue(this.lstPlaces);
        });
      }
    );
  }
  setSearchBox() {
    const self = this;
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }

  sendAddress(data: any) {
    this.modals.dismiss(data);
  }

  goToAddress() {
    this.modals.dismiss();
  }
}
