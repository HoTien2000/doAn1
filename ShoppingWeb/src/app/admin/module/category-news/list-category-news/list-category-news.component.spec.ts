import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryNewsComponent } from './list-category-news.component';

describe('ListCategoryNewsComponent', () => {
  let component: ListCategoryNewsComponent;
  let fixture: ComponentFixture<ListCategoryNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategoryNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoryNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
