import {
  Component,
  OnInit,
  EventEmitter,
  AfterViewInit,
  Injector,
} from '@angular/core';
// import { MaterializeAction } from 'angular2-materialize';
import { Router, ActivatedRoute } from '@angular/router';
// import M from "materialize-css/dist/js/materialize.min.js";
import { CartService } from '../../market-place/services/cart.service';
import { NetworkService } from 'src/app/services/_helpers/network.service';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent extends BasePage implements OnInit {
  modalActions = new EventEmitter<string>(); // |MaterializeAction
  orderSummary: any;
  details;
  deliveryDetails = {
    delivery_Address: '',
    pickUp_Address: '',
    package_Category: '',
    delivery_Type: '',
    vehicle_Type: '',
  };
  categories;
  filteredCategory;
  pickup_Address;
  constructor(public injector: Injector, private cartService: CartService) {
    super(injector);

    this.activatedRoute.params.subscribe((data) => {
      this.orderSummary = data;

      console.log('data', this.orderSummary);
      this.setPackageDetails(this.orderSummary);
    });
  }

  ngOnInit() {}

  setPackageDetails(detail) {
    console.log('detail', detail);
    this.deliveryDetails.delivery_Address = detail.delivery;
    console.log('llllll', this.deliveryDetails);

    this.deliveryDetails.package_Category = detail.packageCategory
      ? detail.packageCategory
      : this.cartService.cart.items[0]?.category_name;
    this.deliveryDetails.vehicle_Type = detail.vehicleType;

    if (!detail.pickup) {
      const latLong = {
        lat: this.cartService.details?.job_latitude,
        lng: this.cartService.details?.job_longitude,
      };
      this.cartService.mapService.getGeoAddress(latLong).then((data) => {
        this.pickup_Address = data;
      });
    }
  }
}
