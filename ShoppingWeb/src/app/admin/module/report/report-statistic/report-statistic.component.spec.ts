import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStatisticComponent } from './report-statistic.component';

describe('ReportStatisticComponent', () => {
  let component: ReportStatisticComponent;
  let fixture: ComponentFixture<ReportStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
