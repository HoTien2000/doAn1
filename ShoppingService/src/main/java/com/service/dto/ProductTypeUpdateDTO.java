package com.service.dto;

import com.entity.ProductType;

public class ProductTypeUpdateDTO {
    private ProductType productType;
    private int status;

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
    
   
}
