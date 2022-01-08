import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewsDTO } from 'src/app/dto/news-dto';
import { ProductDTO } from 'src/app/dto/product-dto';
import { NewsService } from 'src/app/service/news.service';
import { ProductService } from 'src/app/service/product.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  newsDTOs?: NewsDTO[];
  productNew?: ProductDTO[];

  productSales?: ProductDTO[];

  productSellFasters?: ProductDTO[];

  constructor(
    protected newsService: NewsService,
    protected productService: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.findTop();
    this.findTop8ProductNews();
    this.findTop8ProductSales();
    this.findTop8ProductSellFaster();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  findTop(): void {
    this.newsService.findTop().subscribe(
      (res: HttpResponse<NewsDTO[]>) => {
        this.newsDTOs = res.body || [];
      }
    );
  }

  findTop8ProductNews(): void {
    this.productService.findTop8ProductNews().subscribe(
      (res: HttpResponse<ProductDTO[]>) => {
        this.productNew = res.body || [];
      }
    );
  }

  findTop8ProductSales(): void {
    this.productService.findTop8ProductSale().subscribe(
      (res: HttpResponse<ProductDTO[]>) => {
        this.productSales = res.body || [];
      }
    );
  }

  findTop8ProductSellFaster(): void {
    this.productService.findTop8ProductSellFaster().subscribe(
      (res: HttpResponse<ProductDTO[]>) => {
        this.productSellFasters = res.body || [];
      }
    );
  }

}
