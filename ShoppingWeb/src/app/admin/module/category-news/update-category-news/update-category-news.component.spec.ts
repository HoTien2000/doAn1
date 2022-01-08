import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryNewsComponent } from './update-category-news.component';

describe('UpdateCategoryNewsComponent', () => {
  let component: UpdateCategoryNewsComponent;
  let fixture: ComponentFixture<UpdateCategoryNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCategoryNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCategoryNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
