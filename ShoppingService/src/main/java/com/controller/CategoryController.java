package com.controller;

import java.util.List;

import com.entity.Category;
import com.payload.MessageResponse;
import com.service.CategoryService;

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
@RequestMapping(path = "/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/save")
    public ResponseEntity<MessageResponse> save (@RequestBody Category category) {
        Category result = categoryService.save(category);

        if(result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<Category>> findAll() {
        List<Category> categories = categoryService.findAll();

        return ResponseEntity.ok(categories);
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<Category> findById(@PathVariable Long id) {
        Category category = categoryService.findById(id);

        return ResponseEntity.ok(category);
    }

    @PutMapping("/update")
    public ResponseEntity<MessageResponse> update(@RequestBody Category category) {
        Category result = categoryService.update(category);

        if(result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try{
            categoryService.delete(id);

            return ResponseEntity.ok(new MessageResponse("success"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/all/find-all")
    public ResponseEntity<List<Category>> findByCategory() {
        List<Category> categories = categoryService.findAll();

        return ResponseEntity.ok(categories);
    }

    @GetMapping("/all/find-id/{id}")
    public ResponseEntity<Category> findByIdAll(@PathVariable Long id) {
        Category category = categoryService.findById(id);

        return ResponseEntity.ok(category);
    }
}
