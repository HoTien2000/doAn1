import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/model/payment';
import { MessageResponse } from 'src/app/response/message-response';
import { ProductReviewService } from 'src/app/service/product-review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {

  submitted = false;
  message?:string;

  id?: number;

  myForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(4000)]),
  });

  constructor(
    protected productReviewService: ProductReviewService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);
  }

  get content() { return this.myForm.get('content'); }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    const formData: FormData = new FormData();

    formData.append('productReview', JSON.stringify(this.myForm.value));
    formData.append('productId', JSON.stringify(this.id));

    this.productReviewService.create(formData).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Đánh giá sản phẩm thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Đánh giá sản phẩm không thành công', 'error');
        }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }

}
