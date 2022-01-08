package com.controller;

import java.util.List;

import com.entity.ProductType;
import com.payload.MessageResponse;
import com.service.ProductTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/product-type", produces = "application/json")
public class ProductTypeController {
    
    @Autowired
    private ProductTypeService productTypeService;

    @PostMapping("/save")
    public ResponseEntity<MessageResponse> save (@RequestBody ProductType productType) {
        ProductType result = productTypeService.save(productType);

        if(result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<ProductType>> findAll() {
        List<ProductType> productTypes = productTypeService.findAll();

        return ResponseEntity.ok(productTypes);
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<ProductType> findById(@PathVariable Long id) {
        ProductType productType = productTypeService.findById(id);

        return ResponseEntity.ok(productType);
    }

    @PutMapping("/update")
    public ResponseEntity<MessageResponse> update(@RequestBody ProductType productType) {
        ProductType result = productTypeService.update(productType);

        if(result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try{
            productTypeService.delete(id);

            return ResponseEntity.ok(new MessageResponse("success"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }
}
