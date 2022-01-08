import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductModelComponent } from './list-product-model.component';

describe('ListProductModelComponent', () => {
  let component: ListProductModelComponent;
  let fixture: ComponentFixture<ListProductModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
