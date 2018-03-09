import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandicapLookupComponent } from './handicap-lookup.component';

describe('HandicapLookupComponent', () => {
  let component: HandicapLookupComponent;
  let fixture: ComponentFixture<HandicapLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandicapLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandicapLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
