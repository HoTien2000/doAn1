package com.repository;

import java.time.LocalDate;
import java.util.List;

import com.entity.Payment;
import com.entity.UserSystem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserSystemOrderByLastUpdateDesc(UserSystem userSystem);

    List<Payment> findByStatusGreaterThan(int status);

    List<Payment> findByLastUpdateAndStatusGreaterThan(LocalDate lastUpdate, int status);

    List<Payment> findByLastUpdateAndStatus(LocalDate lastUpdate, int status);

    List<Payment> findByLastUpdate(LocalDate lastUpdate);

    List<Payment> findByStatus(int status);

    List<Payment> findByStatusGreaterThanAndLastUpdateBetween(int status, LocalDate startDate, LocalDate endDate);

    

}
