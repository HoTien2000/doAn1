import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PasswordResetToken } from 'src/app/model/password-reset-token';
import { MessageResponse } from 'src/app/response/message-response';
import { PasswordResetTokenService } from 'src/app/service/password-reset-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-token',
  templateUrl: './list-token.component.html',
  styleUrls: ['./list-token.component.css']
})
export class ListTokenComponent implements OnInit {

  message?: string;
  id?:number;

  passwordResetTokens?:PasswordResetToken[];

  constructor(protected passwordResetTokenService: PasswordResetTokenService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.passwordResetTokenService.findAll().subscribe(
      (res:HttpResponse<PasswordResetToken[]>) => {
        this.passwordResetTokens = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.passwordResetTokenService.delete(this.id).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message || '';

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Xóa thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Xóa không thành công', 'error');
        }
        
        this.findAll()
      }
    )
  }

  deleteAll(): void {
    this.passwordResetTokenService.deleteAll().subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message || '';

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Xóa thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Xóa không thành công', 'error');
        }
        
        this.findAll()
      }
    )
  }

}
