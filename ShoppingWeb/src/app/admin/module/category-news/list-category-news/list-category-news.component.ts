import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryNews } from 'src/app/model/category-news';
import { MessageResponse } from 'src/app/response/message-response';
import { CategoryNewsService } from 'src/app/service/category-news.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category-news',
  templateUrl: './list-category-news.component.html',
  styleUrls: ['./list-category-news.component.css']
})
export class ListCategoryNewsComponent implements OnInit {

  message?: string;
  id?:number;

  categoryNews?:CategoryNews[];

  constructor(protected categoryNewsService: CategoryNewsService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.categoryNewsService.findAll().subscribe(
      (res:HttpResponse<CategoryNews[]>) => {
        this.categoryNews = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.categoryNewsService.delete(this.id).subscribe(
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
