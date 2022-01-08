import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserSystem } from 'src/app/model/user-system';
import { MessageResponse } from 'src/app/response/message-response';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserSystemService } from 'src/app/service/user-system.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  roles: string[] = [];
  userSystems?: UserSystem[];
  isLoggedIn = false;
  id?: number;
  email?: string;
  message?: string;

  constructor(protected userSystemService: UserSystemService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.body.roles;

      this.email = user.body.email;
    }

    this.findAll();
  }

  findAll(): void {
    this.userSystemService.findAll().subscribe(
      (res: HttpResponse<UserSystem[]>) => {
        this.userSystems = res.body || [];
      }
    );
  }

  delete(id: any): void {
    this.id = id;
  }

  confirmDelete(): void {
    this.userSystemService.delete(this.id).subscribe(
      (res: HttpResponse<MessageResponse>) => (this.message = res.body?.message || '', this.findAll())
    )
  }


}
