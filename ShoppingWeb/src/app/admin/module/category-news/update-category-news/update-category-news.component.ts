import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryNews } from 'src/app/model/category-news';
import { MessageResponse } from 'src/app/response/message-response';
import { CategoryNewsService } from 'src/app/service/category-news.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category-news',
  templateUrl: './update-category-news.component.html',
  styleUrls: ['./update-category-news.component.css']
})
export class UpdateCategoryNewsComponent implements OnInit {

  categoryNews:CategoryNews | null = null;

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    categoryName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor(
    protected categoryNewsService: CategoryNewsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params['id']);
  }

  findById(id:any): void {
    this.categoryNewsService.findById(id).subscribe(
      (res:HttpResponse<CategoryNews>) => {
        this.categoryNews = res.body;
        if(this.categoryNews) {
          this.updateForm(this.categoryNews);
        }
      }
    );
  }

  get id() { return this.myForm.get('id'); }

  get categoryName() { return this.myForm.get('categoryName'); }

  updateForm(categoryNews: CategoryNews): void {
    this.myForm.patchValue({
      id: categoryNews.id,
      categoryName: categoryNews.categoryName
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.categoryNewsService.update(this.myForm.value).subscribe(
      (response:HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Cập nhật danh mục tin tức thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Cập nhật danh mục tin tức không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }


}
