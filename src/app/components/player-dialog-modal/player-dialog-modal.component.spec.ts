import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDialogModalComponent } from './player-dialog-modal.component';

describe('PlayerDialogModalComponent', () => {
  let component: PlayerDialogModalComponent;
  let fixture: ComponentFixture<PlayerDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDialogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
