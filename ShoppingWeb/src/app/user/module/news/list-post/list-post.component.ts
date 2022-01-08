import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { News } from 'src/app/model/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit, OnDestroy {

  news?:News[];

  constructor(protected newsService: NewsService,
    private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle('Tin tức');

    this.findByAll();
  }

  ngOnDestroy(): void {
    this.title.setTitle('Trang chủ');
}

  findByAll(): void {
    this.newsService.findByAll().subscribe(
      (res: HttpResponse<News[]>) => {
        this.news = res.body || [];
      }
    )
  }

}
