package com.service;

import java.util.List;

import com.entity.ProductPayment;

public interface ProductPaymentService {
    List<ProductPayment> findByPayment(Long id);
}
