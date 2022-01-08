import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { MessageResponse } from 'src/app/response/message-response';
import { PaymentService } from 'src/app/service/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  message?: string;
  id?:number;

  payments?: Payment[];

  constructor(protected paymentService: PaymentService) { }

  ngOnInit(): void {
    this.findByUser();
  }

  findByUser(): void {
    this.paymentService.findByUserSystem().subscribe(
      (res: HttpResponse<Payment[]>) => {
        this.payments = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.paymentService.delete(this.id).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message || '';

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Hủy đơn hàng thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Hủy đơn hàng thành công', 'error');
        }
        
        this.findByUser();
      }
    )
  }

  onSuccess(id: any, status: any): void {
    const formData: FormData = new FormData();

    formData.append("id", id);
    formData.append("status", status);

    this.paymentService.statusOrder(formData).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message || '';

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Nhận hàng thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Nhận hàng không thành công', 'error');
        }
        
        this.findByUser()
      }
    )
  }

}
