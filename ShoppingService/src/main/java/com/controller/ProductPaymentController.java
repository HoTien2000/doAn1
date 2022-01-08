package com.controller;

import java.util.List;

import com.entity.ProductPayment;
import com.service.ProductPaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/product-payment")
public class ProductPaymentController {
    
    @Autowired
    private ProductPaymentService productPaymentService;

    @GetMapping("/find-by-payment")
    public List<ProductPayment> findByPayment(@RequestParam("id") Long id) {
        List<ProductPayment> productPayments = productPaymentService.findByPayment(id);

        return productPayments;
    }
}
