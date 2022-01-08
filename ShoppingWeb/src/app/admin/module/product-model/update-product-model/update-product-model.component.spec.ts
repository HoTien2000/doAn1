import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductModelComponent } from './update-product-model.component';

describe('UpdateProductModelComponent', () => {
  let component: UpdateProductModelComponent;
  let fixture: ComponentFixture<UpdateProductModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProductModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
