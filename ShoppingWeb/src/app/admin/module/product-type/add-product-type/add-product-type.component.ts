import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/response/message-response';
import { ProductTypeService } from 'src/app/service/product-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    productTypeName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor(protected productTypeService: ProductTypeService) { }

  ngOnInit(): void {
  }

  get productTypeName() { return this.myForm.get('productTypeName'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.productTypeService.create(this.myForm.value).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Thêm màu thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Thêm màu không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }


}
