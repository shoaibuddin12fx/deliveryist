import {
  Component,
  OnInit,
  EventEmitter,
  AfterViewInit,
  Injector,
  Input,
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
  private _orderSummary: any;

  constructor(public injector: Injector, public cartService: CartService) {
    super(injector);
  }

  @Input()
  public get orderSummary(): any {
    return this._orderSummary;
  }

  public set orderSummary(value: any) {
    this._orderSummary = value;
    this.setPackageDetails(this.orderSummary);
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
