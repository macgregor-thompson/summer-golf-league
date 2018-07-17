import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardModalComponent } from './scorecard-modal.component';

describe('ScorecardModalComponent', () => {
  let component: ScorecardModalComponent;
  let fixture: ComponentFixture<ScorecardModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecardModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
