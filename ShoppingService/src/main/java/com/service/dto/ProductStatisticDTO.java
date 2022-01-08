package com.service.dto;

import java.util.List;

import com.entity.Product;

public class ProductStatisticDTO {
    private List<Product> products;
    private int quantityProduct;
    private int quantityImport;
    private int quantitySell;
    private int inventory;
    
    public List<Product> getProducts() {
        return products;
    }
    public void setProducts(List<Product> products) {
        this.products = products;
    }
    public int getQuantityProduct() {
        return quantityProduct;
    }
    public void setQuantityProduct(int quantityProduct) {
        this.quantityProduct = quantityProduct;
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

    
}
