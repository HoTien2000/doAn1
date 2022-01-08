import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/response/message-response';
import { ShippingFeeService } from 'src/app/service/shipping-fee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-shipping-fee',
  templateUrl: './add-shipping-fee.component.html',
  styleUrls: ['./add-shipping-fee.component.css']
})
export class AddShippingFeeComponent implements OnInit {

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    shippingFee: new FormControl('', [Validators.required, Validators.max(1000000000), Validators.min(0)]),
  });

  constructor(protected shippingFeeService: ShippingFeeService) { }

  ngOnInit(): void {
  }

  get address() { return this.myForm.get('address'); }

  get shippingFee() { return this.myForm.get('shippingFee'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.shippingFeeService.create(this.myForm.value).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Tạo phí vận chuyển thành thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Tạo phí vận chuyển không thành công', 'error');
        } else if(this.message === 'addressExisted') {
          Swal.fire('Thông báo', 'Bạn đã tạo phí vận chuyển cho địa chỉ này', 'error');
        } 
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
