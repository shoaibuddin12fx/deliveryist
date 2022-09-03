import { Component, OnInit, Input, AfterViewInit, Injector, Output, EventEmitter } from '@angular/core';
// import M from "materialize-css/dist/js/materialize.min.js";
import { BasePage } from 'src/app/pages/base-page/base-page';
import { AuthService } from 'src/app/services/authguards/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PreferenceService } from '../../services/preference.service';
// import { MaterializeAction } from 'angular2-materialize';
// import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.scss']
})
export class CartHeaderComponent implements OnInit, AfterViewInit {

  @Input('title') title = 'Marketplace';
  @Input('showBackButton') showBackButton: boolean = false;
  @Input('showLocation') showLocation: boolean = false;
  @Input('showFilters') showFilters: boolean = false;
  @Input('showSearch') showSearch: boolean = false;
  @Input('showCart') showCart: boolean = false;
  @Input('showProfile') showProfile: boolean = false;
  @Input('showLike') showLike: boolean = false;
  @Input('isLike') isLike: boolean = false;

  @Output('toggleLike') toggleLike: EventEmitter<boolean> = new EventEmitter<boolean>();

  elem;
  elemInstance;
  headerTitle = "Market Place";

  constructor(public authService: AuthService,
              public router: Router,
              public location: Location,
              public pref: PreferenceService,
              // public pubsub: NgxPubSubService,
              public cartService: CartService
  ) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.elem = document.querySelectorAll(".sidenav");
  }

  setToggleLike() {
    this.isLike = !this.isLike;
    this.toggleLike.emit(this.isLike);
  }

  openSidenav() {
    // this.elemInstance = M.Sidenav.init(this.elem, {
    //   edge: "left",
    //   inDuration: 250
    // });
  }

  closeSidenav() {
    // let navInstance = M.Sidenav.getInstance(this.elem);
    this.elemInstance.close();
  }

  dologout() {

    this.authService.logout();
    this.router.navigate(['/']);
    this.closeSidenav();
  }

  routeTo(link) {
    this.router.navigate([link]);
    this.closeSidenav();
  }

  goBack() {
    this.location.back()
  }

  gotoCart() {
    this.router.navigate(['marketplace/cart']);
  }

  goToProducts() {
    const data = 'EVENT FIRED';
    // this.pubsub.publishEvent('openProducts', data);
  }

  openFilters() {
    const data = 'EVENT FIRED';
    // this.pubsub.publishEvent('openFilters', data);
  }
}
