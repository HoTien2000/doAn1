package com.service.dto;

import java.time.LocalDate;

import com.entity.UserSystem;

public class PaymentDTO {
    private Long id;
    private LocalDate lastUpdate;
    private String shipingAddress;
    private int shippingFee;
    private String discountCode;
    private int totalDiscount;
    private int totalQuantity;
    private Long total;
    private Long actualMoney;
    private int status;
    private UserSystem userSystem;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public LocalDate getLastUpdate() {
        return lastUpdate;
    }
    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }
    public String getShipingAddress() {
        return shipingAddress;
    }
    public void setShipingAddress(String shipingAddress) {
        this.shipingAddress = shipingAddress;
    }
    public int getShippingFee() {
        return shippingFee;
    }
    public void setShippingFee(int shippingFee) {
        this.shippingFee = shippingFee;
    }
    public String getDiscountCode() {
        return discountCode;
    }
    public void setDiscountCode(String discountCode) {
        this.discountCode = discountCode;
    }
    public int getTotalDiscount() {
        return totalDiscount;
    }
    public void setTotalDiscount(int totalDiscount) {
        this.totalDiscount = totalDiscount;
    }
    public int getTotalQuantity() {
        return totalQuantity;
    }
    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }
    public Long getTotal() {
        return total;
    }
    public void setTotal(Long total) {
        this.total = total;
    }
    public Long getActualMoney() {
        return actualMoney;
    }
    public void setActualMoney(Long actualMoney) {
        this.actualMoney = actualMoney;
    }
    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }
    public UserSystem getUserSystem() {
        return userSystem;
    }
    public void setUserSystem(UserSystem userSystem) {
        this.userSystem = userSystem;
    }

    
    
}
