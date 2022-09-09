import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackPackageComponent } from './track-package.component';

describe('TrackPackageComponent', () => {
  let component: TrackPackageComponent;
  let fixture: ComponentFixture<TrackPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
