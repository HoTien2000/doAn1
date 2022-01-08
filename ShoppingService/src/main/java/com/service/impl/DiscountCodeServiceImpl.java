package com.service.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.entity.DiscountCode;
import com.entity.UserSystem;
import com.repository.DiscountCodeRepository;
import com.repository.UserSystemRepository;
import com.service.DiscountCodeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class DiscountCodeServiceImpl implements DiscountCodeService{

    @Autowired
    private DiscountCodeRepository discountCodeRepository;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Override
    public void save(String quantity, String discount) {
        int quantityDis = Integer.parseInt(quantity);
        int percentage = Integer.parseInt(discount);

        List<DiscountCode> discountCodes = new ArrayList<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

        for(int i = 0; i < quantityDis; i++) {
            Random random = new Random();
            int number = random.nextInt(1000);
            
            String localDate = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));

            discount = String.valueOf(number).concat(localDate);

            DiscountCode discountCode = new DiscountCode();

            discountCode.setDiscountCode(discount);
            discountCode.setDiscount(percentage);
            discountCode.setLastUpdate(LocalDate.now());
            discountCode.setStatus(0);
            discountCode.setUserSystem(userSystem);

            discountCodes.add(discountCode);
        }

        discountCodeRepository.saveAll(discountCodes);
    }

    @Override
    public DiscountCode findById(Long id) {
        Optional<DiscountCode> optional = discountCodeRepository.findById(id);

        if(optional.isPresent()) {
            return optional.get();
        }

        return null;
    }

    @Override
    public DiscountCode update(DiscountCode discountCode) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

        discountCode.setStatus(0);
        discountCode.setUserSystem(userSystem);
        discountCode.setLastUpdate(LocalDate.now());

        DiscountCode result = discountCodeRepository.save(discountCode);

        return result;
    }

    @Override
    public List<DiscountCode> findAll() {
        List<DiscountCode> discountCodes = discountCodeRepository.findAll();

        return discountCodes;
    }

    @Override
    public void delete(Long id) {
       discountCodeRepository.deleteById(id);        
    }

    @Override
    public DiscountCode getDiscountCode() {
        List<DiscountCode> discountCodes = discountCodeRepository.findByStatus(0);
        if(discountCodes.size() > 0) {
            return discountCodes.get(0);
        }

        return null;
    }
    
}
