import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerpendicularAnalyticsComponent } from './perpendicular-analytics.component';

describe('PerpendicularAnalyticsComponent', () => {
  let component: PerpendicularAnalyticsComponent;
  let fixture: ComponentFixture<PerpendicularAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerpendicularAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerpendicularAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
