package com.service;

import java.util.List;

import com.entity.Introduction;

public interface IntroductionService {
     
    Introduction save(Introduction introduction);

    List<Introduction> findAll();

    Introduction findById(Long id);

    Introduction update(Introduction introduction);

    void delete(Long id);
}
