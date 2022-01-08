import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/model/product-type';
import { MessageResponse } from 'src/app/response/message-response';
import { ProductTypeService } from 'src/app/service/product-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product-type',
  templateUrl: './list-product-type.component.html',
  styleUrls: ['./list-product-type.component.css']
})
export class ListProductTypeComponent implements OnInit {

  message?: string;
  id?:number;

  productTypes?:ProductType[];

  constructor(protected productTypeService: ProductTypeService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.productTypeService.findAll().subscribe(
      (res:HttpResponse<ProductType[]>) => {
        this.productTypes = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.productTypeService.delete(this.id).subscribe(
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
