import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import 'materialize-css';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  tab = 'active';
  jobsId;
  successModalEle;
  @Input() job: any;

  constructor() {
    // this.getJobData();
  }

  ngOnInit() {}
}
