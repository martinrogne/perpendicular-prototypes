import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerpendicularFactoriesWcsComponent } from './perpendicular-factories-wcs.component';

describe('PerpendicularFactoriesWcsComponent', () => {
  let component: PerpendicularFactoriesWcsComponent;
  let fixture: ComponentFixture<PerpendicularFactoriesWcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerpendicularFactoriesWcsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerpendicularFactoriesWcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
