import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Injector,
} from '@angular/core';
import 'materialize-css';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent extends BasePage implements OnInit {
  tab = 'active';
  jobsId;
  successModalEle;
  @Input() job: any;

  constructor(injector: Injector) {
    super(injector);
    // this.getJobData();
  }

  ngOnInit() {}

  goToTrackDriver(item) {
    console.log('Item', item);
    this.data.job_data = item;
    this.navigateTo('pages/track-driver');
  }
}
