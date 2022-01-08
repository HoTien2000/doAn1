import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartTotalDTO } from 'src/app/dto/cart-total-dto';
import { NotificationDTO } from 'src/app/dto/notification-dto';
import { DiscountCode } from 'src/app/model/discount-code';
import { ShippingFee } from 'src/app/model/shipping-fee';
import { UserSystem } from 'src/app/model/user-system';
import { MessageResponse } from 'src/app/response/message-response';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartService } from 'src/app/service/cart.service';
import { DiscountCodeService } from 'src/app/service/discount-code.service';
import { PaymentService } from 'src/app/service/payment.service';
import { ShippingFeeService } from 'src/app/service/shipping-fee.service';
import { UserSystemService } from 'src/app/service/user-system.service';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-product-payment',
  templateUrl: './product-payment.component.html',
  styleUrls: ['./product-payment.component.css']
})
export class ProductPaymentComponent implements OnInit, OnDestroy {

  public api = environment.api + "websocket"

  cartTotalDTO: CartTotalDTO | null = null;
  shippingFee: ShippingFee | null = null;
  userSystem: UserSystem | null = null;
  discountCode: DiscountCode | null = null;

  showAdminBoard = false;
  showModeratorBoard = false;

  message?: string;
  id?: number;
  checkDiscount: boolean = false;
  clicked = true;

  productTotal: number = 0;
  shippingTotal: number = 0;
  discountTotal: number = 0;
  stompClient: any;

  constructor(
    protected cartService: CartService,
    protected cartDataService: CartDataService,
    protected shippingFeeService: ShippingFeeService,
    protected userSystemService: UserSystemService,
    protected discountCodeService: DiscountCodeService,
    protected paymentService: PaymentService,
    private router: Router,
    private toastrService: ToastrService,
    private tokenStorageService: TokenStorageService,) { }

  ngOnInit(): void {
    this.connect();

    this.findAll();
    this.findByAddres();
    this.findByUserSystem();
  }

  findAll(): void {
    this.cartService.findAll().subscribe(
      (res: HttpResponse<CartTotalDTO>) => {
        this.cartTotalDTO = res.body;

        if (this.cartTotalDTO) {
          this.productTotal = this.cartTotalDTO.total || 0;
        }
      }
    )
  }

  findByAddres(): void {
    this.shippingFeeService.findByAdress().subscribe(
      (res: HttpResponse<ShippingFee>) => {
        this.shippingFee = res.body;

        if (this.shippingFee) {
          this.shippingTotal = this.shippingFee.shippingFee || 0
        }
      }
    )
  }

  findByUserSystem(): void {
    this.userSystemService.findByUserSystem().subscribe(
      (res: HttpResponse<UserSystem>) => {
        this.userSystem = res.body;
      }
    )
  }

  onDiscount(): void {
    this.discountCodeService.findDiscountCode().subscribe(
      (res: HttpResponse<DiscountCode>) => {
        this.discountCode = res.body;

        this.clicked = false;

        if (this.discountCode) {
          this.discountTotal = this.discountCode.discount || 0;
        } else {
          this.checkDiscount = true;
        }
      }
    )
  }

  onPayment(): void {
    if (this.shippingFee) {
      const formData: FormData = new FormData();

      formData.append('discountCode', JSON.stringify(this.discountCode));

      formData.append('shippingFee', JSON.stringify(this.shippingFee));

      this.paymentService.create(formData).subscribe(
        (response: HttpResponse<MessageResponse>) => {
          this.message = response.body?.message;

          if (this.message === 'success') {
            this.cartService.getQuantity().subscribe(
              (res: HttpResponse<MessageResponse>) => {
                let quantity = res.body?.message || ''
                this.cartDataService.changeData(quantity);
              }
            );

            let notificationDTO: NotificationDTO = {
              message: "order"
            }

            this.stompClient.send('/app/send', {}, JSON.stringify(notificationDTO));

            Swal.fire('Thông báo', 'Đặt hàng thành công', 'success');
            this.router.navigate(['/home/my-order']);
          } else if (this.message === 'failed') {
            Swal.fire('Thông báo', 'Đặt hàng không thành công', 'error');
          }
        }
      )
    } else {
      Swal.fire('Thông báo', 'Không thể tìm thấy địa chỉ của bạn', 'error');
    }
  }

  connect(): void {
    const socket = new SockJS(this.api);
    this.stompClient = Stomp.over(socket)

    const that = this;
    this.stompClient.connect({}, () => {

      that.stompClient.subscribe('/topic/public', (response: any) => {
      });
    });
  }

  public ngOnDestroy(): void {
    if(this.stompClient) {
      this.stompClient.disconnect();
    }
  }

}
