package com.service;

import java.util.List;

import com.entity.Product;
import com.entity.ProductImage;

public interface ProductImageService {
    
    List<ProductImage> findByProduct(Product product);
}
