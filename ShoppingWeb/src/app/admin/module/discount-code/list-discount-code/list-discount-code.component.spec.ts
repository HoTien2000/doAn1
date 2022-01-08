import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiscountCodeComponent } from './list-discount-code.component';

describe('ListDiscountCodeComponent', () => {
  let component: ListDiscountCodeComponent;
  let fixture: ComponentFixture<ListDiscountCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDiscountCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDiscountCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
