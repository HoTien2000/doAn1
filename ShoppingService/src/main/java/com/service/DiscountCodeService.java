package com.service;

import java.util.List;

import com.entity.DiscountCode;

public interface DiscountCodeService {
    
    void save(String quantity, String discount);

    DiscountCode findById(Long id);

    DiscountCode update(DiscountCode discountCode);

    List<DiscountCode> findAll();

    void delete(Long id);

    DiscountCode getDiscountCode();
}
