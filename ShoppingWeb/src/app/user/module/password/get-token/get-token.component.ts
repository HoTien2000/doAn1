import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/response/message-response';
import { PasswordResetTokenService } from 'src/app/service/password-reset-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-token',
  templateUrl: './get-token.component.html',
  styleUrls: ['./get-token.component.css']
})
export class GetTokenComponent implements OnInit {

  submitted = false;
  message?: string;

  constructor(protected passwordResetTokenService: PasswordResetTokenService) { }

  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
  }

  get emailUser() { return this.myForm.get('email'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.passwordResetTokenService.create(this.myForm.value).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Gửi email thành công, vui lòng kiểm tra hộp thư đến trong gmail của bạn', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Gửi email không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
