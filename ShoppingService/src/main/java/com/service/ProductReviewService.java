package com.service;

import java.util.List;

import com.entity.ProductReview;

public interface ProductReviewService {
    ProductReview save(String productReview, String productId);

    List<ProductReview> findByProduct(Long id);
}
