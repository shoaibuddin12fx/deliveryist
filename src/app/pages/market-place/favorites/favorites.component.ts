import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent extends BasePage implements OnInit {

  public products: Product[] = [];

  showFilter = false;
  filters = {
    offset: 0,
    is_favorite: 1
  };

  constructor(injector: Injector,
              public favService: FavoritesService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event: any = {}) {
    this.products = await this.favService.loadAll(this.filters) as Product[];
  }

  searchByText($event){
    let v = $event.target.value;
    this.products = this.products.filter( x => {
      return x.name.toLowerCase().indexOf(v.toLowerCase()) > -1
    })
    
  }

}
