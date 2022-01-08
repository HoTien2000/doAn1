package com.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    private LocalDate lastUpdate;
    
    @ManyToOne
    @JoinColumn( name = "product_model_id")
    private ProductModel productModel;

    @ManyToOne
    @JoinColumn( name = "product_type_id")
    private ProductType productType;
    
    @ManyToOne
    @JoinColumn( name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn( name = "user_system_id")
    private UserSystem userSystem;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public ProductModel getProductModel() {
        return productModel;
    }

    public void setProductModel(ProductModel productModel) {
        this.productModel = productModel;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public UserSystem getUserSystem() {
        return userSystem;
    }

    public void setUserSystem(UserSystem userSystem) {
        this.userSystem = userSystem;
    }

    
}
