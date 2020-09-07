import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetsComponent } from './facets.component';
import { MocksModule } from '../../../mocks/mocks.module';

describe('FacetsComponent', () => {
  let component: FacetsComponent;
  let fixture: ComponentFixture<FacetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MocksModule ],
      declarations: [ FacetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
