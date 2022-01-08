import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/response/message-response';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor(protected categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  get categoryName() { return this.myForm.get('categoryName'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.categoryService.create(this.myForm.value).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Thêm danh mục sản phẩm thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Thêm danh mục sản phẩm không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
