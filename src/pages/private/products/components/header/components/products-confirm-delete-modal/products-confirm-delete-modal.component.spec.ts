import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsConfirmDeleteModalComponent } from '@private/products/components/header/components/products-confirm-delete-modal/products-confirm-delete-modal.component';

describe('ProductsConfirmDeleteModalComponent', () => {
  let fixture: ComponentFixture<ProductsConfirmDeleteModalComponent>;
  let component: ProductsConfirmDeleteModalComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [ProductsConfirmDeleteModalComponent],
    });

    fixture = TestBed.createComponent(ProductsConfirmDeleteModalComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
