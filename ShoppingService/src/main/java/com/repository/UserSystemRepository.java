package com.repository;

import com.entity.UserSystem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSystemRepository extends JpaRepository<UserSystem, Long>{
    
    Boolean existsByEmail(String email);

    Boolean existsByPhone(String phone);

    UserSystem findByEmail(String email);

}
