import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-header',
  templateUrl: './setting-header.component.html',
  styleUrls: ['./setting-header.component.scss'],
})
export class SettingHeaderComponent implements OnInit {
  @Input() title = '';

  constructor() {}

  ngOnInit() {}
}
