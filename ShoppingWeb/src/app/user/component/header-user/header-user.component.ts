import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { UserSystem } from 'src/app/model/user-system';
import { JwtResponse } from 'src/app/response/jwt-response';
import { MessageResponse } from 'src/app/response/message-response';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { HeaderService } from 'src/app/service/header.service';
import { LoginService } from 'src/app/service/login.service';
import { SearchService } from 'src/app/service/search.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserSystemService } from 'src/app/service/user-system.service';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit, OnDestroy {

  public api = environment.api + "websocket"

  submitted = false;
  logined = false;
  message?: string;

  roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  email?: string;
  categories?: Category[];

  userSystem?: UserSystem;

  cartQuantity?: string;

  stompClient: any;

  productName = '';
  startPriceSell = 0;
  endPriceSell = 0;
  categoryId = '';

  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    fullName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    gender: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}')]),
    specificAddress: new FormControl('',[Validators.required, Validators.maxLength(255)]),
    wards: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    district: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    province: new FormControl('', [Validators.required, Validators.maxLength(255)])
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(50)])
  });

  constructor(
    protected userSystemService: UserSystemService,
    private tokenStorageService: TokenStorageService,
    protected loginService: LoginService,
    private router: Router,
    protected categoryService: CategoryService,
    protected headerService: HeaderService,
    protected cartDataService: CartDataService,
    protected cartService: CartService,
    protected searchService: SearchService,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.connect();

      const user = this.tokenStorageService.getUser();
      this.roles = user.body.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_USER');

      this.email = user.body.email;

      this.cartService.getQuantity().subscribe(
        (res: HttpResponse<MessageResponse>) => {
          this.cartQuantity = res.body?.message || '';
        }
      )

      this.cartDataService.currentData.subscribe(
        res => {
          this.cartQuantity = res || '';
        }
      )
    }

    this.findByCategory();
  }

  //register

  get emailUser() { return this.myForm.get('email'); }

  get password() { return this.myForm.get('password'); }

  get fullName() { return this.myForm.get('fullName'); }

  get gender() { return this.myForm.get('gender'); }

  get dateOfBirth() { return this.myForm.get('dateOfBirth'); }

  get phone() { return this.myForm.get('phone'); }

  get specificAddress() { return this.myForm.get('specificAddress'); }

  get wards() { return this.myForm.get('wards'); }

  get district() { return this.myForm.get('district'); }

  get province() { return this.myForm.get('province'); }

  // login

  get getEmail() { return this.loginForm.get('email'); }

  get getPassword() { return this.loginForm.get('password'); }

  findByCategory(): void {
    this.categoryService.findByCategory().subscribe(
      (res: HttpResponse<Category[]>) => {
        this.categories = res.body || [];
      }
    )
  }

  onRegister(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.userSystemService.create(this.myForm.value).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message;

        if (this.message === 'successfully') {
          Swal.fire('Thông báo', 'Đăng ký tài khoản thành công', 'success');
        } else if (this.message === 'emailExisted') {
          Swal.fire('Thông báo', 'Email đã đăng ký', 'error');
        } else if (this.message === 'phoneExisted') {
          Swal.fire('Thông báo', 'Số điện thoại đã đăng ký', 'error');
        } else if (this.message === 'failed') {
          Swal.fire('Thông báo', 'Đăng ký không thành công', 'error');
        }
      }
    )
  }

  onLogin(): void {
    this.logined = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.value).subscribe ({
        next: (res: HttpResponse<JwtResponse>) => {
          this.tokenStorageService.saveToken(res.body?.token || '');
          this.tokenStorageService.saveUser(res);
        },
        error: () => {
          Swal.fire('Thông báo', 'Tài khoản đăng nhập không đúng', 'error');
        },
        complete: () => {
          let url = this.router.url;

          window.location.reload();

          this.router.navigate([url]);
        }
      }
    );
  }

  onLogOut(): void {
    this.tokenStorageService.signOut();
    
    let url = this.router.url;

    window.location.reload();

    this.router.navigate([url]);
  }

  onPageAdmin(): void {
    this.router.navigate(["/home-admin"]);
  }

  onChangeLink(id:any): void {
    this.headerService.changeData(id);
    this.router.navigate(['/home/product-category/', id]);
  }

  onCart(): void {
    if(this.email) {
      this.router.navigate(['/home/product-cart']);
    } else {
      Swal.fire('Thông báo', 'Bạn chưa đăng ký hoặc đăng nhập tài khoản', 'warning');
    }
    
  }

  onMyOrder(): void {
    this.router.navigate(["/home/my-order"]);
  }

  onSearch(): void {
    this.searchService.changeData({productName: this.productName, categoryId:this.categoryId, startPriceSell:this.startPriceSell, endPriceSell:this.endPriceSell});
    this.router.navigate(['/home/search-product']);
  }

  connect(): void {
    const socket = new SockJS(this.api);
    this.stompClient = Stomp.over(socket)

    const that = this;
    this.stompClient.connect({}, () => {

      that.stompClient.subscribe('/topic/public', (response: any) => {
        if(response.body) {

          if(this.showAdminBoard) {      
            let audio = new Audio();
            audio.src = "/assets/sound/slow-spring-board-570.mp3"
            audio.load();
            audio.play();

            this.toastrService.success("Có đơn hàng mới", "Thông báo", {timeOut: 5000});
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
