import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerpendicularServicesMockComponent } from './perpendicular-services-mock.component';

describe('PerpendicularServicesMockComponent', () => {
  let component: PerpendicularServicesMockComponent;
  let fixture: ComponentFixture<PerpendicularServicesMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerpendicularServicesMockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerpendicularServicesMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
