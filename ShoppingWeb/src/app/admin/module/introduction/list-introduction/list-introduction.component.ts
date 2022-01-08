import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Introduction } from 'src/app/model/introduction';
import { MessageResponse } from 'src/app/response/message-response';
import { IntroductionService } from 'src/app/service/introduction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-introduction',
  templateUrl: './list-introduction.component.html',
  styleUrls: ['./list-introduction.component.css']
})
export class ListIntroductionComponent implements OnInit {

  message?: string;
  id?:number;

  introductions?:Introduction[];

  constructor(protected introductionService: IntroductionService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.introductionService.findAll().subscribe(
      (res:HttpResponse<Introduction[]>) => {
        this.introductions = res.body || [];
      }
    )
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.introductionService.delete(this.id).subscribe(
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
