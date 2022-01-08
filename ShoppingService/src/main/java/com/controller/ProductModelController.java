package com.controller;

import java.util.List;

import com.entity.ProductModel;
import com.payload.MessageResponse;
import com.service.impl.ProductModelService;

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
@RequestMapping(path = "/api/product-model", produces = "application/json")
public class ProductModelController {
    
    @Autowired
    private ProductModelService productModelService;

    @PostMapping("/save")
    public ResponseEntity<MessageResponse> save (@RequestBody ProductModel productModel) {
        ProductModel result = productModelService.save(productModel);

        if(result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<ProductModel>> findAll() {
        List<ProductModel> productModels = productModelService.findAll();

        return ResponseEntity.ok(productModels);
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<ProductModel> findById(@PathVariable Long id) {
        ProductModel productModel = productModelService.findById(id);

        return ResponseEntity.ok(productModel);
    }

    @PutMapping("/update")
    public ResponseEntity<MessageResponse> update(@RequestBody ProductModel productModel) {
        ProductModel result = productModelService.update(productModel);

        if(result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try{
            productModelService.delete(id);

            return ResponseEntity.ok(new MessageResponse("success"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }
}
