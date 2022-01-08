package com.repository;

import java.util.List;

import com.entity.Product;
import com.entity.ProductImage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    
    List<ProductImage> findByProduct(Product product);
}
