import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageResponse } from 'src/app/response/message-response';
import { ProductModelService } from 'src/app/service/product-model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product-model',
  templateUrl: './add-product-model.component.html',
  styleUrls: ['./add-product-model.component.css']
})
export class AddProductModelComponent implements OnInit {

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    productModelName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor(protected productModelService: ProductModelService) { }

  ngOnInit(): void {
  }

  get productModelName() { return this.myForm.get('productModelName'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.productModelService.create(this.myForm.value).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Thêm size thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Thêm size không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
