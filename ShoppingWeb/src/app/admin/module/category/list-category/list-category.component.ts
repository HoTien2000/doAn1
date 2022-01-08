import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { MessageResponse } from 'src/app/response/message-response';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  message?: string;
  id?:number;

  categories?:Category[];

  constructor(protected categoryService: CategoryService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.categoryService.findAll().subscribe(
      (res:HttpResponse<Category[]>) => {
        this.categories = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.categoryService.delete(this.id).subscribe(
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
