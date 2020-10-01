import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerpendicularModelsWcsComponent } from './perpendicular-models-wcs.component';

describe('PerpendicularModelsWcsComponent', () => {
  let component: PerpendicularModelsWcsComponent;
  let fixture: ComponentFixture<PerpendicularModelsWcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerpendicularModelsWcsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerpendicularModelsWcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
