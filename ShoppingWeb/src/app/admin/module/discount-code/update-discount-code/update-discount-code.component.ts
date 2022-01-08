import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DiscountCode } from 'src/app/model/discount-code';
import { MessageResponse } from 'src/app/response/message-response';
import { DiscountCodeService } from 'src/app/service/discount-code.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-discount-code',
  templateUrl: './update-discount-code.component.html',
  styleUrls: ['./update-discount-code.component.css']
})
export class UpdateDiscountCodeComponent implements OnInit {

  discountCode:DiscountCode | null = null;

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    discountCode: new FormControl('', [Validators.required]),
    discount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000000000)]),
  });

  constructor(
    protected discountCodeService: DiscountCodeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params['id']);
  }

  findById(id:any): void {
    this.discountCodeService.findById(id).subscribe(
      (res:HttpResponse<DiscountCode>) => {
        this.discountCode = res.body;
        if(this.discountCode) {
          this.updateForm(this.discountCode);
        }
      }
    );
  }

  get id() { return this.myForm.get('id'); }

  get getDiscountCode() { return this.myForm.get('discountCode'); }

  get discount() { return this.myForm.get('discount'); }

  updateForm(discountCode: DiscountCode): void {
    this.myForm.patchValue({
      id: discountCode.id,
      discountCode: discountCode.discountCode,
      discount: discountCode.discount
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.discountCodeService.update(this.myForm.value).subscribe(
      (response:HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Cập nhật mã giảm giá thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Cập nhật mã giảm giá không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }


}
