import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverNotificationComponent } from './driver-notification.component';

describe('DriverNotificationComponent', () => {
  let component: DriverNotificationComponent;
  let fixture: ComponentFixture<DriverNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
