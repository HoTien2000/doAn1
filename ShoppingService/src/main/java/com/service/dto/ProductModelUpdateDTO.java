package com.service.dto;

import com.entity.ProductModel;

public class ProductModelUpdateDTO {
    private ProductModel productModel;
    private int status;

    public ProductModel getProductModel() {
        return productModel;
    }

    public void setProductModel(ProductModel productModel) {
        this.productModel = productModel;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
    
   
}
