import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShippingFeeComponent } from './list-shipping-fee.component';

describe('ListShippingFeeComponent', () => {
  let component: ListShippingFeeComponent;
  let fixture: ComponentFixture<ListShippingFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListShippingFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListShippingFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
