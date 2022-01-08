import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntroductionComponent } from './add-introduction.component';

describe('AddIntroductionComponent', () => {
  let component: AddIntroductionComponent;
  let fixture: ComponentFixture<AddIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIntroductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
