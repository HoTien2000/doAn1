import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/model/category';
import { Payment } from 'src/app/model/payment';
import { Product } from 'src/app/model/product';
import { UserSystem } from 'src/app/model/user-system';
import { CategoryService } from 'src/app/service/category.service';
import { PaymentService } from 'src/app/service/payment.service';
import { ProductService } from 'src/app/service/product.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserSystemService } from 'src/app/service/user-system.service';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { Stomp } from '@stomp/stompjs';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit, OnDestroy {

  public api = environment.api + "websocket"

  stompClient: any;

  roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;

  status0 = 0;
  status1 = 1;
  status2 = 2;
  user = 0;
  category = 0;
  sale = 0;

  constructor(protected paymentService : PaymentService,
    protected userSystemService: UserSystemService,
    protected categoryService: CategoryService,
    protected productService: ProductService,
    private spinner: NgxSpinnerService,
    private tokenStorageService: TokenStorageService,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.spinner.show();

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.connect();

      const user = this.tokenStorageService.getUser();
      this.roles = user.body.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_USER');
    }

    this.findByStatus();
    this.findUserSystem();
    this.findCategory();
    this.findSale();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  findByStatus(): void {
    let paymentStatus0 : Payment[] = [];
    let paymentStatus1 : Payment[] = [];
    let paymentStatus2 : Payment[] = [];

    this.paymentService.findByStatus({status: 0}).subscribe(
      (res: HttpResponse<Payment[]>) => {
        paymentStatus0 = res.body || [];
        this.status0 = paymentStatus0.length;
      }
    )

    this.paymentService.findByStatus({status: 1}).subscribe(
      (res: HttpResponse<Payment[]>) => {
        paymentStatus1 = res.body || [];
        this.status1 = paymentStatus1.length;
      }
    )

    this.paymentService.findByStatus({status: 2}).subscribe(
      (res: HttpResponse<Payment[]>) => {
        paymentStatus2 = res.body || [];
        this.status2 = paymentStatus2.length;
      }
    )
  }

  findUserSystem(): void {
    let userSystems : UserSystem[] = [];

    this.userSystemService.findAll().subscribe(
      (res: HttpResponse<UserSystem[]>) => {
        userSystems = res.body || [] ;
        this.user = userSystems.length;
      }
    )
  }

  findCategory(): void {
    let categories : Category[] = [];

    this.categoryService.findAll().subscribe(
      (res: HttpResponse<Category[]>) => {
        categories = res.body || [] ;
        this.category = categories.length;
      }
    )
  }

  findSale(): void {
    let products : Product[] = [];

    this.productService.findBySaleGreateThan({sale: 0}).subscribe(
      (res: HttpResponse<Product[]>) => {
        products = res.body || [] ;
        this.sale = products.length;
      }
    )
  }

  connect(): void {
    const socket = new SockJS(this.api);
    this.stompClient = Stomp.over(socket)

    const that = this;
    this.stompClient.connect({}, () => {

      that.stompClient.subscribe('/topic/public', (response: any) => {
        if(response.body) {
          let data = JSON.parse(response.body);
      
          if(this.showAdminBoard) {      
           this.status0 = data.message;
          }
        }
      });
    });
  }

  public ngOnDestroy(): void {
    if(this.stompClient) {
      this.stompClient.disconnect();
    }
  }

}
