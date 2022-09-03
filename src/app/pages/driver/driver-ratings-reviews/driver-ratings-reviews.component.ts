import { Component, OnInit } from '@angular/core';
import { DriverApiService } from 'src/app/services/driver-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-driver-ratings-reviews',
  templateUrl: './driver-ratings-reviews.component.html',
  styleUrls: ['./driver-ratings-reviews.component.scss']
})
export class DriverRatingsReviewsComponent implements OnInit {

  star1; star2; star3; star4; star5;
  reviews;
  stars = 0;
  jobId;

  constructor(private driverApiService: DriverApiService, private activatedRoute: ActivatedRoute, private route: Router) { 
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

  submitRatings(){
    let data = {
      "rating": this.stars,
      "review": this.reviews,
      "job_id": this.jobId,
      driver_reviewed: 1
    }
    this.driverApiService.ratingAndReview(data).then(res => {
      this.route.navigate(['driver/driverDashboard']);
    }).catch(err => {});
  }

}
