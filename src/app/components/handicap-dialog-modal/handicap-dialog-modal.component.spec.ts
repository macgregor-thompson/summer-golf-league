import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandicapDialogModalComponent } from './handicap-dialog-modal.component';

describe('HandicapDialogModalComponent', () => {
  let component: HandicapDialogModalComponent;
  let fixture: ComponentFixture<HandicapDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandicapDialogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandicapDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
