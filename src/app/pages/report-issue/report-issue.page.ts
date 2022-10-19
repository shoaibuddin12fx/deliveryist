import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.page.html',
  styleUrls: ['./report-issue.page.scss'],
})
export class ReportIssuePage extends BasePage implements OnInit {
  reportForm: FormGroup;
  formData = new FormData();
  userRole = localStorage.getItem('userRole');
  description;
  constructor(
    public router: Router,
    public commonAPIService: CommonServicesService,
    injector: Injector
  ) {
    super(injector);
    this.reportForm = new FormGroup({
      description: new FormControl(null, Validators.required),
      attachment: new FormControl(null),
    });
  }

  ngOnInit() {}

  processFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      this.reportForm
        .get('attachment')
        .setValue({ file, type: file.type, documentURL: '' });
      reader.onload = (e) =>
        (this.reportForm.get('attachment').value.documentURL = reader.result);
      reader.readAsDataURL(file);
      this.formData.append('vehicleImage', file);
    }
  }

  reportAnIssue() {
    // alert('Hello World');
    this.formData.append('description', this.description);
    this.commonAPIService
      .reportAnIssue(this.formData)
      .then((response: any) => {
        console.log(response);
        if (this.userRole == 'Consumer') {
          this.router.navigate(['consumer/consumerDashboard']);
        } else if (this.userRole == 'Driver') {
          this.router.navigate(['driver/driverDashboard']);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
