import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSettingsComponent } from './driver-settings.component';

describe('DriverSettingsComponent', () => {
  let component: DriverSettingsComponent;
  let fixture: ComponentFixture<DriverSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
