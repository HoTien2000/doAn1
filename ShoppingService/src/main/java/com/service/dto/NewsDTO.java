package com.service.dto;

import java.util.List;

import com.entity.News;

public class NewsDTO {
    private String categoryName;
    private List<News> news;

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<News> getNews() {
        return news;
    }

    public void setNews(List<News> news) {
        this.news = news;
    }
    
}
