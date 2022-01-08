package com.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.entity.ShippingFee;
import com.entity.UserSystem;
import com.repository.ShippingFeeRepository;
import com.repository.UserSystemRepository;
import com.service.ShippingFeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ShippingFeeServiceImpl implements ShippingFeeService {

    @Autowired
    private ShippingFeeRepository shippingFeeRepository;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Override
    public ShippingFee save(ShippingFee shippingFee) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

        shippingFee.setLastUpdate(LocalDate.now());
        shippingFee.setUserSystem(userSystem);

        return shippingFeeRepository.save(shippingFee);
    }

    @Override
    public List<ShippingFee> findAll() {
        List<ShippingFee> shippingFees = shippingFeeRepository.findAll();

        return shippingFees;
    }

    @Override
    public ShippingFee findById(Long id) {
        Optional<ShippingFee> shippingFeeOptional = shippingFeeRepository.findById(id);

        if(shippingFeeOptional.isPresent()) {
            return shippingFeeOptional.get();
        }

        return null;
    }

    @Override
    public ShippingFee update(ShippingFee shippingFee) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

        shippingFee.setLastUpdate(LocalDate.now());
        shippingFee.setUserSystem(userSystem);

        return shippingFeeRepository.save(shippingFee);
    }

    @Override
    public void delete(Long id) {
        shippingFeeRepository.deleteById(id);        
    }

    @Override
    public ShippingFee findByAddress() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            ShippingFee shippingFee = shippingFeeRepository.findByAddress(userSystem.getProvince());

            return shippingFee;
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return null;
    }
    
}
