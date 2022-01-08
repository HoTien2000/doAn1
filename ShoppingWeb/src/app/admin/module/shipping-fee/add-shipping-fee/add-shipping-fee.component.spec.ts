import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingFeeComponent } from './add-shipping-fee.component';

describe('AddShippingFeeComponent', () => {
  let component: AddShippingFeeComponent;
  let fixture: ComponentFixture<AddShippingFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShippingFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShippingFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
