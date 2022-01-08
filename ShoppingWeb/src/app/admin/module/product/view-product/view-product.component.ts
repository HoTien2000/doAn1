import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailDTO } from 'src/app/dto/product-detail-dto';
import { ProductImage } from 'src/app/model/product-image';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  productDetailDTO:ProductDetailDTO | null = null;
  productImages?: ProductImage[];

  constructor(
    protected productService: ProductService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params['id']);
  }

  findById(id:any): void {
    this.productService.view(id).subscribe(
      (res:HttpResponse<ProductDetailDTO>) => {
        this.productDetailDTO = res.body;

        this.productImages = this.productDetailDTO?.productImages;
      }
    );
  }

  onBack(): void {
    window.history.back();
  }


}
