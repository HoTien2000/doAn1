import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIntroductionComponent } from './update-introduction.component';

describe('UpdateIntroductionComponent', () => {
  let component: UpdateIntroductionComponent;
  let fixture: ComponentFixture<UpdateIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIntroductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
