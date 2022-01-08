import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { MessageResponse } from 'src/app/response/message-response';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  message?: string;
  id?:number;

  products?:Product[];
  categories?: Category[];

  productName = '';
  categoryId = '';
  sale = '';

  constructor(protected productService: ProductService, 
    protected cateoryService: CategoryService) { }

  ngOnInit(): void {
    this.findCategory();
    this.findAll();
  }

  findCategory(): void {
    this.cateoryService.findByCategory().subscribe(
      (res:HttpResponse<Category[]>) => {
        this.categories = res.body || [];
      }
    )
  }

  findAll(): void {
    this.productService.findAll().subscribe(
      (res: HttpResponse<Product[]>) => {
        this.products = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.productService.delete(this.id).subscribe(
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

  onSearch(): void {
    this.productService.search({productName: this.productName, categoryId: this.categoryId, sale: this.sale}).subscribe(
      (res: HttpResponse<Product[]>) => {
        this.products = res.body || [];
      }
    )
  }

}
