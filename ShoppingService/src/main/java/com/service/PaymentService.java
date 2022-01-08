package com.service;

import java.util.List;

import com.entity.Payment;
import com.service.dto.StatisticDTO;

public interface PaymentService {
    
    Payment save(String discountCode, String shipping);

    List<Payment> findByUserSystem();

    List<Payment> findAll();

    Payment findById(Long id);

    void delete(Long id);

    Payment statusOrder(String id, String status);

    List<Payment> findByLastUpdateAndStatus(String lastUpdate, int status);

    List<Payment> findByStatus(int status);

    StatisticDTO reportStatistic(String startDate, String endDate);

}
