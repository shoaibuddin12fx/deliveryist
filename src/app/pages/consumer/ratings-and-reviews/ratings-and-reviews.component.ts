import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ConsumerApiService } from 'src/app/services/consumer-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ratings-and-reviews',
  templateUrl: './ratings-and-reviews.component.html',
  styleUrls: ['./ratings-and-reviews.component.scss']
})
export class RatingsAndReviewsComponent implements OnInit, AfterViewInit {

  star1; star2; star3; star4; star5;
  reviews;
  stars = 0;
  jobId;
  // checkAnswersList = [ 
  //   { answer: 'Driver was quick'},
  //   { answer: 'Driver was polite'},
  //   { answer: 'Driver was familiar with the addresses'},
  // ]

  constructor(private consumerService: ConsumerApiService, private activatedRoute: ActivatedRoute, private route: Router) { 
    this.activatedRoute.params.subscribe((data) => {
      this.jobId = data.jobId;
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.star1 = document.getElementById('star1');
    this.star2 = document.getElementById('star2');
    this.star3 = document.getElementById('star3');
    this.star4 = document.getElementById('star4');
    this.star5 = document.getElementById('star5');
  }

  calculateStar(starId){
    this.removeStar();
    let star =  starId.split('star')[1];
    this.stars = parseInt(star);
    for(let i=1; i<=star ; i++){
      let ele = document.getElementById(`star${i}`);
      ele.classList.add('active');
    }
  }

  removeStar(){
    for(let i=1; i<6 ; i++){
      let ele = document.getElementById(`star${i}`);
      ele.classList.remove('active');
    }
  }

  checkValue(id, event){
    let ele = document.getElementById(id);
    if(event.target.checked){
      ele.classList.add('active')
    } else {
      ele.classList.remove('active')
    }
  }

  clickRadio(element, event){
    let div = document.getElementById(element);
    if(event.target.value == "on") {
      div.classList.add('active')
    } else if(event.target.value == "off"){
      div.classList.remove('active')
    }

  }

  submitRatings(){
    let data = {
      "rating": this.stars,
      "review": this.reviews,
      "job_id": this.jobId,
      "client_reviewed": 1
    }
    this.consumerService.ratingAndReview(data).then(res => {
      this.route.navigate(['consumer/consumerDashboard']);
    }).catch(err => {});
  }
}
