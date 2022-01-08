import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ShippingFee } from 'src/app/model/shipping-fee';
import { MessageResponse } from 'src/app/response/message-response';
import { ShippingFeeService } from 'src/app/service/shipping-fee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-shipping-fee',
  templateUrl: './list-shipping-fee.component.html',
  styleUrls: ['./list-shipping-fee.component.css']
})
export class ListShippingFeeComponent implements OnInit {

  message?: string;
  id?:number;

  shippingFees?:ShippingFee[];

  constructor(protected shippingFeeService: ShippingFeeService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.shippingFeeService.findAll().subscribe(
      (res:HttpResponse<ShippingFee[]>) => {
        this.shippingFees = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.shippingFeeService.delete(this.id).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message || '';

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Xóa thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Xóa không thành công', 'error');
        }
        
        this.findAll()
      }
    )
  }

}
