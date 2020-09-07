import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTileComponent } from './product-tile.component';
import { MocksModule } from '../../../mocks/mocks.module';

describe('ProductTileComponent', () => {
  let component: ProductTileComponent;
  let fixture: ComponentFixture<ProductTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MocksModule ],
      declarations: [ ProductTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
