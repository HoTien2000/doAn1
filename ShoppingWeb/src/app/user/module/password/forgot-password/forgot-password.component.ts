import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordDTO } from 'src/app/dto/reset-password-dto';
import { MessageResponse } from 'src/app/response/message-response';
import { PasswordResetTokenService } from 'src/app/service/password-reset-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  submitted = false;
  message?: string;

  token: string = '';

  constructor(protected passwordResetTokenService: PasswordResetTokenService,
    private route: ActivatedRoute,
    private router: Router) { }

  myForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    confirm: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  get password() { return this.myForm.get('password'); }

  get confirm() { return this.myForm.get('confirm'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    let resetPasswordDTO: ResetPasswordDTO = {
      token: this.token,
      password: this.myForm.value.password,
      confirm: this.myForm.value.confirm,
    }

    this.passwordResetTokenService.ressetPassword(resetPasswordDTO).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Tạo mật khẩu mới thành công', 'success');
          this.router.navigate(['/home/main']);
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Tạo mật khẩu mới không thành công', 'error');
        } else if(this.message === 'notequals') {
          Swal.fire('Thông báo', 'Nhập lại mật khẩu không khớp', 'error');
        } else if(this.message === 'timeout') {
          Swal.fire('Thông báo', 'Đã hết thời gian thay đổi mật khẩu', 'error');
        }
      }
    )
  }
}
