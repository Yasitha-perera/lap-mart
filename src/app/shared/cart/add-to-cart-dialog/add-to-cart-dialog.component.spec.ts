import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartDialogComponent } from './add-to-cart-dialog.component';

describe('AddToCartDialogComponent', () => {
  let component: AddToCartDialogComponent;
  let fixture: ComponentFixture<AddToCartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToCartDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
