import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGridComponent } from './product-grid.component';
import { MocksModule } from '../../../mocks/mocks.module';

describe('ProductGridComponent', () => {
  let component: ProductGridComponent;
  let fixture: ComponentFixture<ProductGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MocksModule ],
      declarations: [ ProductGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
