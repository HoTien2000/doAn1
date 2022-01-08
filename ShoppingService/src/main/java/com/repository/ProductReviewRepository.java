package com.repository;

import java.util.List;

import com.entity.Product;
import com.entity.ProductReview;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
    
    List<ProductReview> findByProduct(Product product);
}
