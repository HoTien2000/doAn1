import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ViewPostDTO } from 'src/app/dto/view-post-dto';
import { News } from 'src/app/model/news';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit, OnDestroy {

  viewPostDTO: ViewPostDTO | null = null;
  news: News | null = null;
  newPosts?: News[];
  relatedPosts?: News[];

  constructor(
    protected newsService: NewsService,
    private route: ActivatedRoute,
    private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Tin tức');
    
    this.viewPost(this.route.snapshot.params['id']);
  }

  ngOnDestroy(): void {
    this.title.setTitle('Trang chủ');
  }

  viewPost(id: any): void {
    this.newsService.viewPost(id).subscribe(
      (res: HttpResponse<ViewPostDTO>) => {
        this.viewPostDTO = res.body;

        if (this.viewPostDTO) {
          this.news = this.viewPostDTO.news || null;
          this.newPosts = this.viewPostDTO.fiveBestNew || [];
          this.relatedPosts = this.viewPostDTO.related || [];
        }
      }
    )
  }

  onRouter(id: any): void {
    this.viewPost(id);
  }
}
