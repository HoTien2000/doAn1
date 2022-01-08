package com.service;

import java.util.List;

import com.entity.Category;

public interface CategoryService {
    
    Category save(Category category);

    List<Category> findAll();

    Category findById(Long id);

    Category update(Category category);

    void delete(Long id);
}
