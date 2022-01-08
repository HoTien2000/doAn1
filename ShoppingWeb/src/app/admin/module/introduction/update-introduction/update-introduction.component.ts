import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Introduction } from 'src/app/model/introduction';
import { MessageResponse } from 'src/app/response/message-response';
import { IntroductionService } from 'src/app/service/introduction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-introduction',
  templateUrl: './update-introduction.component.html',
  styleUrls: ['./update-introduction.component.css']
})
export class UpdateIntroductionComponent implements OnInit {

  introduction:Introduction | null = null;

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required, Validators.maxLength(4000)]),
  });

  constructor( 
    protected introductionService: IntroductionService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params['id']);
  }

  get id() { return this.myForm.get('id'); }

  get content() { return this.myForm.get('content'); }

  findById(id:any): void {
    this.introductionService.findById(id).subscribe(
      (res:HttpResponse<Introduction>) => {
        this.introduction = res.body;
        if(this.introduction) {
          this.updateForm(this.introduction);
        }
      }
    );
  }

  updateForm(introduction: Introduction): void {
    this.myForm.patchValue({
      id: introduction.id,
      content: introduction.content
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.introductionService.update(this.myForm.value).subscribe(
      (response:HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Cập nhật thông tin giới thiệu thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Cập nhật thông tin giói thiệu không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }


}
