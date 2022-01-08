package com.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Nationalized;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

import javax.persistence.Entity;

@Entity
public class Introduction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   

    @Nationalized
    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastUpdate;

    @OneToOne
    @JoinColumn( name = "user_system_id")
    private UserSystem userSystem;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    
}
