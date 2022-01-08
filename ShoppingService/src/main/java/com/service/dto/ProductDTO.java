package com.service.dto;

import java.time.LocalDate;
import java.util.Set;

import com.entity.Category;
import com.entity.ProductModel;
import com.entity.ProductType;
import com.entity.UserSystem;

public class ProductDTO {
    private Long id;
    private String productName;
    private String introduce;
    private String description;
    private int priceImport;
    private int priceSell;
    private int quantityImport;
    private int quantitySell;
    private int inventory;
    private int sale;
    private LocalDate lastUpdate;
    private String image;
    private Set<ProductModel> productModels;
    private Set<ProductType> productTypes;
    private Category category;
    private UserSystem userSystem;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public String getIntroduce() {
        return introduce;
    }
    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public int getPriceImport() {
        return priceImport;
    }
    public void setPriceImport(int priceImport) {
        this.priceImport = priceImport;
    }
    public int getPriceSell() {
        return priceSell;
    }
    public void setPriceSell(int priceSell) {
        this.priceSell = priceSell;
    }
    public int getQuantityImport() {
        return quantityImport;
    }
    public void setQuantityImport(int quantityImport) {
        this.quantityImport = quantityImport;
    }
    public int getQuantitySell() {
        return quantitySell;
    }
    public void setQuantitySell(int quantitySell) {
        this.quantitySell = quantitySell;
    }
    public int getInventory() {
        return inventory;
    }
    public void setInventory(int inventory) {
        this.inventory = inventory;
    }
    public int getSale() {
        return sale;
    }
    public void setSale(int sale) {
        this.sale = sale;
    }
    public LocalDate getLastUpdate() {
        return lastUpdate;
    }
    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public Set<ProductModel> getProductModels() {
        return productModels;
    }
    public void setProductModels(Set<ProductModel> productModels) {
        this.productModels = productModels;
    }
    public Set<ProductType> getProductTypes() {
        return productTypes;
    }
    public void setProductTypes(Set<ProductType> productTypes) {
        this.productTypes = productTypes;
    }
    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
    public UserSystem getUserSystem() {
        return userSystem;
    }
    public void setUserSystem(UserSystem userSystem) {
        this.userSystem = userSystem;
    }

    
}
