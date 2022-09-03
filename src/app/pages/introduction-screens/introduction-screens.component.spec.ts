import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionScreensComponent } from './introduction-screens.component';

describe('IntroductionScreensComponent', () => {
  let component: IntroductionScreensComponent;
  let fixture: ComponentFixture<IntroductionScreensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionScreensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
