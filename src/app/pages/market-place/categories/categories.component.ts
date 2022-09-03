import { CategoryService } from './../services/category.service';
import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { Category } from '../model/category.model';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BasePage implements OnInit {

  selectedIndex = 0;
  public categories: any[] = [];
  public grouped_categories: any[] = [];
  public grouped_categories_keys: any[] = [];
  public products: Product[] = [];

  constructor(injector: Injector,
              private categoryService: CategoryService,
              public productService: ProductService,
    ) {
    super(injector)
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event: any = {}) {
    this.categories = this.categoryService.getGroupedCategories();
    // var all = this.categories.find( x => x.id == 0);

    // const category_id = this.getQueryParams().category_id;
    // console.log(category_id);
    // if (category_id) {
    //   all = this.categories.find( x => x.id == category_id);
    // }

    // this.setSelectedCategory(all)

  }

  async setSelectedCategory(item) {
    this.selectedIndex = item.id;
    if (this.selectedIndex == 0) {
      this.products = await this.productService.load()
    } else {
      this.products = await this.productService.filterProduct(item.name)
    }

  }

  showSubcategories(item){
    this.categories = this.grouped_categories.find( x => {
      let key = Object.keys(x);
      console.log(key);
      return x;
    })
    console.log(item, this.grouped_categories, this.grouped_categories[item], this.categories)
  }

  goToCategory(cat) {
    this.navigateTo('marketplace/products',{ queryParams: { categoryId: cat.id, cat_name: cat.name} });
  }


}
