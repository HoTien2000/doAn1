package com.repository;

import java.util.List;

import com.entity.DiscountCode;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountCodeRepository extends JpaRepository<DiscountCode, Long> {
    List<DiscountCode> findByStatus(int status);
}
