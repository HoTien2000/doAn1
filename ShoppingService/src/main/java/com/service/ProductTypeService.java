package com.service;

import java.util.List;

import com.entity.ProductType;

public interface ProductTypeService {
    
    ProductType save(ProductType productType);

    List<ProductType> findAll();

    ProductType findById(Long id);

    ProductType update(ProductType productType);

    void delete(Long id);
}
