package com.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.JoinColumn;

import org.hibernate.annotations.Nationalized;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class UserSystem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    @Nationalized
    private String fullName;
    @Nationalized
    private String gender;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    private String phone;
    @Nationalized
    private String specificAddress;
    @Nationalized
    private String wards;
    @Nationalized
    private String district;
    @Nationalized
    private String province;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastUpdate;

    @ManyToMany
	@JoinTable(name = "user_system_role", joinColumns = @JoinColumn(name = "user_system_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "userSystem")
    @JsonIgnore
    private List<Category> categories = new ArrayList<>();

    @OneToMany(mappedBy = "userSystem")
    @JsonIgnore
    private List<CategoryNews> categoryNews = new ArrayList<>();

    @OneToMany(mappedBy = "userSystem")
    @JsonIgnore
    private List<News> news = new ArrayList<>();

    @OneToMany(mappedBy = "userSystem")
    @JsonIgnore
    private List<ProductType> productTypes = new ArrayList<>();

    @OneToMany(mappedBy = "userSystem")
    @JsonIgnore
    private List<ProductModel> productModels = new ArrayList<>();

    @OneToMany(mappedBy = "userSystem")
    @JsonIgnore
    private List<Product> products = new ArrayList<>();

    @OneToMany(mappedBy = "userSystem")
    @JsonIgnore
    private List<Cart> carts = new ArrayList<>();

    @OneToMany(mappedBy = "userSystem")
    @JsonIgnore
    private List<Payment> payments = new ArrayList<>();

    @OneToMany(mappedBy = "userSystem")
    @JsonIgnore
    private List<ShippingFee> shippingFees = new ArrayList<>();

    @OneToMany(mappedBy = "userSystem")
    @JsonIgnore
    private List<DiscountCode> discountCodes = new ArrayList<>();

    @OneToMany(mappedBy = "userSystem")
    @JsonIgnore
    private List<ProductReview> productReviews = new ArrayList<>();

    @OneToOne(mappedBy = "userSystem")
    @JsonIgnore
    private Introduction introduction;

    @OneToMany(mappedBy = "userSystem")
    @JsonIgnore
    private List<PasswordResetToken> passwordResetTokens = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSpecificAddress() {
        return specificAddress;
    }

    public void setSpecificAddress(String specificAddress) {
        this.specificAddress = specificAddress;
    }

    public String getWards() {
        return wards;
    }

    public void setWards(String wards) {
        this.wards = wards;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public LocalDate getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDate lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public List<CategoryNews> getCategoryNews() {
        return categoryNews;
    }

    public void setCategoryNews(List<CategoryNews> categoryNews) {
        this.categoryNews = categoryNews;
    }

    public List<News> getNews() {
        return news;
    }

    public void setNews(List<News> news) {
        this.news = news;
    }

    public List<ProductType> getProductTypes() {
        return productTypes;
    }

    public void setProductTypes(List<ProductType> productTypes) {
        this.productTypes = productTypes;
    }

    public List<ProductModel> getProductModels() {
        return productModels;
    }

    public void setProductModels(List<ProductModel> productModels) {
        this.productModels = productModels;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public List<Cart> getCarts() {
        return carts;
    }

    public void setCarts(List<Cart> carts) {
        this.carts = carts;
    }

    public List<Payment> getPayments() {
        return payments;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }

    public List<ShippingFee> getShippingFees() {
        return shippingFees;
    }

    public void setShippingFees(List<ShippingFee> shippingFees) {
        this.shippingFees = shippingFees;
    }

    public List<DiscountCode> getDiscountCodes() {
        return discountCodes;
    }

    public void setDiscountCodes(List<DiscountCode> discountCodes) {
        this.discountCodes = discountCodes;
    }

    public List<ProductReview> getProductReviews() {
        return productReviews;
    }

    public void setProductReviews(List<ProductReview> productReviews) {
        this.productReviews = productReviews;
    }

    public Introduction getIntroduction() {
        return introduction;
    }

    public void setIntroduction(Introduction introduction) {
        this.introduction = introduction;
    }

    public List<PasswordResetToken> getPasswordResetTokens() {
        return passwordResetTokens;
    }

    public void setPasswordResetTokens(List<PasswordResetToken> passwordResetTokens) {
        this.passwordResetTokens = passwordResetTokens;
    }
    
}
