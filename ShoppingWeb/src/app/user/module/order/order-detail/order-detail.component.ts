import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/model/payment';
import { ProductPayment } from 'src/app/model/product-payment';
import { PaymentService } from 'src/app/service/payment.service';
import { ProductPaymentService } from 'src/app/service/product-payment.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  payment: Payment | null = null;
  productPayments?:ProductPayment[];

  constructor(protected productPaymentService: ProductPaymentService,
    protected paymentService: PaymentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findPayment(this.route.snapshot.params['id']);
  }

  findPayment(id: any): void {
    this.paymentService.findById(id).subscribe(
      (res: HttpResponse<Payment>) => {
        this.payment = res.body;

        if(this.payment) {
          this.findByPayment(this.payment.id);
        }
      }
    )
  }

  findByPayment(id: any): void {
    this.productPaymentService.findByPayment({id: id}).subscribe(
      (res: HttpResponse<ProductPayment[]>) => {
        this.productPayments = res.body || [];
      }
    )
  }

}
