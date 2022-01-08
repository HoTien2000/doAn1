import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/model/product-model';
import { MessageResponse } from 'src/app/response/message-response';
import { ProductModelService } from 'src/app/service/product-model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product-model',
  templateUrl: './list-product-model.component.html',
  styleUrls: ['./list-product-model.component.css']
})
export class ListProductModelComponent implements OnInit {

  message?: string;
  id?:number;

  productModels?:ProductModel[];

  constructor(protected productModelService: ProductModelService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.productModelService.findAll().subscribe(
      (res:HttpResponse<ProductModel[]>) => {
        this.productModels = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.productModelService.delete(this.id).subscribe(
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
