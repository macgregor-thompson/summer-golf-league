import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardBetterBallComponent } from './scorecard-better-ball.component';

describe('ScorecardBetterBallComponent', () => {
  let component: ScorecardBetterBallComponent;
  let fixture: ComponentFixture<ScorecardBetterBallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecardBetterBallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardBetterBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
