package com.repository;

import com.entity.ShippingFee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingFeeRepository extends JpaRepository<ShippingFee, Long> {

    Boolean existsByAddress(String address);

    ShippingFee findByAddress(String address);
}
