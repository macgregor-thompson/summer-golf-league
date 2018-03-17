import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandicapModalComponent } from './handicap-modal.component';

describe('HandicapModalComponent', () => {
  let component: HandicapModalComponent;
  let fixture: ComponentFixture<HandicapModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandicapModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandicapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
