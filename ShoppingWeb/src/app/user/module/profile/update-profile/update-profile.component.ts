import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSystem } from 'src/app/model/user-system';
import { MessageResponse } from 'src/app/response/message-response';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserSystemService } from 'src/app/service/user-system.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  userSystem: UserSystem | null = null;

  submitted = false;
  message?: string;
  email?: string;

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
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findByUserSystem();
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

  findByUserSystem(): void {
    this.userSystemService.findByUserSystem().subscribe(
      (res: HttpResponse<UserSystem>) => {
        this.userSystem = res.body;
        
        if(this.userSystem) {
          this.email = this.userSystem.email;
          this.updateForm(this.userSystem);
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

    this.userSystemService.updateProfile(this.myForm.value).subscribe(
      (res: HttpResponse<MessageResponse>) => {
        this.message = res.body?.message;
  
          if(this.message === 'success') {
            Swal.fire('Thông báo', 'Cập nhật thành công', 'success');
          } else if(this.message === 'emailExisted') {
            Swal.fire('Thông báo', 'Email đã tồn tại', 'error');
          } else if(this.message === 'phoneExisted') {
            Swal.fire('Thông báo', 'Số điện thoại đã tồn tại', 'error');
          } else if(this.message === 'failed') {
            Swal.fire('Thông báo', 'Cập nhật không thành công', 'error');
          }

          let currentEmail = this.myForm.get('email')?.value || '';

          if(this.email !== currentEmail) {
            this.tokenStorageService.signOut();
            this.router.navigate(['/home/main']);
            window.location.reload();
          }
      }
    )
  }

  onBack(): void {
    window.history.back();
  }


}
