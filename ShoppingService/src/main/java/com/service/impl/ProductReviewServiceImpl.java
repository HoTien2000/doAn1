package com.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.entity.Product;
import com.entity.ProductReview;
import com.entity.UserSystem;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.repository.ProductRepository;
import com.repository.ProductReviewRepository;
import com.repository.UserSystemRepository;
import com.service.ProductReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProductReviewServiceImpl implements ProductReviewService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Autowired
    private ProductReviewRepository productReviewRepository;

    @Override
    public ProductReview save(String productReview, String productId) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());

            ProductReview productReviewData = mapper.readValue(productReview, ProductReview.class);
            Long id = Long.parseLong(productId);

            Optional<Product> product = productRepository.findById(id);

            if(product.isPresent()) {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

                productReviewData.setLastUpdate(LocalDate.now());
                productReviewData.setProduct(product.get());
                productReviewData.setUserSystem(userSystem);

                return productReviewRepository.save(productReviewData);
            }
        } catch(Exception e) {
            e.printStackTrace();
        } 

        return null;
    }

    @Override
    public List<ProductReview> findByProduct(Long id) {
        List<ProductReview> productReviews = new ArrayList<>();

        try{
            Optional<Product> product = productRepository.findById(id);

            if(product.isPresent()) {
                productReviews = productReviewRepository.findByProduct(product.get());
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        return productReviews;
    }

    
    
}
