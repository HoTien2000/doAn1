package com.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Nationalized;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    
    @Column(length = 4000)
    @Nationalized
    private String content;
    private String image;
    private String rootLink;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastUpdate;

    @ManyToOne
    @JoinColumn( name = "categoryNews_id")
    private CategoryNews categoryNews;

    @ManyToOne
    @JoinColumn( name = "user_system_id")
    private UserSystem userSystem;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getRootLink() {
        return rootLink;
    }

    public void setRootLink(String rootLink) {
        this.rootLink = rootLink;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public UserSystem getUserSystem() {
        return userSystem;
    }

    public void setUserSystem(UserSystem userSystem) {
        this.userSystem = userSystem;
    }

    public CategoryNews getCategoryNews() {
        return categoryNews;
    }

    public void setCategoryNews(CategoryNews categoryNews) {
        this.categoryNews = categoryNews;
    }

    
}
