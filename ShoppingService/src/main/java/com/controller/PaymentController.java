package com.controller;

import java.util.List;

import com.entity.Payment;
import com.payload.MessageResponse;
import com.service.PaymentService;
import com.service.dto.StatisticDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/payment")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/save")
    public ResponseEntity<MessageResponse> save(@RequestParam(name = "discountCode", required = false) String discountCode, @RequestParam("shippingFee") String shippingFee) {
        Payment result = paymentService.save(discountCode, shippingFee);

        if (result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<Payment>> findAll() {
        List<Payment> payments = paymentService.findAll();

        return ResponseEntity.ok().body(payments);
    }

    @GetMapping("/find-user")
    public ResponseEntity<List<Payment>> findByUserSystem() {
        List<Payment> payments = paymentService.findByUserSystem();

        return ResponseEntity.ok().body(payments);
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<Payment> findById(@PathVariable Long id) {
        Payment payment = paymentService.findById(id);

        return ResponseEntity.ok().body(payment);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try{
            paymentService.delete(id);

            return ResponseEntity.ok().body(new MessageResponse("success"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok().body(new MessageResponse("failed"));
    }

    @PutMapping("/status-order")
    public ResponseEntity<MessageResponse> statusOrder(@RequestParam("id") String id, @RequestParam("status") String status) {

        Payment result = paymentService.statusOrder(id, status);

        if (result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));

    }

    @GetMapping("/search")
    public ResponseEntity<List<Payment>> findByLastUpdateAndStatus(@RequestParam("lastUpdate") String lastUpdate, @RequestParam("status") int status) {
        List<Payment> payments = paymentService.findByLastUpdateAndStatus(lastUpdate, status);

        return ResponseEntity.ok().body(payments);
    }

    @GetMapping("/find-status")
    public ResponseEntity<List<Payment>> findByStatus(@RequestParam("status") int status) {
        List<Payment> payments = paymentService.findByStatus(status);

        return ResponseEntity.ok().body(payments);
    }

    @GetMapping("/statistic-report")
    public ResponseEntity<StatisticDTO> statisticRepost(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {
        StatisticDTO statisticDTO = paymentService.reportStatistic(startDate, endDate);

        return ResponseEntity.ok().body(statisticDTO);
    }

}
