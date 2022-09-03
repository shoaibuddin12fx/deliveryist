import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { MaterializeAction } from 'angular2-materialize';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
import { DriverApiService } from 'src/app/services/driver-api.service';
import 'materialize-css';
// import M from 'materialize-css/dist/js/materialize.min.js';
@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  tab = 'active';
  modalActions = new EventEmitter<string >(); // | MaterializeAction
  jobsId;
  successModalEle;
  @Input() job: any;

  constructor() {
    // this.getJobData();
  }

  ngOnInit() {}
}
