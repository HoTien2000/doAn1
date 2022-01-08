import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailDTO } from 'src/app/dto/product-detail-dto';
import { ProductDTO } from 'src/app/dto/product-dto';
import { ProductImage } from 'src/app/model/product-image';
import { ProductModel } from 'src/app/model/product-model';
import { ProductReview } from 'src/app/model/product-review';
import { ProductType } from 'src/app/model/product-type';
import { MessageResponse } from 'src/app/response/message-response';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductReviewService } from 'src/app/service/product-review.service';
import { ProductService } from 'src/app/service/product.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {

  productDetailDTO: ProductDetailDTO | null = null;
  productImages?: ProductImage[];

  productDTOs?: ProductDTO[];

  submitted = false;
  message?: string;

  quantityTotal: number = 0;

  isLoggedIn = false;
  email?: string;

  productModelChoose: ProductModel | null = null;
  productTypeChoose: ProductType | null = null;

  productReviews?: ProductReview[];

  myForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  constructor(
    protected productService: ProductService,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    protected cartService: CartService,
    protected cartDataService: CartDataService,
    protected productReviewService: ProductReviewService
  ) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params['id']);
  }

  get id() { return this.myForm.get('id'); }

  get quantity() { return this.myForm.get('quantity'); }

  findById(id: any): void {
    this.productService.detail(id).subscribe(
      (res: HttpResponse<ProductDetailDTO>) => {
        this.productDetailDTO = res.body;

        if (this.productDetailDTO) {
          this.updateForm(this.productDetailDTO);
        }

        this.productImages = this.productDetailDTO?.productImages;

        this.myForm.get("quantity")?.setValue(1);

        this.quantityTotal = this.myForm.value.quantity;

        if (this.productDetailDTO) {

          let categoryId = this.productDetailDTO.category?.id;
          let sale = this.productDetailDTO.sale;
          let productId = this.productDetailDTO.id;

          this.productModelChoose = null;
          this.productTypeChoose = null;

          this.findByLike(categoryId, sale, productId);

          this.findProductReview(productId);
        }
      }
    );

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.email = user.body.email;
    }
  }

  findProductReview(id: any): void {
    this.productReviewService.findByProduct({id: id}).subscribe(
      (res: HttpResponse<ProductReview[]>) => {
        this.productReviews = res.body || [];
      }
    )
  }

  onChange(): void {
    this.quantityTotal = this.myForm.value.quantity;

    if (this.productDetailDTO?.inventory && this.quantityTotal > this.productDetailDTO?.inventory) {
      Swal.fire('Thông báo', 'Số lượng sản phẩm nhiều hơn số lượng đang có', 'warning');
      this.myForm.get("quantity")?.setValue(1);
      this.quantityTotal = this.myForm.value.quantity;
    } else if (this.quantityTotal < 1) {
      Swal.fire('Thông báo', 'Số lượng sản phẩm phải lớn hơn 0', 'warning');
      this.myForm.get("quantity")?.setValue(1);
      this.quantityTotal = this.myForm.value.quantity;
    } else {
      this.quantityTotal = this.myForm.value.quantity;
    }
  }

  onProductModel(productModel: ProductModel) {
    this.productModelChoose = productModel || null;

  }

  onProductType(productType: ProductType) {
    this.productTypeChoose = productType || null
  }

  onSubmit(): void {

    if (this.email) {
      this.submitted = true;

      if (this.myForm.invalid) {
        return;
      }

      if (this.productModelChoose === null) {
        Swal.fire('Thông báo', 'Bạn chưa chọn size', 'warning');
      } else if (this.productTypeChoose === null) {
        Swal.fire('Thông báo', 'Bạn chưa chọn màu áo', 'warning');
      } else {
        const formData: FormData = new FormData();

        formData.append('productId', JSON.stringify(this.myForm.value.id));
        formData.append('quantity', JSON.stringify(this.myForm.value.quantity));
        formData.append('productModel', JSON.stringify(this.productModelChoose));
        formData.append('productType', JSON.stringify(this.productTypeChoose));

        this.cartService.create(formData).subscribe(
          (response: HttpResponse<MessageResponse>) => {
            this.message = response.body?.message;

            if (this.message === 'success') {
              this.cartService.getQuantity().subscribe(
                (res: HttpResponse<MessageResponse>) => {
                  let quantity = res.body?.message || ''
                  this.cartDataService.changeData(quantity);

                  if (quantity !== 'failed') {
                    Swal.fire('Thông báo', 'Thêm vào giỏ hàng thành công', 'success');
                  }
                }
              );
            } else if (this.message === 'failed') {
              Swal.fire('Thông báo', 'Thêm vào giỏ hàng không thành công', 'error');
            }
          }
        )
      }
    } else {
      Swal.fire('Thông báo', 'Bạn chưa đăng nhập hoặc chưa đăng ký tài khoản', 'warning');
    }
  }

  updateForm(productDTO: ProductDTO): void {
    this.myForm.patchValue({
      id: productDTO.id
    });
  }

  onMinus(): void {
    this.quantityTotal = this.quantityTotal - 1;

    if (this.quantityTotal < 1) {
      Swal.fire('Thông báo', 'Số lượng sản phẩm phải lớn hơn 0', 'warning');
      this.myForm.get("quantity")?.setValue(1);
      this.quantityTotal = this.myForm.value.quantity;
    } else {
      this.myForm.get("quantity")?.setValue(this.quantityTotal);
    }
  }

  onPlus(): void {
    this.quantityTotal = this.quantityTotal + 1;

    if (this.productDetailDTO?.inventory && this.quantityTotal > this.productDetailDTO?.inventory) {
      Swal.fire('Thông báo', 'Số lượng sản phẩm nhiều hơn số lượn đang có', 'warning');

      this.myForm.get("quantity")?.setValue(1);
      this.quantityTotal = this.myForm.value.quantity;
    } else {
      this.myForm.get("quantity")?.setValue(this.quantityTotal);
    }
  }

  findByLike(categoryId?: number, sale?: number, productId?: number): void {
    this.productService.findTByProductLike({ categoryId: categoryId, sale: sale, productId: productId }).subscribe(
      (res: HttpResponse<ProductDTO[]>) => {
        this.productDTOs = res.body || [];
      }
    );
  }

  onClickLink(id: any): void {
    this.findById(id);
  }

}
