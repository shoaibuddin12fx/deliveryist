import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.page.html',
  styleUrls: ['./help-page.page.scss'],
})
export class HelpPagePage extends BasePage implements OnInit {
  isShown = false;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  toggleShow() {
    this.isShown = !this.isShown;
  }
}
