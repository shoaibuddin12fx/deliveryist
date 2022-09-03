import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectionScreenComponent } from './user-selection-screen.component';

describe('UserSelectionScreenComponent', () => {
  let component: UserSelectionScreenComponent;
  let fixture: ComponentFixture<UserSelectionScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSelectionScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
