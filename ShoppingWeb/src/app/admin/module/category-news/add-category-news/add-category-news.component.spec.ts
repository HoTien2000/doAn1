import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryNewsComponent } from './add-category-news.component';

describe('AddCategoryNewsComponent', () => {
  let component: AddCategoryNewsComponent;
  let fixture: ComponentFixture<AddCategoryNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoryNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
