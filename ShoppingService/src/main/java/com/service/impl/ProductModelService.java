package com.service.impl;

import java.util.List;

import com.entity.ProductModel;

public interface ProductModelService {

    ProductModel save(ProductModel productType);

    List<ProductModel> findAll();

    ProductModel findById(Long id);

    ProductModel update(ProductModel productType);

    void delete(Long id);
}
