import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemsCountComponent } from './cart-items-count.component';

describe('CartItemsCountComponent', () => {
  let component: CartItemsCountComponent;
  let fixture: ComponentFixture<CartItemsCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartItemsCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
