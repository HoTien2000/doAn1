package com.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastUpdate;
    private String shipingAddress;
    private int shippingFee;
    private String discountCode;
    private int totalDiscount;
    private int totalQuantity;
    private Long total;
    private int status;

    @OneToMany(mappedBy = "payment")
    @JsonIgnore
    private List<ProductPayment> productPayments = new ArrayList<>();

    @ManyToOne
    @JoinColumn( name = "user_system_id")
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<ProductPayment> getProductPayments() {
        return productPayments;
    }

    public void setProductPayments(List<ProductPayment> productPayments) {
        this.productPayments = productPayments;
    }

    public UserSystem getUserSystem() {
        return userSystem;
    }

    public void setUserSystem(UserSystem userSystem) {
        this.userSystem = userSystem;
    } 

    
}
