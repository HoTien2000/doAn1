package com.service.dto;

import java.util.List;

public class CartTotalDTO {
    private List<CartDTO> cartDTOs;
    private int totalQuantity;
    private int total;

    public List<CartDTO> getCartDTOs() {
        return cartDTOs;
    }

    public void setCartDTOs(List<CartDTO> cartDTOs) {
        this.cartDTOs = cartDTOs;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public int getTotal() {
        return total;
    }
    
    public void setTotal(int total) {
        this.total = total;
    }

    
}
