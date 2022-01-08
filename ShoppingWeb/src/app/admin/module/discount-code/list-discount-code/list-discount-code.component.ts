import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DiscountCode } from 'src/app/model/discount-code';
import { MessageResponse } from 'src/app/response/message-response';
import { DiscountCodeService } from 'src/app/service/discount-code.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-discount-code',
  templateUrl: './list-discount-code.component.html',
  styleUrls: ['./list-discount-code.component.css']
})
export class ListDiscountCodeComponent implements OnInit {

  message?: string;
  id?:number;

  discountCodes?:DiscountCode[];

  constructor(protected discountCodeService: DiscountCodeService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.discountCodeService.findAll().subscribe(
      (res:HttpResponse<DiscountCode[]>) => {
        this.discountCodes = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.discountCodeService.delete(this.id).subscribe(
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
