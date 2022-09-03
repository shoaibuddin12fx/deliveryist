import { ProductService } from './../../services/product.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  _item: Product;
  isImage = false;

  @Input('edit') edit: boolean = false;
  @Input('showName') showName: boolean = true;
  @Input('showPrice') showPrice: boolean = true;

  @Input() set item(value: Product) {
    this._item = value;
    this.setItem(value);
    
  }

  get item(): Product {
    return this._item;
  }

  @Output('showDetail') showDetail: EventEmitter<any> = new EventEmitter<any>();
  @Output('showEdit') showEdit: EventEmitter<any> = new EventEmitter<any>();

  async setItem(value) {
    this._item = value;
    if (this._item.photos_urls) {
      if (this._item.photos_urls[0]) {
        if (this._item.photos_urls[0]) {
          this.isImage = true;
          this.item.image = this._item.photos_urls[0].firebase_url;
        } else {
          this.isImage = false;
        }
      } else {
        this.isImage = false;

      }
    } else {
      this.isImage = false;
    }
  }

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  editProduct($event) {

  }

}
