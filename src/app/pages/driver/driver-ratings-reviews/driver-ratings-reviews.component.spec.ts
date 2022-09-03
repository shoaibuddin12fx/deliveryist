import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRatingsReviewsComponent } from './driver-ratings-reviews.component';

describe('DriverRatingsReviewsComponent', () => {
  let component: DriverRatingsReviewsComponent;
  let fixture: ComponentFixture<DriverRatingsReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverRatingsReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRatingsReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
