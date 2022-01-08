package com.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.entity.ProductType;
import com.entity.UserSystem;
import com.repository.ProductTypeRepository;
import com.repository.UserSystemRepository;
import com.service.ProductTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProductTypeServiceImpl implements ProductTypeService {
    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Override
    public ProductType save(ProductType productType) {
        try{
            productType.setLastUpdate(LocalDate.now());
            
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            productType.setUserSystem(userSystem);

            return productTypeRepository.save(productType);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<ProductType> findAll() {
        List<ProductType> productTypes = productTypeRepository.findAll();

        return productTypes;
    }

    @Override
    public ProductType findById(Long id) {
        Optional<ProductType> productType = productTypeRepository.findById(id);
        
        if(productType.isPresent()) {
            return productType.get();
        }

        return null;
    }

    @Override
    public ProductType update(ProductType productType) {
        try{
            productType.setLastUpdate(LocalDate.now());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            productType.setUserSystem(userSystem);

            return productTypeRepository.save(productType);
        }catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        productTypeRepository.deleteById(id);     
    }
}
