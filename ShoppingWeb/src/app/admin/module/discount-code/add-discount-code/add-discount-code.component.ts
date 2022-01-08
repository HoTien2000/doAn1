import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/response/message-response';
import { DiscountCodeService } from 'src/app/service/discount-code.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-discount-code',
  templateUrl: './add-discount-code.component.html',
  styleUrls: ['./add-discount-code.component.css']
})
export class AddDiscountCodeComponent implements OnInit {

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    quantity: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
    discount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000000000)]),
  });

  constructor(protected discountCodeService: DiscountCodeService) { }

  ngOnInit(): void {
  }

  get quantity() { return this.myForm.get('quantity'); }

  get discount() { return this.myForm.get('discount'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    formData.append('quantity', JSON.stringify(this.myForm.value.quantity));
    formData.append('discount', JSON.stringify(this.myForm.value.discount));

    this.discountCodeService.create(formData).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Tạo mã giảm giá thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Tạo mã giảm giá không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }


}
