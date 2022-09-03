import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {

  _ImageObjs;
  slideOpts = {
    
  }

  get ImageObjs(): any {
    return this._ImageObjs;
  }

  @Input('ImageObjs') set ImageObjs(value: any) {
    console.log(value);
    this._ImageObjs = value;
         
  }

  constructor() { }

  ngOnInit() {
  }

}
