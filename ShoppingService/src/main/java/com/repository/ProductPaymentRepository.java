package com.repository;

import java.util.List;

import com.entity.Payment;
import com.entity.ProductPayment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductPaymentRepository extends JpaRepository<ProductPayment, Long> {
    List<ProductPayment> findByPayment(Payment payment);

    List<ProductPayment> findByPaymentInOrderByQuantityDesc(List<Payment> payment);

    List<ProductPayment> findByPaymentIn(List<Payment> payment);
}
