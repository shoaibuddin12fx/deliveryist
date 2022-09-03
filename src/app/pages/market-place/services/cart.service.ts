import { Injectable, Injector, OnInit } from '@angular/core';
import { Cart } from '../model/cart.model';
// import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { Product } from '../model/product.model';
import { PreferenceService } from './preference.service';
import { ProductService } from './product.service';
import { async } from '@angular/core/testing';
import { MapService } from './map.service';
import { NetworkService } from 'src/app/services/_helpers/network.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart;
  distance: number;
  details;
  product;
  constructor(
    // public events: NgxPubSubService,
    public pref: PreferenceService,
    public productService: ProductService,
    public mapService: MapService,
    public network: NetworkService
  ) {
    this.cart = new Cart();
  }

  get(): Cart{
    return this.cart ? this.cart : new Cart();
  }

  new(): Cart {
    return new Cart();
  }

  empty(): boolean {
    return this.cart.items.length == 0;
  }

  async getDeliveryCharge(): Promise<number> {

    return new Promise(async resolve => {

      let coords = await this.mapService.getCoords();
      console.log(coords);

      const obj = {
        currLat: coords['lat'],
        currLng: coords['lng'],
        productLat: this.cart.items[0].latitude,
        productLng: this.cart.items[0].longitude,
      };

      this.distance = this.mapService.calculateDistance(obj);
      console.log(this.distance);

      // setTimeout(async () => {
        console.log(this.distance);
        let intDis = Math.round(this.distance);
        let dist = {
          distance: intDis
        }
        const res = await this.network.postGetDeliveryCharges(dist);
        console.log(res);
        let n = res['total'] as number
        this.cart.shipping = n;
        resolve(n);
        // if(res && res['total']){
        //   resolve(res['total'])
        // }else{
        //   resolve(0)
        // }

      // }, 2000);
    });

  }

  calculateSubtotal() {
    let total = this.cart.items.reduce((prevVal, item) => {
      return prevVal + item.price;
    }, 0);
    console.log(total);
    this.cart.subtotal = total;
  }

  async calculateTotal() {

      let total = this.cart.items.reduce((prevVal, item) => {
        return prevVal + (item.price * item.qty);
      }, 0);
      this.cart.total = total;
      console.log(total)
      return total;
  }

  // async changeAddToCartQty(item) {

  //   let cart = await this.getOne();
  //   cart = cart || new Cart();

  //   const existInCart = cart.items
  //   .findIndex(itm => itm.id === item.id);

  //   if (existInCart != -1) {
  //     cart.items[existInCart].qty = item.qty;
  //   }
  // }

  async onAddToCart(item): Promise<Product> {

    return new Promise(async resolve => {

      let _cart = await this.cart || new Cart();
      const index = _cart.items.findIndex(itm => itm.id == item.id);

      if(index == -1){
        item.qty = item.qty ? item.qty : 1;
        _cart.items[0] = item;
      }else{
        item.qty = item.qty ? item.qty + 1 : 1;
        _cart.items[index].qty = item.qty;
      }

      this.cart = _cart;
      console.log(this.cart);

      this.pref.setCartCount(_cart.items.length);

      let p = new Product().deserialize(item);
      resolve(p);
    });
  }

  setDeliveryDetails(deliveryDetails){
    this.details = deliveryDetails;
  }

  getDeliveryDetails(){
    return this.details;
  }

}
