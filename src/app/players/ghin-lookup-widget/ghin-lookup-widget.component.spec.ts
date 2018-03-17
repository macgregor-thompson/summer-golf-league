import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhinLookupWidgetComponent } from './ghin-lookup-widget.component';

describe('GhinLookupWidgetComponent', () => {
  let component: GhinLookupWidgetComponent;
  let fixture: ComponentFixture<GhinLookupWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhinLookupWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhinLookupWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
