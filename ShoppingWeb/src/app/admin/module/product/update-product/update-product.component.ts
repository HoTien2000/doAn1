import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductModelUpdateDTO } from 'src/app/dto/product-model-update-dto';
import { ProductTypeUpdateDTO } from 'src/app/dto/product-type-update-dto';
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
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product:Product | null = null;

  submitted = false;
  message?:string;

  id?: number;

  categories?:Category[];

  productModelUpdateDTOs?: ProductModelUpdateDTO[];
  productTypeUpdateDTOs?: ProductTypeUpdateDTO[];

  listProductModels: ProductModel[] = [];
  listProductTypes: ProductType[] = [];

  myForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    introduce: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    priceImport: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    priceSell: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    quantityImport: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]),
    quantitySell: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    sale: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    categoryId: new FormControl('', [Validators.required]),
  });

  constructor(
    protected productService: ProductService,
    protected categoryService: CategoryService,
    protected productModelService: ProductModelService,
    protected productTypeService: ProductTypeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {  
    this.findAllCategory();
    this.findById(this.route.snapshot.params['id']);
  }

  get productName() { return this.myForm.get('productName'); }

  get introduce() { return this.myForm.get('introduce'); }

  get description() { return this.myForm.get('description'); } 

  get priceImport() { return this.myForm.get('priceImport'); }

  get priceSell() { return this.myForm.get('priceSell'); } 

  get quantityImport() { return this.myForm.get('quantityImport'); } 

  get sale() { return this.myForm.get('sale'); }

  get categoryId() { return this.myForm.get('categoryId'); }

  findAllCategory(): void {
    this.categoryService.findAll().subscribe(
      (res:HttpResponse<Category[]>) => {
        this.categories = res.body || [];
      }
    )
  }

  findAllProductModelDTO(id: any): void {
    this.productService.findProductModelDTO({id: id}).subscribe(
      (res: HttpResponse<ProductModelUpdateDTO[]>) => {
        this.productModelUpdateDTOs = res.body || [];
      }
    )
  }

  findAllProductTypeDTO(id: any): void {
   this.productService.findProductTypeDTO({id: id}).subscribe(
     (res: HttpResponse<ProductTypeUpdateDTO[]>) => {
       this.productTypeUpdateDTOs = res.body || [];
     }
   )
  }

  findById(id:any): void {
    this.productService.findById(id).subscribe(
      (res:HttpResponse<Product>) => {
        this.product = res.body;
        if(this.product) {
          this.updateForm(this.product);

          this.listProductModels = this.product.productModels || [];
          this.listProductTypes = this.product.productTypes || [];

          this.findAllProductModelDTO(this.product.id);
          this.findAllProductTypeDTO(this.product.id);
        }
      }
    );
  }

  updateForm(product: Product): void {
    this.myForm.patchValue({
      id: product.id,
      productName: product.productName,
      introduce: product.introduce,
      description: product.description,
      priceImport: product.priceImport,
      priceSell: product.priceSell,
      quantityImport: product.quantityImport,
      quantitySell: product.quantitySell,
      sale: product.sale,
      categoryId: product.category?.id
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    let product:Product = {
      id: this.myForm.value.id,
      productName: this.myForm.value.productName,
      introduce:  this.myForm.value.introduce,
      description:  this.myForm.value.description,
      priceImport:  this.myForm.value.priceImport,
      priceSell:  this.myForm.value.priceSell,
      quantityImport:  this.myForm.value.quantityImport,
      quantitySell: this.myForm.value.quantitySell,
      sale:  this.myForm.value.sale,
    }

    const formData: FormData = new FormData();

    formData.append('category', JSON.stringify(this.myForm.value.categoryId));
    formData.append('product', JSON.stringify(product));

    formData.append('productModel', JSON.stringify(this.listProductModels));
    formData.append('productType', JSON.stringify(this.listProductTypes));

    this.productService.update(formData).subscribe(
      (response: HttpResponse<MessageResponse>) => {
        this.message = response.body?.message;

        if(this.message === 'success') {
          Swal.fire('Thông báo', 'Cập nhật sản phẩm thành công', 'success');
        } else if(this.message === 'failed') {
          Swal.fire('Thông báo', 'Cập nhật sản phẩm không thành công', 'error');
        }
      }
    )
  }

  onCheckBoxProductModel(checkbox: boolean, productModel: any): void {
    if(checkbox) {
      this.listProductModels?.push(productModel);
    } else {
      this.listProductModels?.forEach((item, index) => {
        if (item.id === productModel.id) {
          this.listProductModels?.splice(index, 1);
        }
      });
    }
    console.log(this.listProductModels);
  }

  onCheckBoxProductType(checkbox: boolean, productType: any): void {
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
