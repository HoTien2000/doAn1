package com.controller;

import java.util.List;

import com.entity.ProductReview;
import com.payload.MessageResponse;
import com.service.ProductReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/product-review")
public class ProductReviewController {
    
    @Autowired
    private ProductReviewService productReviewService;

    @PostMapping("/save")
    public ResponseEntity<MessageResponse> save(@RequestParam("productReview") String productReview, @RequestParam("productId") String productId) {
        ProductReview result = productReviewService.save(productReview, productId);
        
        if (result != null) {
            return ResponseEntity.ok().body(new MessageResponse("success"));
        }

        return ResponseEntity.ok().body(new MessageResponse("failed"));
    }

    @GetMapping("/find-product")
    public ResponseEntity<List<ProductReview>> findByProduct(@RequestParam("id") Long id) {
        List<ProductReview> productReviews = productReviewService.findByProduct(id);

        return ResponseEntity.ok().body(productReviews);
    }
    
}
