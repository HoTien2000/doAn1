import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShippingFeeComponent } from './update-shipping-fee.component';

describe('UpdateShippingFeeComponent', () => {
  let component: UpdateShippingFeeComponent;
  let fixture: ComponentFixture<UpdateShippingFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateShippingFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateShippingFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
