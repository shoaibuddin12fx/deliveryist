import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { StorageService } from 'src/app/services/_helpers/storage.service';

@Component({
  selector: 'app-my-item',
  templateUrl: './my-item.component.html',
  styleUrls: ['./my-item.component.scss']
})
export class MyItemComponent extends BasePage implements OnInit {

  public loading = false;
  public products;
  uid: any;
  myItems;
  filters = {
    offset: 0,
    min_price: null,
    max_price: null,
    search: null
  };


  constructor(
    injector: Injector,
    private productService: ProductService,
  ) {
    super(injector);
  }

  async ngOnInit() {
    await this.getUid();
    this.getMyItems();
  }

  getUid() {
    this.storage.getKey('uid').then(response => {
      this.uid = response;
      console.log(response);
    });
  }

  getMyItems() {
    this.loading =true;
    this.productService.getMyItemsFromApi().then(res => {
      console.log(res);
      if (res) {
        this.products = res;
        this.loading = false;
      }
    }).catch(error => {
      console.log(error);
    });
  }

  async loadMoreProducts() {
    console.log('~~~Scrolled !!!~~~');
    // const filters = {
    //   last_entry_id:  this.products.length > 0 ? this.products[this.products.length - 1].id : ''
    // };
    this.products = await this.productService.loadAll();
    console.log(this.products);
  }

  searchByText($event) {
    let v = $event.target.value;
    this.products = this.productService.products.filter(x => {
      return x.name.toLowerCase().indexOf(v.toLowerCase()) > -1;
    });

  }

  itemDetailPage(item) {
    console.log(item);
    // 'marketplace/product/'+item.id
    this.router.navigate(['marketplace/product/' + item.id]);
  }
  
  itemEditPage(item) {
    console.log(item);
    this.router.navigate(['marketplace/edit_product/' + item.id]);
  }
}
