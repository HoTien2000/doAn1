import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Introduction } from 'src/app/model/introduction';
import { IntroductionService } from 'src/app/service/introduction.service';

@Component({
  selector: 'app-view-introduction',
  templateUrl: './view-introduction.component.html',
  styleUrls: ['./view-introduction.component.css']
})
export class ViewIntroductionComponent implements OnInit, OnDestroy {

  introductions?: Introduction[];

  constructor(protected introductionService: IntroductionService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Giới thiệu');

    this.findAll();
  }

  ngOnDestroy(): void {
    this.title.setTitle('Trang chủ');
  }

  findAll(): void {
    this.introductionService.findByAll().subscribe(
      (res: HttpResponse<Introduction[]>) => {
        this.introductions = res.body || [];
      }
    )
  }

}
