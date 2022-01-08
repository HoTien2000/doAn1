import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { ProductModel } from 'src/app/model/product-model';
import { ProductType } from 'src/app/model/product-type';
import { MessageResponse } from 'src/app/response/message-response';
import { CategoryService } from 'src/app/service/category.service';
import { ProductModelService } from 'src/app/service/product-model.service';
import { ProductTypeService } from 'src/app/service/product-type.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  submitted = false;
  message?:string;

  selectedFiles?: FileList;
  files:any[] = [];
  imgURLs:any[] = [];

  categories?:Category[];
  productModels?: ProductModel[];
  productTypes?: ProductType[];

  listProductModels: ProductModel[] = [];
  listProductTypes: ProductType[] = [];

  myForm = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    introduce: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    priceImport: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    priceSell: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    quantityImport: new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000000000)]),
    sale: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    categoryId: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  });

  constructor( 
    protected productService: ProductService,
    protected categoryService: CategoryService,
    protected productModelService: ProductModelService,
    protected productTypeService: ProductTypeService) { }

  ngOnInit(): void {
    this.findAllCategory();
    this.findAllProductModel();
    this.findAllProductType();
  }

  findAllCategory(): void {
    this.categoryService.findAll().subscribe(
      (res:HttpResponse<Category[]>) => {
        this.categories = res.body || [];
      }
    )
  }

  findAllProductModel(): void {
    this.productModelService.findAll().subscribe(
      (res:HttpResponse<ProductModel[]>) => {
        this.productModels = res.body || [];
      }
    )
  }

  findAllProductType(): void {
    this.productTypeService.findAll().subscribe(
      (res:HttpResponse<ProductType[]>) => {
        this.productTypes = res.body || [];
      }
    )
  }

  get productName() { return this.myForm.get('productName'); }

  get introduce() { return this.myForm.get('introduce'); }

  get description() { return this.myForm.get('description'); } 

  get priceImport() { return this.myForm.get('priceImport'); }

  get priceSell() { return this.myForm.get('priceSell'); } 

  get quantityImport() { return this.myForm.get('quantityImport'); } 

  get sale() { return this.myForm.get('sale'); }

  get categoryId() { return this.myForm.get('categoryId'); }

  get image() { return this.myForm.get('image'); }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
   
    if(this.selectedFiles) {
      if(this.files.length + this.selectedFiles?.length > 3) {
        Swal.fire('Thông báo', 'Bạn chỉ được chọn tối đa 3 bức ảnh', 'warning');
      } else {
        for(let i = 0; i < this.selectedFiles.length; i++) {
          let file: File | null = this.selectedFiles.item(i);
          
          if(file) {
            this.files?.push(file);
  
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
             this.imgURLs?.push({base64String: reader.result})
            };
          }
        }
      }
    }
  }

  deleteImage(i:any): void {
      this.imgURLs?.forEach((item, index) => {
        if (index === i) {
          this.imgURLs.splice(index, 1);
          this.files.splice(index, 1);
        }
      });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    let product:Product = {
      productName: this.myForm.value.productName,
      introduce:  this.myForm.value.introduce,
      description:  this.myForm.value.description,
      priceImport:  this.myForm.value.priceImport,
      priceSell:  this.myForm.value.priceSell,
      quantityImport:  this.myForm.value.quantityImport,
      sale:  this.myForm.value.sale,
    }

    const formData: FormData = new FormData();

    if (this.files.length === 0) {
      Swal.fire('Thông báo', 'Bạn phải chọn ít nhất 1 bước ảnh cho sản phẩm', 'error');
    } else {
      this.files?.forEach((item, index) => {
        formData.append('files', item);
      });
      formData.append('category', JSON.stringify(this.myForm.value.categoryId));
      formData.append('product', JSON.stringify(product));

      formData.append('productModel', JSON.stringify(this.listProductModels));
      formData.append('productType', JSON.stringify(this.listProductTypes));

      if(this.listProductModels.length === 0 || this.listProductTypes.length === 0) {
        Swal.fire('Thông báo', 'Bạn chưa chọn size hoặc màu', 'error');
      } else {
        this.productService.create(formData).subscribe(
          (response: HttpResponse<MessageResponse>) => {
            this.message = response.body?.message;
  
            if(this.message === 'success') {
              Swal.fire('Thông báo', 'Thêm sản phẩm thành công', 'success');
            } else if(this.message === 'failed') {
              Swal.fire('Thông báo', 'Thêm sản phẩm không thành công', 'error');
            }
          }
        )
      }
    }
  }

  onCheckBoxProductModel(checkbox: boolean, productModel: ProductModel): void {
    if(checkbox) {
      this.listProductModels?.push(productModel);
    } else {
      this.listProductModels?.forEach((item, index) => {
        if (item.id === productModel.id) {
          this.listProductModels?.splice(index, 1);
        }
      });
    }
    console.log(this.listProductModels)
  }

  onCheckBoxProductType(checkbox: boolean, productType: ProductType): void {
    if(checkbox) {
      this.listProductTypes?.push(productType);
    } else {
      this.listProductTypes?.forEach((item, index) => {
        if (item.id === productType.id) {
          this.listProductTypes?.splice(index, 1);
        }
      });
    }
  }

  onBack(): void {
    window.history.back();
  }


}
