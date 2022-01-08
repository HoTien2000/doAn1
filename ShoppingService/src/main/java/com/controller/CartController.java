package com.controller;

import com.entity.Cart;
import com.payload.MessageResponse;
import com.service.CartService;
import com.service.dto.CartTotalDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/cart")
public class CartController {
    
    @Autowired
    private CartService cartService;

    @PostMapping("/save")
    public ResponseEntity<MessageResponse> save (@RequestParam("productId") String productId, @RequestParam("productModel") String productModel, @RequestParam("productType") String productType, @RequestParam("quantity") String quantity) {
        Cart result = cartService.save(productId, productModel, productType, quantity);
        
        if (result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<Cart> findById(@PathVariable Long id) {
        Cart cart = cartService.findById(id);

        return ResponseEntity.ok().body(cart);
    }

    @GetMapping("/quantity")
    public ResponseEntity<MessageResponse> quantity() {
        try{
            String quantity = cartService.cartQuantity();

            return ResponseEntity.ok(new MessageResponse(quantity));
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/find-all")
    public ResponseEntity<CartTotalDTO> findAll() {
        CartTotalDTO cartTotalDTO = cartService.totalCart();

        return ResponseEntity.ok().body(cartTotalDTO);
    }

    @PutMapping("/update-quantity")
    public ResponseEntity<MessageResponse> updateQuantity(@RequestParam("id") String id, @RequestParam("quantity") String quantity) {
        Cart result = cartService.updateQuantity(id, quantity);

        if (result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @PutMapping("/update-model")
    public ResponseEntity<MessageResponse> updateProductModel(@RequestParam("id") String id, @RequestParam("productModel") String productModel) {
        Cart result = cartService.updateProductModel(id, productModel);

        if (result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @PutMapping("/update-type")
    public ResponseEntity<MessageResponse> updateProductType(@RequestParam("id") String id, @RequestParam("productType") String productType) {
        Cart result = cartService.updateProductType(id, productType);

        if (result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try{
            cartService.delete(id);
            return ResponseEntity.ok().body(new MessageResponse("success"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok().body(new MessageResponse("failed"));
    }
    
}
