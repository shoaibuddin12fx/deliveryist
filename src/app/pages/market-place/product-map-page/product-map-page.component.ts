import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector } from '@angular/core';
import { UtilityService } from 'src/app/services/_helpers/utility.service';
import { MapService } from '../services/map.service';
import { BasePage } from '../../base-page/base-page';
import { Location } from '@angular/common';
// import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

declare var google;

@Component({
  selector: 'app-product-map-page',
  templateUrl: './product-map-page.component.html',
  styleUrls: ['./product-map-page.component.scss']
})
export class ProductMapPageComponent extends BasePage implements OnInit, AfterViewInit {
  /**  ----------------------- Variable Declerations --------------------------- */


  marker: any;
  map;

  // currentLocation: any;
  circle: any;
  initcircle: any;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild('searchbox', { read: ElementRef, static: false }) private searchbar: ElementRef;

  /**  ----------------------- Constructor --------------------------- */

  constructor(
    private injector: Injector,
    public utility: UtilityService,
    public mapService: MapService,
    public location: Location,
    // public events: NgxPubSubService
  ) {
    super(injector);
    this.map = google.maps.Map;
  }

  /**  ----------------------- LifeCycle Hooks --------------------------- */

  ngOnInit() {
    console.log('CONSOLE LOG FOR RADIAL DISTANCE', this.mapService.radial_distance);
    this.initialize();
  }

  ngAfterViewInit() { }

  /**  ----------------------- Function Declerations --------------------------- */
  async initialize() {
    await this.getCurrentLocation();
    this.initializeMap();
  }

  /**  ------- Getting Current Location -------- */

  getCurrentLocation() {

    return new Promise( async resolve => {

      if(!this.mapService.currLat || !this.mapService.currLng){
        await this.mapService.initialize();
      }

      this.backupValues();


      resolve(true);

    })

  }

  backupValues(){
    // backup values start
    localStorage.setItem( 'radial_distance', this.mapService.radial_distance.toString() ) ;
    localStorage.setItem( 'currLat', this.mapService.currLat );
    localStorage.setItem( 'currLng', this.mapService.currLng );
    localStorage.setItem( 'address', this.mapService.address );
    // backup values end
  }

  /**  ------- Initializing Map For Display -------- */

  setRadialDistance(event) {
    this.mapService.radial_distance = event.target.value;
    console.log(this.mapService.radial_distance);
    this.initcircle.setRadius(this.mapService.radial_distance * 1);
    this.map.setZoom(this.getZoomLevel(this.initcircle));

    this.mapService.getGeoAddress({ lng: this.mapService.currLng, lat: this.mapService.currLat })

  }

  initializeMap() {
    const coordinates = new google.maps.LatLng(this.mapService.currLat, this.mapService.currLng);
    const self = this;

    this.marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
      draggable: true,
      title: 'Location'
    });

    google.maps.event.addListener(this.marker, 'dragend', async function (event) {

      const lt = event.latLng.lat();
      const lg = event.latLng.lng();
      const coords = { lat: lt, lng: lg };
      self.initcircle.setCenter(coords);
      console.log(self.initcircle.radius);

      console.log(coords);
      self.mapService.setLatlng(coords);

    });

    this.setSearchBox();

    const mapProperties = {
      center: coordinates,
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      scaleControl: false,
      overviewMapControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.marker.setMap(this.map);
    this.initcircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      center: coordinates,
      radius: this.mapService.returnPiDistance(this.mapService.radial_distance),
    });

    this.map.setZoom(this.getZoomLevel(this.initcircle));

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
          title: 'Destination'
        });
        const coords = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        console.log(coords);
        self.initcircle.setCenter(coords);
        self.mapService.setLatlng(coords);

        google.maps.event.addListener(self.marker, 'dragend', function (event) {
          const lt = event.latLng.lat();
          const lg = event.latLng.lng();
          const coords = { lat: lt, lng: lg };
          console.log(coords);
          self.initcircle.setCenter(coords);
          self.mapService.setLatlng(coords);
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

  async setLocation() {

    let event = {
      target: {
        value: this.mapService.radial_distance
      }
    }
    this.setRadialDistance(event);
    this.backupValues()
    this.location.back();
  }

  setRadius(type){

    let v = this.mapService.radial_distance;
    if(type == '1'){
      v = 1609.34 * 10;
    }

    this.mapService.radial_distance = v;
    let event = {
      target: {
        value: v
      }
    }

    this.setRadialDistance(event);

  }



  getZoomLevel(circle ) {


    var zoomLevel = 11;
    if (circle != null) {
        let radius = circle.getRadius() + circle.getRadius() / 2;
        let scale: number = radius / 500;
        zoomLevel = 16 - Math.log(scale) / Math.log(2) ;
        zoomLevel = parseInt(zoomLevel.toString());
    }
    return zoomLevel;
  }

  backPress(){
    console.log("backpressed")
    // backup values start
    this.mapService.radial_distance = parseInt( localStorage.getItem( 'radial_distance') );
    this.mapService.currLat = localStorage.getItem( 'currLat');
    this.mapService.currLng = localStorage.getItem( 'currLng');
    this.mapService.address = localStorage.getItem( 'address');
    // backup values end
  }

}
