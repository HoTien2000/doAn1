package com.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.Nationalized;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nationalized
    @Column(length = 250)
    private String productName;
    @Nationalized
    @Column(length = 500)
    private String introduce;
    @Nationalized
    @Column(length = 5000)
    private String description;
    private int priceImport;
    private int priceSell;
    private int quantityImport;
    private int quantitySell;
    private int inventory;
    private int sale;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastUpdate;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<ProductImage> productImages = new ArrayList<>();

    @ManyToOne
    @JoinColumn( name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn( name = "user_system_id")
    private UserSystem userSystem;

    @ManyToMany
	@JoinTable(name = "product_model_product", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "product_model_id"))
	private Set<ProductModel> productModels = new HashSet<>();

    @ManyToMany
	@JoinTable(name = "product_type_product", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "product_type_id"))
	private Set<ProductType> productTypes = new HashSet<>();

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<Cart> carts = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<ProductReview> productReviews = new ArrayList<>();

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

    public List<ProductImage> getProductImages() {
        return productImages;
    }

    public void setProductImages(List<ProductImage> productImages) {
        this.productImages = productImages;
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

    public List<Cart> getCarts() {
        return carts;
    }

    public void setCarts(List<Cart> carts) {
        this.carts = carts;
    }

    
}
