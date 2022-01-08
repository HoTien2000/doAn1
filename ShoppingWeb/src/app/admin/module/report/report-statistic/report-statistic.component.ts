import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StatisticDTO } from 'src/app/dto/statistic-dto';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-report-statistic',
  templateUrl: './report-statistic.component.html',
  styleUrls: ['./report-statistic.component.css'],
  providers: [DatePipe]
})
export class ReportStatisticComponent implements OnInit {

  date = new Date();
  startDate = this.datePipe.transform(new Date(this.date.getFullYear(), this.date.getMonth(), 1), 'yyyy-MM-dd') || '';
  endDate = this.datePipe.transform(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0), 'yyyy-MM-dd') || '';

  statisticDTO: StatisticDTO | null = null;

  constructor(protected datePipe: DatePipe,
    protected paymentService: PaymentService) { }

  ngOnInit(): void {
    this.repostStatistic();
  }

  repostStatistic(): void {
    this.paymentService.repostStistic({startDate: this.startDate, endDate: this.endDate}).subscribe(
      (res: HttpResponse<StatisticDTO>) => {
        this.statisticDTO = res.body;
      }
    )
  }

}
