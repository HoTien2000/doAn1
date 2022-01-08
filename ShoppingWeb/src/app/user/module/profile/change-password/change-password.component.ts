import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageResponse } from 'src/app/response/message-response';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserSystemService } from 'src/app/service/user-system.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  submitted = false;
  message?: string;

  token: string = '';

  constructor(protected userSystemService: UserSystemService,
    private router: Router,
    private tokenStorageService: TokenStorageService,) { }

  myForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    newPassword: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  ngOnInit(): void {
  }

  get oldPassword() { return this.myForm.get('oldPassword'); }

  get newPassword() { return this.myForm.get('newPassword'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.userSystemService.changePassword(this.myForm.value).subscribe({
      next: (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if (this.message === 'success') {
          Swal.fire('Thông báo', 'Tạo mật khẩu mới thành công', 'success');
        } else if (this.message === 'incorrect') {
          Swal.fire('Thông báo', 'Mật khẩu cũ không đúng', 'error');
        } else if (this.message === 'failed') {
          Swal.fire('Thông báo', 'Đổi mật khẩu không thành công', 'error');
        }
      },
      error: () => {
        Swal.fire('Thông báo', 'Mật khẩu cũ không đúng', 'error');
      },
      // complete: () => {
        
      //   this.tokenStorageService.signOut();
      //   this.router.navigate(['/home/main']);
      //   window.location.reload();
      // }
    })
  }

  onBack(): void {
    window.history.back();
  }
}
