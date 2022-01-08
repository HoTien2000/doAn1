import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/model/product-model';
import { MessageResponse } from 'src/app/response/message-response';
import { ProductModelService } from 'src/app/service/product-model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product-model',
  templateUrl: './update-product-model.component.html',
  styleUrls: ['./update-product-model.component.css']
})
export class UpdateProductModelComponent implements OnInit {

  productModel:ProductModel | null = null;

  submitted = false;
  message?:string;

  myForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    productModelName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor( 
    protected productModelService: ProductModelService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params['id']);
  }

  get id() { return this.myForm.get('id'); }

  get productModelName() { return this.myForm.get('productModelName'); }

  findById(id:any): void {
    this.productModelService.findById(id).subscribe(
      (res:HttpResponse<ProductModel>) => {
        this.productModel = res.body;
        if(this.productModel) {
          this.updateForm(this.productModel);
        }
      }
    );
  }

  updateForm(productModel: ProductModel): void {
    this.myForm.patchValue({
      id: productModel.id,
      productModelName: productModel.productModelName
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.productModelService.update(this.myForm.value).subscribe(
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
