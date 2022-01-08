import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIntroductionComponent } from './list-introduction.component';

describe('ListIntroductionComponent', () => {
  let component: ListIntroductionComponent;
  let fixture: ComponentFixture<ListIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIntroductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
