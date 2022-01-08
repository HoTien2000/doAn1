import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { Stomp } from '@stomp/stompjs';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit, OnDestroy {

  public api = environment.api + "websocket"

  roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  email?: string;
  
  stompClient: any;

  constructor(private tokenStorageService: TokenStorageService, 
    private router: Router,
    private toastrService: ToastrService) { 
    }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.connect();

      const user = this.tokenStorageService.getUser();
      this.roles = user.body.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_USER');

      this.email = user.body.email;
    }
  }

  logOut(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/home/main']);
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
