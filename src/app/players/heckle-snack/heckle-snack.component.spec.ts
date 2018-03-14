import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeckleSnackComponent } from './heckle-snack.component';

describe('HeckleSnackComponent', () => {
  let component: HeckleSnackComponent;
  let fixture: ComponentFixture<HeckleSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeckleSnackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeckleSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
