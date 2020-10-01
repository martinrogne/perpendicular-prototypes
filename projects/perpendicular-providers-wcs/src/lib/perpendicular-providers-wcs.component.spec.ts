import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerpendicularProvidersWcsComponent } from './perpendicular-providers-wcs.component';

describe('PerpendicularProvidersWcsComponent', () => {
  let component: PerpendicularProvidersWcsComponent;
  let fixture: ComponentFixture<PerpendicularProvidersWcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerpendicularProvidersWcsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerpendicularProvidersWcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
