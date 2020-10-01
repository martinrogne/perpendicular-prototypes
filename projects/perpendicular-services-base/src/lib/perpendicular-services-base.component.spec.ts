import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerpendicularServicesBaseComponent } from './perpendicular-services-base.component';

describe('PerpendicularServicesBaseComponent', () => {
  let component: PerpendicularServicesBaseComponent;
  let fixture: ComponentFixture<PerpendicularServicesBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerpendicularServicesBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerpendicularServicesBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
