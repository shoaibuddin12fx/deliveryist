import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-setting-header',
  templateUrl: './setting-header.component.html',
  styleUrls: ['./setting-header.component.scss'],
})
export class SettingHeaderComponent extends BasePage implements OnInit {
  @Input() title = '';

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  back() {
    this.location.back();
  }
}
