package com.service;

import java.util.List;

import com.entity.ShippingFee;

public interface ShippingFeeService {

    ShippingFee save (ShippingFee shippingFee);

    List<ShippingFee> findAll();

    ShippingFee findById (Long id);

    ShippingFee update (ShippingFee shippingFee);

    void delete (Long id);

    ShippingFee findByAddress();

}
