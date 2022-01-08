import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductStatisticDTO } from 'src/app/dto/product-statistic-dto';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-statistic',
  templateUrl: './product-statistic.component.html',
  styleUrls: ['./product-statistic.component.css']
})
export class ProductStatisticComponent implements OnInit {

  productStatistic: ProductStatisticDTO | null = null;

  categories?: Category[];

  productName = '';
  categoryId = '';

  constructor(protected productService: ProductService,
    protected categoryService: CategoryService) { }

  ngOnInit(): void {
    this.findCategory();
    this.onReport();
  }

  findCategory(): void {
    this.categoryService.findByCategory().subscribe(
      (res:HttpResponse<Category[]>) => {
        this.categories = res.body || [];
      }
    )
  }

  onReport(): void {
    this.productService.productStatistic({productName: this.productName, categoryId: this.categoryId}).subscribe(
      (res: HttpResponse<ProductStatisticDTO>) => {
        this.productStatistic = res.body;
      }
    );
  }

}
