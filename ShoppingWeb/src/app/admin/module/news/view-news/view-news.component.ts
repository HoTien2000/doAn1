import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/model/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.css']
})
export class ViewNewsComponent implements OnInit {

  news:News | null = null;

  constructor(
    protected newsService: NewsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params['id']);
  }

  findById(id:any): void {
    this.newsService.findById(id).subscribe(
      (res: HttpResponse<News>) => {
        this.news = res.body;
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
