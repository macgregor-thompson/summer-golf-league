import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingsDashboardComponent } from './rankings-dashboard.component';

describe('RankingsDashboardComponent', () => {
  let component: RankingsDashboardComponent;
  let fixture: ComponentFixture<RankingsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
