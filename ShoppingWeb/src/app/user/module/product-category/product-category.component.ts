import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO } from 'src/app/dto/product-dto';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { HeaderService } from 'src/app/service/header.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit, OnDestroy {

  products?: ProductDTO[];
  productSales?: ProductDTO[];
  category:Category | null = null;
  id?:string;

  constructor(
    protected productService: ProductService,
    protected categoryService: CategoryService,
    private route: ActivatedRoute,
    protected headerService: HeaderService,
    private title:Title) {  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.headerService.currentData.subscribe(
      res => {
       if(res !== '') {
        this.id = res;

        this.findByCatgory(this.id);
        this.findByIdCategory(this.id);
        this.findByCatgoryAndSale(this.id);
       } else {
        this.findByCatgory(this.id);
        this.findByIdCategory(this.id);
        this.findByCatgoryAndSale(this.id);
       }
      }
    )
  }

  findByIdCategory(id:any):void {
    this.categoryService.findByIdAll(id).subscribe(
      (res:HttpResponse<Category>) => {
        this.category = res.body;

        if(this.category) {
          this.title.setTitle(this.category.categoryName || '');
        }
      }
    );
  }

  findByCatgory(id:any): void {
    this.productService.findByCategory(id).subscribe(
      (res: HttpResponse<ProductDTO[]>) => {
        this.products = res.body || [];
      }
    );
  }

  findByCatgoryAndSale(id:any): void {
    this.productService.findByCategoryAndSale(id).subscribe(
      (res: HttpResponse<ProductDTO[]>) => {
        this.productSales = res.body || [];
      }
    );
  }

  ngOnDestroy(): void {
      this.title.setTitle('Trang chủ');
  }

}
