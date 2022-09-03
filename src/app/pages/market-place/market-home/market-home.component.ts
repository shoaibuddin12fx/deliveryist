import { Component, OnInit, Injector, ViewChild, ElementRef, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { Category } from '../model/category.model';
import { BasePage } from '../../base-page/base-page';
import { CategoryService } from '../services/category.service';
import { Banner } from '../model/banner.model';
import { BannerService } from '../services/banner.service';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { MapService } from '../services/map.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// import { MaterializeAction } from 'angular2-materialize';
import { PreferenceService } from '../services/preference.service';

declare var require: any;

// const data: any = require('../../../shared/data/products.json');

@Component({
  selector: 'app-market-home',
  templateUrl: './market-home.component.html',
  styleUrls: ['./market-home.component.scss']
})

export class MarketHomeComponent extends BasePage implements OnInit, AfterViewInit {
  modalActions = new EventEmitter<string>(); //  | MaterializeAction


  loading = false;
  username;
  public categories: Category[] = [];
  public selectedCategoryIndex = -1;
  public banners: Banner[] = [];
  public products: Product[] = [];

  showFilter = false;
  filters = {
    offset: 0,
    min_price: null,
    max_price: null,
    search: null


  };
  showSpinner = false;
  hideSpinner = true;
  searchText: any;
  constructor(
    injector: Injector,
    private categoryService: CategoryService,
    private bannerService: BannerService,
    public productService: ProductService,
    public mapService: MapService,
    private spinner: NgxSpinnerService,
    // public events: NgxPubSubService,
    public pref: PreferenceService,
  ) {
    super(injector);


    // this.firebaseService.loginStaticEmailUser();
    this.events.subscribe('openProducts', data => {
      this.navigateTo('marketplace/products');
    });
  }

  async ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() { }

  async loadData(event: any = {}) {

    this.loading = true;
    // this.categories = await this.categoryService.loadAll();
    // this.banners = await this.bannerService.load();
    let p = await this.productService.loadAll(this.filters);
    console.log(p);
    this.products.push(...p);

    this.filters.offset = this.products.length;

    const user = JSON.parse(localStorage.getItem('userData'));
    if(user) {
      this.username = user['full_name'];
    }

    // this.products = data;
    this.loading = false;
  }

  itemDetailPage(item) {
    console.log(item);
    this.router.navigate(['marketplace/product/' + item.id]);
  }

  itemEditPage(item) {
    console.log(item);
    this.router.navigate(['marketplace/edit_product/' + item.id]);
  }

  categorySelectRedirect(item) {
    this.navigateTo('marketplace/products', { queryParams: { categoryId: item.id , cat_name: item.name} });
  }

  gotoCart() {
    this.router.navigate(['marketplace/cart']);
  }

  loadMoreProducts(){
    this.loadData();
  }

  onFilter(){
    this.products = [];
    this.filters.offset = 0;
    this.loadData();
  }

  keyDownFunction($event){
    if ($event.keyCode === 13) {
      this.onFilter();
      // rest of your code
    }
  }
}

