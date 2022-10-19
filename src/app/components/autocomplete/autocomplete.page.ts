import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Injector,
} from '@angular/core';
import { UtilityService } from 'src/app/services/_helpers/utility.service';
import { BasePage } from '../../pages/base-page/base-page';
import { Location } from '@angular/common';
import { ProductmapService } from '../../pages/market-place/services/productmap.service';
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
  // @ViewChild('map', { static: false }) mapElement: ElementRef;
  // @ViewChild('searchbox', { read: ElementRef, static: false })
  // private searchbar: ElementRef;
  googleAutocomplete;
  lstAdd: any = [];
  lstPlaces = [];

  loadingIndex = -5;

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

  goBack() {
    this.modals.dismiss({ data: 'A' });
  }

  searchChange($event) {
    let v = $event.target.value;
    console.log(v);

    let vItems = [];

    if (v == '') {
      vItems = [];
      return;
    }
    this.googleAutocomplete.getPlacePredictions(
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

  async getCoordsOfItem(item, index) {
    const placeId = item.place_id;
    console.log(placeId);

    if (placeId === '' || placeId === null) {
      return;
    }

    this.loadingIndex = index;
    const res = await this.utility.getCoordsForPlaceId(placeId);
    console.log(res);
    this.loadingIndex = -5;

    this.modals.dismiss({ coords: res, address: item.description });
  }

  setSearchBox() {
    const self = this;
    this.googleAutocomplete = new google.maps.places.AutocompleteService();
  }

  async getCurrentLocation() {
    this.loadingIndex = -2;
    const res =
      await this.geoLocation.getCurrentLocationCoordinatesWithAddress();
    this.loadingIndex = -5;
    console.log(res);

    this.modals.dismiss(res);
  }
}
