import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { MessageResponse } from 'src/app/response/message-response';
import { PaymentService } from 'src/app/service/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
  providers: [DatePipe]
})
export class ListOrderComponent implements OnInit {

  message?: string;
  id?:number;
  idBack?: number;

  payments?: Payment[];

  // dateCreate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
  lastUpdate = '';
  status = -1;

  constructor(protected paymentService: PaymentService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.paymentService.findAll().subscribe(
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
          Swal.fire('Thông báo', 'Hủy đơn hàng không thành công', 'error');
        }
        
        this.findAll()
      }
    )
  }

  onApproveOrder(id: any, status: any): void {
    const formData: FormData = new FormData();

    formData.append("id", id);
    formData.append("status", status);

    this.paymentService.statusOrder(formData).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message || '';

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Xác nhận đơn hàng thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Xác nhận đơn hàng không thành công', 'error');
        }
        
        this.findAll()
      }
    )
  }

  onShipping(id: any, status: any): void {
    const formData: FormData = new FormData();

    formData.append("id", id);
    formData.append("status", status);

    this.paymentService.statusOrder(formData).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message || '';

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Vận chuyển đơn hàng thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Vận chuyển đơn hàng không thành công', 'error');
        }
        
        this.findAll()
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
          Swal.fire('Thông báo', 'Giao hàng thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Giao hàng không thành công', 'error');
        }
        
        this.findAll()
      }
    )
  }

  onBackOrder(id: any): void {
    this.idBack = id;
  }

  confirmBackOrder(): void {
    this.paymentService.delete(this.idBack).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message || '';

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Hoàn trả đơn hàng thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Hoàn trả đơn hàng không thành công', 'error');
        }
        
        this.findAll()
      }
    )
  }

  onSearch(): void {
    this.paymentService.search({lastUpdate: this.lastUpdate, status: this.status}).subscribe(
      (res: HttpResponse<Payment[]>) => {
        this.payments = res.body || [];
      }
    )
  }
}
