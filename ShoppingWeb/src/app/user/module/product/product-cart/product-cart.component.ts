import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartTotalDTO } from 'src/app/dto/cart-total-dto';
import { Cart } from 'src/app/model/cart';
import { ProductModel } from 'src/app/model/product-model';
import { ProductType } from 'src/app/model/product-type';
import { MessageResponse } from 'src/app/response/message-response';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  cartTotalDTO: CartTotalDTO | null = null;
  cart: Cart | null = null;
  message?: string;
  id?: number;

  constructor(
    protected cartService: CartService,
    protected cartDataService: CartDataService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.cartService.findAll().subscribe(
      (res: HttpResponse<CartTotalDTO>) => {
        this.cartTotalDTO = res.body;
      }
    )
  }

  onProductModel(id: any, productModel: ProductModel) {
    const formData: FormData = new FormData();

    formData.append('id', JSON.stringify(id));
    formData.append('productModel', JSON.stringify(productModel));

    this.cartService.updateProductModel(formData).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message;

        if (this.message === 'success') {
          this.findAll();
        } else {
          Swal.fire('Thông báo', 'Cập nhập giỏ hàng không thành công', 'error');
        }
      }
    );
  }

  onProductType(id: any, productType: ProductType) {
    const formData: FormData = new FormData();

    formData.append('id', JSON.stringify(id));
    formData.append('productType', JSON.stringify(productType));

    this.cartService.updateProductType(formData).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message;

        if (this.message === 'success') {
          this.findAll();
        } else {
          Swal.fire('Thông báo', 'Cập nhập giỏ hàng không thành công', 'error');
        }
      }
    );
  }

  onMinus(id: any, quantity: any): void {
    if (quantity === '1') {
      Swal.fire('Thông báo', 'Số lượng sản phẩm phải lơn hơn 0', 'warning');
    } else {
      let curentQuantity = parseInt(quantity);
      curentQuantity = curentQuantity - 1;

      const formData: FormData = new FormData();

      formData.append('id', JSON.stringify(id));
      formData.append('quantity', JSON.stringify(curentQuantity));

      this.cartService.updateQuantity(formData).subscribe(
        (res: HttpResponse<MessageResponse>) => {
          this.message = res.body?.message;

          if (this.message === 'success') {
            this.findAll();

            this.cartService.getQuantity().subscribe(
              (res: HttpResponse<MessageResponse>) => {
                let quantity = res.body?.message || ''
                this.cartDataService.changeData(quantity);
              }
            );
          } else {
            Swal.fire('Thông báo', 'Cập nhập giỏ hàng không thành công', 'error');
          }
        }
      );
    }

  }

  onPlus(id: any, quantity: any): void {
    let curentQuantity = parseInt(quantity);
    curentQuantity = curentQuantity + 1;

    this.cartService.findById(id).subscribe(
      (res: HttpResponse<Cart>) => {
        this.cart = res.body;

        if (this.cart) {
          if (this.cart.product?.inventory && curentQuantity > this.cart.product?.inventory) {
            Swal.fire('Thông báo', 'Số lượng sản phẩm nhiều hơn số lượn đang có', 'warning');
            curentQuantity = this.cart.quantity || 0;
            this.findAll();
          } else {
            const formData: FormData = new FormData();

            formData.append('id', JSON.stringify(id));
            formData.append('quantity', JSON.stringify(curentQuantity));

            this.cartService.updateQuantity(formData).subscribe(
              (res: HttpResponse<MessageResponse>) => {
                this.message = res.body?.message;

                if (this.message === 'success') {
                  this.findAll();

                  this.cartService.getQuantity().subscribe(
                    (res: HttpResponse<MessageResponse>) => {
                      let quantity = res.body?.message || ''
                      this.cartDataService.changeData(quantity);
                    }
                  );
                } else {
                  Swal.fire('Thông báo', 'Cập nhập giỏ hàng không thành công', 'error');
                }
              }
            );
          }
        }
      }
    );
  }

  onChangeValue(id: any, event: any): void {
    let curentQuantity = parseInt(event.target.value);

    if (curentQuantity < 1) {
      Swal.fire('Thông báo', 'Số lượng sản phẩm phải lơn hơn 0', 'warning');
      curentQuantity = 1;
      this.findAll();
    } else {
      this.cartService.findById(id).subscribe(
        (res: HttpResponse<Cart>) => {
          this.cart = res.body;

          if (this.cart) {
            if (this.cart.product?.inventory && curentQuantity > this.cart.product?.inventory) {
              Swal.fire('Thông báo', 'Số lượng sản phẩm nhiều hơn số lượn đang có', 'warning');
              curentQuantity = this.cart.quantity || 0;
              this.findAll();
            } else {
              const formData: FormData = new FormData();

              formData.append('id', JSON.stringify(id));
              formData.append('quantity', JSON.stringify(curentQuantity));

              this.cartService.updateQuantity(formData).subscribe(
                (res: HttpResponse<MessageResponse>) => {
                  this.message = res.body?.message;

                  if (this.message === 'success') {
                    this.cartService.getQuantity().subscribe(
                      (res: HttpResponse<MessageResponse>) => {
                        this.findAll();
                        let quantity = res.body?.message || ''
                        this.cartDataService.changeData(quantity);
                      }
                    );
                  } else {
                    Swal.fire('Thông báo', 'Cập nhập giỏ hàng không thành công', 'error');
                  }
                }
              );
            }
          }
        }
      );
    }
  }

  onDelete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.cartService.delete(this.id).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message || '';

        if (this.message === 'success') {
          this.cartService.getQuantity().subscribe(
            (res: HttpResponse<MessageResponse>) => {
              let quantity = res.body?.message || ''
              this.cartDataService.changeData(quantity);
            }
          );

          Swal.fire('Thông báo', 'Xóa một mặt hàng thành công', 'success');
        } else if (this.message === 'failed') {
          Swal.fire('Thông báo', 'Xóa một mặt hàng không thành công', 'error');
        }

        this.findAll()
      }
    )
  }


}
