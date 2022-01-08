import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/model/news';
import { MessageResponse } from 'src/app/response/message-response';
import { NewsService } from 'src/app/service/news.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {

  message?: string;
  id?:number;

  news?:News[];

  constructor(protected newsService: NewsService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.newsService.findAll().subscribe(
      (res: HttpResponse<News[]>) => {
        this.news = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.newsService.delete(this.id).subscribe(
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
