package com.service;

import java.util.List;

import com.entity.CategoryNews;
import com.entity.News;
import com.service.dto.NewsDTO;
import com.service.dto.ViewPostDTO;

import org.springframework.web.multipart.MultipartFile;

public interface NewsService {
    News save (String news, String categoryNewsId, MultipartFile file);

    List<News> findAll();

    News findById (Long id);

    News update(String news, String categoryNewsId, MultipartFile file);

    void delete(Long id);

    List<NewsDTO> findTopNews();

    List<News> findTopFiveBestNew();

    List<News> findRelated(CategoryNews categoryNews, Long id);

    ViewPostDTO findViewPost(Long id);

    News setData(News news, String url);

    List<News> findByAll();
}
