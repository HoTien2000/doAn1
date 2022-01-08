package com.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.entity.Payment;
import com.entity.ProductPayment;
import com.repository.PaymentRepository;
import com.repository.ProductPaymentRepository;
import com.service.ProductPaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProductPaymentServiceImpl implements ProductPaymentService {

    @Autowired
    private ProductPaymentRepository productPaymentRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public List<ProductPayment> findByPayment(Long id) {
        Optional<Payment> paymentOptional = paymentRepository.findById(id);

        List<ProductPayment> productPayments = new ArrayList<>();

        if(paymentOptional.isPresent()) {
            productPayments = productPaymentRepository.findByPayment(paymentOptional.get());

            return productPayments;
        }
        
        return productPayments;
    }

}
