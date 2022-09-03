import { Component, OnInit } from '@angular/core';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  cardDetail = [];
  constructor(private consumerApiService: ConsumerApiService) { 
    this.consumerApiService.getCardDetail().then((res:any) => {
      console.log(res);
      this.cardDetail = res.method;
    }).catch(err => { console.log(err) });
  }

  ngOnInit() {
  }

}
