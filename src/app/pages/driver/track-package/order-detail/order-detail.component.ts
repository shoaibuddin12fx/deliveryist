import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent extends BasePage implements OnInit {
  _track;

  @Input() set track(value) {
    this._track = value;
  }

  get track() {
    return this._track;
  }

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    setTimeout(() => {
      console.log('====================================');
      console.log('Data', this.track);
      console.log('====================================');
    }, 1000);
  }

  closeDetail() {
    this.modals.dismiss();
  }
}
