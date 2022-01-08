package com.repository;

import java.util.List;

import com.entity.Cart;
import com.entity.Product;
import com.entity.UserSystem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    
    List<Cart> findByUserSystemOrderById(UserSystem userSystem);

    List<Cart> findByProduct(Product product);
}
