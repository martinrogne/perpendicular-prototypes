import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerpendicularCoreComponent } from './perpendicular-core.component';

describe('PerpendicularCoreComponent', () => {
  let component: PerpendicularCoreComponent;
  let fixture: ComponentFixture<PerpendicularCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerpendicularCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerpendicularCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
