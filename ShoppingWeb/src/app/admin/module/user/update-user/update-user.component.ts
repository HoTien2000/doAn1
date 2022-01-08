import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { UserSystem } from 'src/app/model/user-system';
import { RoleService } from 'src/app/service/role.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserSystemService } from 'src/app/service/user-system.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userSystem: UserSystem | null = null;

  submitted = false;
  message?: string;

  showAdminBoard = false;
  showModeratorBoard = false;

  email?: string;

  roles: string[] = [];
  listCheckRole: Role[] = [];
  role: Role | null = null;

  myForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    fullName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    gender: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}')]),
    specificAddress: new FormControl('',[Validators.required, Validators.maxLength(255)]),
    wards: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    district: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    province: new FormControl('', [Validators.required, Validators.maxLength(255)])
  });

  constructor(
    protected userSystemService: UserSystemService,
    protected roleService: RoleService,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params['id']);
  }

  get  id() { return this.myForm.get('id'); }

  get emailUser() { return this.myForm.get('email'); }

  get fullName() { return this.myForm.get('fullName'); }

  get gender() { return this.myForm.get('gender'); }

  get dateOfBirth() { return this.myForm.get('dateOfBirth'); }

  get phone() { return this.myForm.get('phone'); }

  get specificAddress() { return this.myForm.get('specificAddress'); }

  get wards() { return this.myForm.get('wards'); }

  get district() { return this.myForm.get('district'); }

  get province() { return this.myForm.get('province'); }

  findById(id: any): void {
    this.userSystemService.findById(id).subscribe(
      (res: HttpResponse<UserSystem>) => {
        this.userSystem = res.body;
        
        if(this.userSystem) {
          this.email = this.userSystem.email;
          this.updateForm(this.userSystem);

          this.userSystem.roles?.forEach((value) => {
            this.roles.push(value.name || '');
            this.listCheckRole.push(value);
          });

          this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
          this.showModeratorBoard = this.roles.includes('ROLE_USER');
        }
      }
    );
  }

  updateForm(userSystem: UserSystem): void {
    this.myForm.patchValue({
      id: userSystem.id,
      email: userSystem.email,
      fullName: userSystem.fullName,
      gender: userSystem.gender,
      dateOfBirth: userSystem.dateOfBirth,
      phone: userSystem.phone,
      specificAddress: userSystem.specificAddress,
      wards: userSystem.wards,
      district: userSystem.district,
      province: userSystem.province
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }
    
    const formData: FormData = new FormData();

    formData.append('userSystem', JSON.stringify(this.myForm.value));
    formData.append('role', JSON.stringify(this.listCheckRole));

    if(this.listCheckRole.length > 0) {
      this.userSystemService.update(formData).subscribe(
        response => {
          this.message = response.body?.message;
  
          if(this.message === 'successfully') {
            Swal.fire('Thông báo', 'Cập nhật thành công', 'success');
          } else if(this.message === 'emailExisted') {
            Swal.fire('Thông báo', 'Email đã tồn tại', 'error');
          } else if(this.message === 'phoneExisted') {
            Swal.fire('Thông báo', 'Số điện thoại đã tồn tại', 'error');
          } else if(this.message === 'failed') {
            Swal.fire('Thông báo', 'Cập nhật không thành công', 'error');
          }

          let currentEmail = this.myForm.get('email')?.value || '';

          if(this.showAdminBoard) {
            this.tokenStorageService.signOut();
            this.router.navigate(['/home/main']);
          }
        }
      )
    } else {
      Swal.fire('Thông báo', 'Bạn chưa chọn quyền nào cho người dùng', 'error');
    }
  }

  handleCheckBoxA(checked: boolean, value: string): void {
    this.getValue(checked, value);
  }

  handleCheckBoxU(checked: boolean, value: string): void {
    this.getValue(checked, value);
  }

  getValue(checked: boolean, value: string): void {
    if(checked) {
      this.roleService.findByName({name: value}).subscribe(
        (res: HttpResponse<Role>) => {
          this.role = res.body;

          if(this.role) {
            this.listCheckRole.push(this.role);
          }
        }
      );      
    } else {
      this.listCheckRole?.forEach((item, index) => {
        if (item.name === value) {
          this.listCheckRole.splice(index, 1);
        }
      });
    }
  }

  onBack(): void {
    window.history.back();
  }

}
