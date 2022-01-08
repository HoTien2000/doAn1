import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShippingFee } from 'src/app/model/shipping-fee';
import { MessageResponse } from 'src/app/response/message-response';
import { ShippingFeeService } from 'src/app/service/shipping-fee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-shipping-fee',
  templateUrl: './update-shipping-fee.component.html',
  styleUrls: ['./update-shipping-fee.component.css']
})
export class UpdateShippingFeeComponent implements OnInit {

  shippingFee:ShippingFee | null = null;

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    shippingFee: new FormControl('', [Validators.required, Validators.max(1000000000), Validators.min(0)]),
  });

  constructor(
    protected shippingFeeService: ShippingFeeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'])
    this.findById(this.route.snapshot.params['id']);
  }

  get id() { return this.myForm.get('id'); }

  get address() { return this.myForm.get('address'); }

  get getShippingFee() { return this.myForm.get('shippingFee'); }

  findById(id:any): void {
    this.shippingFeeService.findById(id).subscribe(
      (res:HttpResponse<ShippingFee>) => {
        this.shippingFee = res.body;
        if(this.shippingFee) {
          this.updateForm(this.shippingFee);
        }
      }
    );
  }

  updateForm(shippingFee: ShippingFee): void {
    this.myForm.patchValue({
      id: shippingFee.id,
      address: shippingFee.address,
      shippingFee: shippingFee.shippingFee
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.shippingFeeService.update(this.myForm.value).subscribe(
      (response:HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Cập nhật phí vận chuyển thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Cập nhật phí vận chuiyển không thành công', 'error');
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
