import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverApiService } from 'src/app/services/driver-api.service';

@Component({
  selector: 'app-delivery-history',
  templateUrl: './delivery-history.component.html',
  styleUrls: ['./delivery-history.component.scss'],
})
export class DeliveryHistoryComponent implements OnInit {
  jobsList = [];
  constructor(
    private driverApiService: DriverApiService,
    private router: Router
  ) {
    this.getMyJobList();
  }

  ngOnInit() {}

  //Get Delivered job list
  getMyJobList() {
    this.driverApiService
      .driverSelectedjobList({
        deliverer_id: localStorage.getItem('userId'),
        status: ['Delivered'],
      })
      .then((res: any) => {
        res.jobs.forEach((element) => {
          this.jobsList.push({
            id: element.id,
            title: element.description,
            jobLabel: element.priority,
            amount: element.job_price,
            sourceAddress: element.job_address,
            destinationAddress: element.delivery_address,
            status: element.status,
            driverReviewed: element.driverReviewed,
          });
          console.log('noman', element);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goForRating(job) {
    if (job.status == 'Delivered') {
      this.router.navigate(['driver/driverReviews', { jobId: job.id }]);
    }
  }
}
