import { CartService } from './../services/cart.service';
import { Component, OnInit, Injector } from '@angular/core';
import { Cart } from '../model/cart.model';
import { BasePage } from '../../base-page/base-page';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MapService } from '../services/map.service';
import { NetworkService } from 'src/app/services/_helpers/network.service';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { ProductmapService } from '../services/productmap.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent extends BasePage implements OnInit {
  loading = false;
  public cart: Cart;
  public product: Product;
  deliveryCharges: any;

  total: any;
  aForm: FormGroup;
  deliveryOptions = ['Pick It Up Yourself', 'Have It Delivered'];
  paymentTypes = ['Paypal', 'Pay by Cash'];
  disableOption: any = true;
  showMap: any = true;
  order: any;
  constructor(
    injector: Injector,
    public cartService: CartService,
    public productService: ProductService,
    public formbuilder: FormBuilder,
    public mapService: ProductmapService,
    public network: NetworkService,
    private commonApiService: CommonServicesService
  ) {
    super(injector);
    this.cart = this.cartService.get();
    // console.log("ghere", this.cart);
    this.setupForm();

    if (this.cart.items.length == 0) {
      var self = this;
      setTimeout(() => {
        //     self.utility.showToast("No items in cart", 'error');
        self.location.back();
      }, 1000);
    }
  }

  async ngOnInit() {}

  onDecrementQuantity(item) {
    console.log(item.qty);
    item.qty--;
    if (item.qty < 1) {
      item.qty = 1;
    }
    this.setItemQuantity(item.qty);
  }

  onIncrementQuantity(item) {
    console.log(item.quantities_available);
    if (item.qty !== item.quantities_available) {
      item.qty++;
      this.setItemQuantity(item.qty);
    } else {
      this.utility.showToast('Item Out Of Stock', 'error');
    }
  }

  async setupForm() {
    this.loading = true;
    this.aForm = this.getRow();

    this.deliveryCharges = 0;

    console.log(this.deliveryCharges);
    let coords = await this.mapService.getCoords();
    // let coords = {lng:111.15346, lat: 27.23358}
    console.log(coords);
    let address = await this.mapService.getGeoAddress(coords);

    // let address = 'ABC'
    console.log(address);

    this.total = await this.cartService.calculateTotal();

    this.f.buyer_latitude.setValue(coords['lat']);
    this.f.buyer_longitude.setValue(coords['lng']);
    this.f.buyer_address.setValue(address);

    this.f.product_id.setValue(this.cart.items[0].id);
    console.warn(this.deliveryCharges['total']);
    this.f.delivery_charges.setValue(this.deliveryCharges['total']);
    this.setItemQuantity(this.cart.items[0].qty);

    this.loading = false;
  }

  async getDeliveryCharges() {
    this.deliveryCharges = await this.cartService.getDeliveryCharge();
  }

  async setItemQuantity(qty) {
    this.f.quantities.setValue(qty);
    this.total = await this.cartService.calculateTotal();
  }
  goBack() {
    this.location.back();
  }
  getRow() {
    return this.formbuilder.group({
      buyer_latitude: ['', Validators.compose([Validators.required])],
      buyer_longitude: ['', Validators.compose([Validators.required])],
      buyer_address: ['', Validators.compose([Validators.required])],
      delivery_options: ['', Validators.compose([Validators.required])],
      delivery_charges: [
        this.deliveryCharges,
        Validators.compose([Validators.required]),
      ],
      payment_type: ['', Validators.compose([Validators.required])],
      product_id: ['', Validators.compose([Validators.required])],
      quantities: ['', Validators.compose([Validators.required])],
    });
  }

  get f() {
    return this.aForm.controls;
  }

  async onSubmit() {
    this.f.delivery_charges.setValue(this.deliveryCharges);

    if (this.aForm.invalid) {
      console.log(this.aForm.value);
      this.utility.presentAlert('Invalid Form');
      return;
    }

    this.loading = true;

    const formdata = this.aForm.value;
    console.log(formdata);
    this.order = await this.network.postPlaceOrder(formdata);
    console.log(this.order);
    this.cartService.setDeliveryDetails(this.order);
    formdata['order_id'] = this.order['id'];
    let st = JSON.stringify(formdata);
    this.storage.setKey('order', st);

    console.log('your order is:', this.order);

    if (formdata['order_id']) {
      await this.changeRole('Consumer');
      //this.router.navigate(['consumer/postJob'], { queryParams: { order_id: formdata['order_id'] } } );

      var obj = { jobId: formdata['order_id'], amount: this.total };
      obj['orderId'] = formdata['order_id'];
      obj['amount'] = this.total;
      obj['paymentType'] = this.f.payment_type.value;
      obj['delivery_address'] = this.order.delivery_address;
      obj['pickup_address'] = this.order.job_address;
      obj['item_category'] = this.order.item_category;
      obj['vehicle_type'] = this.order.package_size;
      obj['priority'] = this.order.priority;
      this.router.navigate(['consumer/paymentMode', obj]);
    }
  }

  changeRole(role) {
    return new Promise((resolve) => {
      this.commonApiService
        .userRoleChange({ role: role })
        .then((data) => {
          localStorage.setItem('userRole', role);
          resolve(data);
        })
        .catch((err) => {});
    });
  }

  changeOptions(e) {
    if (e.target.value.includes(this.paymentTypes[1])) {
      console.log(e.target.value);
      this.f.delivery_options.setValue(this.deliveryOptions[1]);
      this.getDeliveryCharges();
    } else {
      this.showMap = false;
      console.log(e.target.value);
      this.f.delivery_options.setValue(this.deliveryOptions[1]);
      this.getDeliveryCharges();
    }
  }

  changeDeliveryOptions(e) {
    console.log(e.target.value, this.deliveryOptions[0]);
    if (e.target.value.includes(this.deliveryOptions[0])) {
      this.deliveryCharges = 0;
    } else {
      this.getDeliveryCharges();
    }
  }

  checkout($event) {
    console.log($event);
    this.events.publish('Order Placed', 'Event published');
  }
}
