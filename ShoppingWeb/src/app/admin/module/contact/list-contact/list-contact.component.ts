import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { MessageResponse } from 'src/app/response/message-response';
import { ContactService } from 'src/app/service/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  message?: string;
  id?:number;

  contacts?:Contact[];

  constructor(protected contactService: ContactService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.contactService.findAll().subscribe(
      (res:HttpResponse<Contact[]>) => {
        this.contacts = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.contactService.delete(this.id).subscribe(
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
