package com.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Nationalized;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class ShippingFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nationalized
    private String address;
    private int shippingFee;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastUpdate;

    @ManyToOne
    @JoinColumn( name = "user_system_id")
    private UserSystem userSystem;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getShippingFee() {
        return shippingFee;
    }

    public void setShippingFee(int shippingFee) {
        this.shippingFee = shippingFee;
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
