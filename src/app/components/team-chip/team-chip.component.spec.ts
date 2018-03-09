import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamChipComponent } from './team-chip.component';

describe('TeamChipComponent', () => {
  let component: TeamChipComponent;
  let fixture: ComponentFixture<TeamChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
