import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockHeaderComponent } from './block-header.component';

describe('BlockHeaderComponent', () => {
  let component: BlockHeaderComponent;
  let fixture: ComponentFixture<BlockHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
