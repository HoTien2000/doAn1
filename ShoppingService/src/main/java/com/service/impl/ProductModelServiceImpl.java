package com.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.entity.ProductModel;
import com.entity.UserSystem;
import com.repository.ProductModelRepository;
import com.repository.UserSystemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProductModelServiceImpl implements ProductModelService {
    @Autowired
    private ProductModelRepository productModelRepository;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Override
    public ProductModel save(ProductModel productModel) {
        try{
            productModel.setLastUpdate(LocalDate.now());
            
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            productModel.setUserSystem(userSystem);

            return productModelRepository.save(productModel);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<ProductModel> findAll() {
        List<ProductModel> productModels = productModelRepository.findAll();

        return productModels;
    }

    @Override
    public ProductModel findById(Long id) {
        Optional<ProductModel> productModel = productModelRepository.findById(id);
        
        if(productModel.isPresent()) {
            return productModel.get();
        }

        return null;
    }

    @Override
    public ProductModel update(ProductModel productModel) {
        try{
            productModel.setLastUpdate(LocalDate.now());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            productModel.setUserSystem(userSystem);

            return productModelRepository.save(productModel);
        }catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        productModelRepository.deleteById(id);     
    }
}
