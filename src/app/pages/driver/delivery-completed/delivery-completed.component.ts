import { Component, Injector, OnInit } from '@angular/core';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-delivery-completed',
  templateUrl: './delivery-completed.component.html',
  styleUrls: ['./delivery-completed.component.scss'],
})
export class DeliveryCompletedComponent extends BasePage implements OnInit {
  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit() {}
  goToDriver() {
    this.events.publish('driverUpdated', 'Event published');
    this.router.navigate(['driver/driverDashboard']);
  }
}
