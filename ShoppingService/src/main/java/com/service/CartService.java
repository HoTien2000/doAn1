package com.service;

import java.util.List;

import com.entity.Cart;
import com.entity.Product;
import com.service.dto.CartDTO;
import com.service.dto.CartTotalDTO;

public interface CartService {
    Cart save(String productId, String productModel, String productType, String quantity);

    Cart findById(Long id);

    String cartQuantity();

    List<CartDTO> findAll();

    CartTotalDTO totalCart();

    Cart updateQuantity(String id, String quantity);

    Cart updateProductModel(String id, String productModel);

    Cart updateProductType(String id, String productType);

    void delete(Long id);

    Product updateQuantityProduct(Long id, int quantity);
}
