import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryNews } from 'src/app/model/category-news';
import { News } from 'src/app/model/news';
import { MessageResponse } from 'src/app/response/message-response';
import { CategoryNewsService } from 'src/app/service/category-news.service';
import { NewsService } from 'src/app/service/news.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  submitted = false;
  message?:string;

  currentFile?: File;
  imagePath: any;
  imgURL: any;

  categoryNews?:CategoryNews[];

  myForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    content: new FormControl('', [Validators.required, Validators.maxLength(4000)]),
    image: new FormControl('', [Validators.required]),
    rootLink: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    categoryNewsId: new FormControl('', [Validators.required])
  });

  constructor(
    protected newsService: NewsService,
    protected categoryNewsService: CategoryNewsService) { }

  ngOnInit(): void {
    this.findAllCategoryNews();
  }

  get title() { return this.myForm.get('title'); }

  get content() { return this.myForm.get('content'); }

  get image() { return this.myForm.get('image'); }

  get rootLink() { return this.myForm.get('rootLink'); }

  get categoryNewsId() { return this.myForm.get('categoryNewsId'); }

  findAllCategoryNews(): void {
    this.categoryNewsService.findAll().subscribe(
      (res:HttpResponse<CategoryNews[]>) => {
        this.categoryNews = res.body || [];
      }
    )
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);

    if (this.currentFile) {
      const sizeFile = this.currentFile.size;

      

      if (sizeFile > 1000000) {
        Swal.fire('Thông báo', 'Kích thước ảnh quá lớn', 'warning');
        this.myForm.get("image")?.setValue("");
      } else {
        const reader = new FileReader();

        this.imagePath = this.currentFile;
        reader.readAsDataURL(this.currentFile);
        reader.onload = () => {
          this.imgURL = reader.result;
        };
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    let news:News = {
      title: this.myForm.value.title,
      content: this.myForm.value.content,
      rootLink: this.myForm.value.rootLink
    }

    const formData: FormData = new FormData();

    if (this.currentFile) {
      formData.append('file', this.currentFile);
    }

    formData.append('categoryNewsId', JSON.stringify(this.myForm.value.categoryNewsId))
    formData.append('news', JSON.stringify(news))

    this.newsService.create(formData).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Thêm tin tức thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Thêm tin tức không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
