import { Component, Injector, OnInit } from '@angular/core';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { BasePage } from '../../base-page/base-page';
import { PostJobPage } from '../post-job/post-job.page';

@Component({
  selector: 'app-consumer-dashboard',
  templateUrl: './consumer-dashboard.page.html',
  styleUrls: ['./consumer-dashboard.page.scss'],
})
export class ConsumerDashboardPage extends BasePage implements OnInit {

  tab = 'active';
  jobsId;
  successModalEle;
  jobsList = [];
  jobs = [];

  constructor(injector: Injector, private consumerApiService: ConsumerApiService, private driverApiService: DriverApiService) {

    super(injector)
    // Get user posted job list
    this.getJobData();
  }

  ngOnInit() {
  }


  // Post a new job
  getJobData() {
    this.consumerApiService.getJobList(this.tab).then((res: any) => {
      res.jobs.forEach(element => {
        this.jobsList.push({
          id: element.id,
          title: element.description || '',
          jobLabel: element.priority,
          driverHired: element.status === 'Pending' ? false : true,
          amount: element.job_price,
          sourceAddress: element.job_address,
          destinationAddress: element.delivery_address,
          status: element.status
        });
      });
    }).catch(err => { console.log(err); });
  }

  // Post a new job
  async postNewJob() {
    // Go to dashboard after posting a new job
    // this.route.navigate(['consumer/postJob']);

    const res = await this.modals.present(PostJobPage);
  }

  // Hire a driver for the job
  goToHireDriver(){
    // this.route.navigate(['consumer/hireDriver']);
  }

  // Track a driver for the job
  goToTrackDriver(jobs) {
    console.log(jobs);
    // this.route.navigate(['consumer/trackDriver', { jobId: jobs.id }])
  }

  // Update package status
  packageStatusUpdate(status, modal) {
    const jobData: any = {
      job_id: this.jobsId,
      status
    };
    this.driverApiService.packageStatusChange(jobData).then(res => {
      console.log(res);
      // if(status == 'Delivered'){
      //   this.route.navigate(['driver/driverReviews', {jobId: this.jobsId}]);
      // }
      this.goToTrackDriver({id: this.jobsId});
    }).catch(err => {
      console.log(err);
    });
    // this.closeModal(modal);
  }

  // Delete job
  cancelJob(jobs, index) {
    this.consumerApiService.deleteJob({ job_id: jobs.id}).then(res => {
      this.jobsList.splice(index, 1);
    }).catch(err => {
      console.log(err);
    });
  }

  openModal(modalId, jobId) {
    this.jobsId = jobId;
    // const modal = document.getElementById(modalId);
    // const instance = M.Modal.getInstance(modal);
    // instance.open();
  }

  closeModal(modalId) {
    // const modal = document.getElementById(modalId);
    // const instance = M.Modal.getInstance(modal);
    // instance.close();
  }

  cancelDriver(jobs){
    this.consumerApiService.deleteJob({ job_id: jobs.id}).then(res => {
      //this.jobsList.splice(index, 1);
    }).catch(err => {
      console.log(err);
    })
  }

  changeTab(tabName) {
    this.tab = tabName;
    this.getJobData();
  }

  loadData($event){
    setTimeout(()=>{
      if(this.jobsList.length < 20){
        $event.target.disabled = true;
      }
      else{
        this.getJobData();
        $event.target.complete();
      }
    },500);
  }

}
