import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIntroductionComponent } from './view-introduction.component';

describe('ViewIntroductionComponent', () => {
  let component: ViewIntroductionComponent;
  let fixture: ComponentFixture<ViewIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIntroductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
