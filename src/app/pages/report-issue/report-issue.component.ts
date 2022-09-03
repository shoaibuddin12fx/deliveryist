import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss']
})
export class ReportIssueComponent implements OnInit {

  reportForm: FormGroup;
  formData = new FormData();
  userRole = localStorage.getItem('userRole');
  constructor(private router: Router, private commonAPIService: CommonServicesService) {
    this.reportForm = new FormGroup({
      'description': new FormControl(null, Validators.required),
      'attachment': new FormControl(null),
    })
  }

  ngOnInit() {
  }

  processFile(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      this.reportForm.get('attachment').setValue({ file, type: file.type, documentURL: '' });
          reader.onload = e => this.reportForm.get('attachment').value.documentURL = reader.result;
          reader.readAsDataURL(file);
      this.formData.append('vehicleImage', file);
    }
  }

  reportAnIssue(){
    this.formData.append('description', this.reportForm.controls['description'].value);
    this.commonAPIService.reportAnIssue(this.formData).then((response:any) => {
      console.log(response);
      if(this.userRole == 'Consumer') {
        this.router.navigate(['consumer/consumerDashboard'])
      } else if(this.userRole == 'Driver') {
        this.router.navigate(['driver/driverDashboard'])
      }
    }).catch(err => {
      console.log(err);
    })
  }


}
