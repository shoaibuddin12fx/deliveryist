import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
// import M from "materialize-css/dist/js/materialize.min.js";
import 'materialize-css';
// import { MaterializeAction } from 'angular2-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';
declare let paypal: any;
declare var StripeCheckout;
@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.scss']
})
export class PaymentModeComponent implements OnInit {

  handler: any = null;
  modalActions = new EventEmitter<string>(); //  | MaterializeAction
  elems;
  successModalEle;
  addScript: boolean = false;
  paypalLoad: boolean = true;
  jobId;
  finalAmount;
  orderId;
  orderSummary: any;
  paypalConfig = {
    // env: 'sandbox',
    // style: {
    //       size: 'responsive',
    //       color: 'white',
    //       shape: 'rect',
    //       label: 'pay',
    //       layout: 'horizontal',
    //       tagline: 'false'
    // },
    // locale: 'en_US',
    // client: {
    //   sandbox: 'AdiFfUvZKZIwcaB6E8YOfhaZrrl0YuWVeu182kIgnb_9jAcH_K-ndwC-FqHADCeQ6WjqOf4YV4modZBj',
    // },
    // commit: true ,

    createOrder: (data, actions) => {
      let self = this;

      let BASE = "https://deliveryist.com/admin-laravel-7x/public/api/"
      // This function sets up the details of the transaction, including the amount and line item details.
      return fetch(BASE.concat('payment/createPaypalOrder'), {
        method: 'post',
        // cors: 'cors',
        // credentials: 'false',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          job_id: parseInt(self.jobId),
          amount: Math.ceil(self.finalAmount)
        })
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        console.log(data);
        return data.wallet.order_id;
      });

    },
    onApprove: (data, actions) => {
      let self = this;
      let BASE = "https://deliveryist.com/admin-laravel-7x/public/api/"
      // This function captures the funds from the transaction.
      return fetch(BASE.concat('payment/createPaypalCapture'), {
        method: 'post',
        // cors: 'cors',
        // credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          order_id: data.orderID,
          job_id: parseInt(self.jobId),
          amount: Math.ceil(self.finalAmount)
        })
      }).then(function (res) {
        const d = res.json();
        console.log('Response: ');
        console.log(d);
        return d;
      }).then(function (details) {
        // Show a success message to the buyer
        self.openModel('modal1');
      });
    }
  }

  constructor(private route: Router, private commonService: CommonServicesService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((data) => {

      this.orderSummary = data;
      this.jobId = data.jobId;
      this.finalAmount = data.amount;

      if (data.orderId) {
        this.orderId = data.orderId;
      }

      if(data.paymentType != 'paypal') {
        this.goToTrackPage();
      }

    })
  }

  ngOnInit() {
    // this.goToTrackPage()
  }

  ngAfterViewInit() {
    // this.elems = document.querySelectorAll('.collapsible');
    // M.Collapsible.init(this.elems);
    // this.successModalEle = document.querySelectorAll('.modal');
    // M.Modal.init(this.successModalEle, { dismissible: true });
  }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Buttons(this.paypalConfig).render('#paypal-button');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = `https://www.paypal.com/sdk/js?client-id=AdiFfUvZKZIwcaB6E8YOfhaZrrl0YuWVeu182kIgnb_9jAcH_K-ndwC-FqHADCeQ6WjqOf4YV4modZBj`;
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  goToTrackPage() {
    //this.route.navigate(['consumer/consumerDashboard'])
    this.route.navigate(['consumer/orderSummary', this.orderSummary])
  }

  goToPostJob() {
    this.route.navigate(['consumer/postJob'])
  }


  openModel(modal) {
    // var elems = document.getElementById(modal);
    // var instances = M.Modal.getInstance(elems);
    // instances.open();
  }

  closeModel(modal) {
    // var elems = document.getElementById(modal);
    // var instances = M.Modal.getInstance(elems);
    // instances.close();
  }

}
