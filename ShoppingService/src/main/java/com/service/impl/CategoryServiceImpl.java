package com.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.entity.Category;
import com.entity.UserSystem;
import com.repository.CategoryRepository;
import com.repository.UserSystemRepository;
import com.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Override
    public Category save(Category category) {
        try{
            category.setLastUpdate(LocalDate.now());
            
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            category.setUserSystem(userSystem);

            return categoryRepository.save(category);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Category> findAll() {
        List<Category> categories = categoryRepository.findAll();

        return categories;
    }

    @Override
    public Category findById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        
        if(category.isPresent()) {
            return category.get();
        }

        return null;
    }

    @Override
    public Category update(Category category) {
        try{
            category.setLastUpdate(LocalDate.now());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            category.setUserSystem(userSystem);

            return categoryRepository.save(category);
        }catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);     
    }
    
}
