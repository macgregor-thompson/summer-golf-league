import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresDashboardComponent } from './scores-dashboard.component';

describe('ScoresDashboardComponent', () => {
  let component: ScoresDashboardComponent;
  let fixture: ComponentFixture<ScoresDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoresDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
