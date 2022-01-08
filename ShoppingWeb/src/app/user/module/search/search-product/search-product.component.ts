import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/dto/product-dto';
import { ProductService } from 'src/app/service/product.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  productNotSales?: ProductDTO[];

  productSales?: ProductDTO[];

  constructor(protected productService : ProductService,
    protected searchService : SearchService) { }

  ngOnInit(): void {
    this.searchService.currentData.subscribe(
      res => {
        console.log(res);
       this.searchProductNotSale(res);
       this.searchProductSale(res);
      }
    )
  }

  searchProductNotSale(data:any): void {
    this.productService.searchNotSale({productName: data.productName, categoryId: data.categoryId, startPriceSell: data.startPriceSell, endPriceSell: data.endPriceSell}).subscribe(
      (res: HttpResponse<ProductDTO[]>) => {
        this.productNotSales = res.body || [];
      }
    )
  }

  searchProductSale(data:any): void {
    this.productService.searchSale({productName: data.productName, categoryId: data.categoryId, startPriceSell: data.startPriceSell, endPriceSell: data.endPriceSell}).subscribe(
      (res: HttpResponse<ProductDTO[]>) => {
        this.productSales = res.body || [];
      }
    )
  }

}
