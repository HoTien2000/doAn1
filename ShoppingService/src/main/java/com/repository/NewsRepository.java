package com.repository;

import java.util.List;

import com.entity.CategoryNews;
import com.entity.News;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findTop4ByCategoryNewsOrderByIdDesc(CategoryNews categoryNews);

    List<News> findTop5ByOrderByIdDesc();

    List<News> findTop4ByCategoryNewsAndIdNotOrderByIdDesc(CategoryNews categoryNews, Long id);

    List<News> findAllByOrderByIdDesc();
}
