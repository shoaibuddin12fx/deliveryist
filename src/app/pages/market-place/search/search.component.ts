import { Component, OnInit, Injector } from '@angular/core';
import { Product } from '../model/product.model';
import { BasePage } from '../../base-page/base-page';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BasePage implements OnInit {

  public products: Product[] = [];

  constructor(injector: Injector,
              private productService: ProductService,
  ) {
    super(injector);
    this.loadData();
  }

  ngOnInit() {
  }

  async loadData(event: any = {}) {
    this.products = await this.productService.load();
  }

  searchByText($event){
    let v = $event.target.value;
    this.products = this.productService.products.filter( x => {
      return x.name.toLowerCase().indexOf(v.toLowerCase()) > -1
    })
    
  }

}
