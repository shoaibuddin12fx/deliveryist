import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';
import { NetworkService } from 'src/app/services/_helpers/network.service';
import { MapService } from '../../services/map.service';
import { ProductService } from '../../services/product.service';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.scss']
})
export class CategoryBoxComponent extends BasePage implements OnInit {

  _category: any;
  items: any[] = [];
  _filters: any;

  get category(): any {
    return this._category;
  }

  @Input('category') set category(value: any) {
      this._category = value;
      this.getCategoryItems(value.id);
  }

  @Input('filters') filters: any = {};
  @Output('onclick') onclick: EventEmitter<any> = new EventEmitter<any>();
  @Output('openItem') openItem: EventEmitter<any> = new EventEmitter<any>();
  @Output('openCategory') openCategory: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public network: NetworkService,
    private mapService: MapService,
    private productService: ProductService
    ) {
      super(injector);
    }

  ngOnInit() {

  }

  async getCategoryItems(cat_id){
    this.filters['category_id'] = cat_id;
    this.items = await this.productService.loadAll(this.filters);
  }

  itemDetailPage(item){
    this.openItem.emit(item);
  }

  openCategoryEvent(){
      this.openCategory.emit(this.category);
  }

}
