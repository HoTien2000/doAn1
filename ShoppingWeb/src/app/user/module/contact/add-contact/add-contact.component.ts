import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MessageResponse } from 'src/app/response/message-response';
import { ContactService } from 'src/app/service/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit, OnDestroy {

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fullName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}')]),
    content: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
  });

  constructor(protected cotactService: ContactService, 
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Liên hệ');
  }

  ngOnDestroy(): void {
    this.title.setTitle('Trang chủ');
  }

  get emailUser() { return this.myForm.get('email'); }

  get fullName() { return this.myForm.get('fullName'); }

  get phone() { return this.myForm.get('phone'); }

  get content() { return this.myForm.get('content'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.cotactService.create(this.myForm.value).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Gửi liên hệ thành công thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Gửi liên hệ không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
