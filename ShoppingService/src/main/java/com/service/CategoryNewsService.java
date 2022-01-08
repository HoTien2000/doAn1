package com.service;

import java.util.List;

import com.entity.CategoryNews;

public interface CategoryNewsService {
    CategoryNews save(CategoryNews categoryNews);

    List<CategoryNews> findAll();

    CategoryNews findById(Long id);

    CategoryNews update(CategoryNews categoryNews);

    void delete(Long id);
}
