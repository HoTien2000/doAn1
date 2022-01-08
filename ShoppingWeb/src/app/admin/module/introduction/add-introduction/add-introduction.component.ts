import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/response/message-response';
import { IntroductionService } from 'src/app/service/introduction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-introduction',
  templateUrl: './add-introduction.component.html',
  styleUrls: ['./add-introduction.component.css']
})
export class AddIntroductionComponent implements OnInit {

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(4000)]),
  });

  constructor(protected introductionService: IntroductionService) { }

  ngOnInit(): void {
  }

  get content() { return this.myForm.get('content'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.introductionService.create(this.myForm.value).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Tạo giới thiệu thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Tạo giới thiệu không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
