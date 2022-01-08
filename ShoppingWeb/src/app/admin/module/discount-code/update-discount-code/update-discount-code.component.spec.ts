import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiscountCodeComponent } from './update-discount-code.component';

describe('UpdateDiscountCodeComponent', () => {
  let component: UpdateDiscountCodeComponent;
  let fixture: ComponentFixture<UpdateDiscountCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDiscountCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDiscountCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
