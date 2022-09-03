import { Component, OnInit, AfterViewInit, Injector, EventEmitter } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasePage } from '../../base-page/base-page';
// import { MaterializeAction } from 'angular2-materialize';
// import M from 'materialize-css/dist/js/materialize.min.js';
import { MapService } from '../services/map.service';
// import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BasePage implements OnInit, AfterViewInit {
  modalActions = new EventEmitter<string>(); // | MaterializeAction


  public last_entry_id: any;
  public price_min: any = '';
  public price_max: any = '';
  public is_insured: boolean = false;
  public latitude: any;
  public longitude: any;
  public distance: any = 10;

  showFilter = false;
  filters;
  searchText: any;

  products: any;
  loading = true;
  showSpinner = false;
  hideSpinner = true;
  category_id: any;
  title = 'All Categories';

  constructor(
    injector: Injector,
    public productService: ProductService,
    // public events: NgxPubSubService,
    private spinner: NgxSpinnerService,
    private mapService: MapService
  ) {
    super(injector);
    this.events.subscribe('openFilters', data => {
      this.showFilter = !this.showFilter;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.initializeModal();
  }
  async initializeSelect() {
    // const options = {};
    // const elems = document.querySelector('#select');
    // // const instances = M.FormSelect.init(elems, options);
    // return instances;
  }

  initializeModal() {
    // const options = {};
    // const elems = document.querySelector('#model1');
    // const instances = M.Modal.init(elems, options);
    // return instances;
  }

  async loadData() {
    this.category_id = this.getQueryParams().categoryId;
    console.log(this.category_id);
    if (this.category_id) {
      const filters = {
        category_id: this.category_id
      };
      this.title = this.getQueryParams().cat_name;
      this.products = await this.productService.loadAll(filters);
    } else if (!this.category_id) {
      this.products = await this.productService.loadAll();
    }
    console.log(this.products);
    this.loading = false;
  }

  async loadMoreProducts() {
    this.spinner.show();
    console.log('~~~Scrolled !!!~~~');
    const filters = {
      last_entry_id:  this.products.length > 0 ? this.products[this.products.length - 1].id : ''
    };
    const newProducts = await this.productService.loadAll(filters);
    console.log(newProducts);

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
    console.log('Before Appending Products ',this.products);

    newProducts.forEach(element => {
      this.products.push(element);
    });

    console.log(this.products);
    console.log('More Products Appended');

  }

  async loadProductsWithFilters() {
    this.closeModal();
    this.filters = await this.setAllFilters();
    delete this.filters['last_entry_id'];
    this.products = await this.productService.loadAll(this.filters);
  }

  async setAllFilters() {
    return new Promise(async resolve => {

      const coords = await this.mapService.getCoords();
      this.last_entry_id = this.products.length > 0 ? this.products[0].id : '';
      this.latitude = coords['lat'];
      this.longitude = coords['lng'];
      this.distance = this.mapService.getRadialDistance();

      const obj = {
        category: this.category_id,
        distance: this.distance,
        is_insured: this.is_insured,
        latitude: this.latitude,
        longitude: this.longitude,
        price_max: this.price_max,
        price_min: this.price_min,
        last_entry_id: this.last_entry_id,
        search: this.searchText
      };
      console.log(obj);
      resolve(obj);
    });
  }

  addProduct() {
    this.navigateTo(['marketplace/add_product']);
  }

  itemDetailPage(item) {
    console.log(item);
    this.router.navigate(['marketplace/product/' + item.id]);
  }

  openModal() {
    // // this.modalActions.emit({ action: "modal", params: ['open'] });
    this.showFilter = true;
  }
  // close modal
  closeModal() {
    // // this.modalActions.emit({ action: "modal", params: ['close'] });
    this.showFilter = false;
  }
}
