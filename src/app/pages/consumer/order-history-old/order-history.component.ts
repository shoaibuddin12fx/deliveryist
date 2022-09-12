import { Component, Injector, OnInit } from '@angular/core';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
import { Router } from '@angular/router';
import 'materialize-css';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent extends BasePage implements OnInit {
  jobsList = [];
  jobsId;
  constructor(
    injector: Injector,
    private consumerApiService: ConsumerApiService,
    private route: Router
  ) {
    super(injector);
    // Get user posted job list
    this.consumerApiService
      .getJobList('complete')
      .then((res: any) => {
        res.jobs.forEach((element) => {
          if (element.status === 'Delivered') {
            this.jobsList.push({
              id: element.id,
              title: element.description,
              jobLabel: element.priority,
              amount: element.job_price,
              sourceAddress: element.job_address,
              destinationAddress: element.delivery_address,
              status: element.status,
              clientReviewed: element.clientReviewed,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit() {}

  goForRating(job) {
    if (job.status == 'Delivered') {
      this.route.navigate(['consumer/reviews', { jobId: job.id }]);
    }
  }
}
