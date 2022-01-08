package com.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import com.entity.Product;
import com.entity.ProductImage;
import com.repository.ProductImageRepository;
import com.service.ProductImageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProductImageServiceImpl implements ProductImageService {

    @Autowired
    private ProductImageRepository productImageRepository;

    @Override
    public List<ProductImage> findByProduct(Product product) {
        List<ProductImage> productImages = productImageRepository.findByProduct(product);

        return productImages;
    }
}
