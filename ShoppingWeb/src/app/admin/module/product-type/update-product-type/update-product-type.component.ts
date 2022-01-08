import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductType } from 'src/app/model/product-type';
import { MessageResponse } from 'src/app/response/message-response';
import { ProductTypeService } from 'src/app/service/product-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product-type',
  templateUrl: './update-product-type.component.html',
  styleUrls: ['./update-product-type.component.css']
})
export class UpdateProductTypeComponent implements OnInit {

  productType:ProductType | null = null;

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    productTypeName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor( 
    protected productTypeService: ProductTypeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params['id']);
  }

  get id() { return this.myForm.get('id'); }

  get productTypeName() { return this.myForm.get('productTypeName'); }

  findById(id:any): void {
    this.productTypeService.findById(id).subscribe(
      (res:HttpResponse<ProductType>) => {
        this.productType = res.body;
        if(this.productType) {
          this.updateForm(this.productType);
        }
      }
    );
  }

  updateForm(productType: ProductType): void {
    this.myForm.patchValue({
      id: productType.id,
      productTypeName: productType.productTypeName
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.productTypeService.update(this.myForm.value).subscribe(
      (response:HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Cập nhật size thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Cập nhật size không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }


}
