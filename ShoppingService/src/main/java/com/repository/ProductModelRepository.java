package com.repository;

import com.entity.ProductModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductModelRepository extends JpaRepository<ProductModel, Long> {

}
