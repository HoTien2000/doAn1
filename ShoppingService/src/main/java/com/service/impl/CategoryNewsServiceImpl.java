package com.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.entity.CategoryNews;
import com.entity.UserSystem;
import com.repository.CategoryNewsRepository;
import com.repository.UserSystemRepository;
import com.service.CategoryNewsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CategoryNewsServiceImpl implements CategoryNewsService {

    @Autowired
    private CategoryNewsRepository categoryNewsRepository;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Override
    public CategoryNews save(CategoryNews categoryNews) {
        try{
            categoryNews.setLastUpdate(LocalDate.now());
            
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            categoryNews.setUserSystem(userSystem);

            return categoryNewsRepository.save(categoryNews);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<CategoryNews> findAll() {
        List<CategoryNews> categories = categoryNewsRepository.findAll();

        return categories;
    }

    @Override
    public CategoryNews findById(Long id) {
        Optional<CategoryNews> category = categoryNewsRepository.findById(id);
        
        if(category.isPresent()) {
            return category.get();
        }

        return null;
    }

    @Override
    public CategoryNews update(CategoryNews categoryNews) {
        try{
            categoryNews.setLastUpdate(LocalDate.now());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            categoryNews.setUserSystem(userSystem);

            return categoryNewsRepository.save(categoryNews);
        }catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        categoryNewsRepository.deleteById(id);       
    }
    
    
}
