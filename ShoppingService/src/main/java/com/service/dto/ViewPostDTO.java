package com.service.dto;

import java.util.List;

import com.entity.News;

public class ViewPostDTO {
    private News news;
    private List<News> fiveBestNew;
    private List<News> related;

    public News getNews() {
        return news;
    }

    public void setNews(News news) {
        this.news = news;
    }

    public List<News> getFiveBestNew() {
        return fiveBestNew;
    }

    public void setFiveBestNew(List<News> fiveBestNew) {
        this.fiveBestNew = fiveBestNew;
    }

    public List<News> getRelated() {
        return related;
    }

    public void setRelated(List<News> related) {
        this.related = related;
    }

}
