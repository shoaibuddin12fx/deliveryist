import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerNotificationComponent } from './consumer-notification.component';

describe('ConsumerNotificationComponent', () => {
  let component: ConsumerNotificationComponent;
  let fixture: ComponentFixture<ConsumerNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
