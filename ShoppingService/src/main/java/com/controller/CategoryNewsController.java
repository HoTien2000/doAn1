package com.controller;

import java.util.List;

import com.entity.CategoryNews;
import com.payload.MessageResponse;
import com.service.CategoryNewsService;

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
@RequestMapping(path = "/api/category-news", produces = "application/json")
public class CategoryNewsController {
    
    @Autowired
    private CategoryNewsService categoryNewsService;

    @PostMapping("/save")
    public ResponseEntity<MessageResponse> save (@RequestBody CategoryNews categoryNews) {
        CategoryNews result = categoryNewsService.save(categoryNews);

        if(result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<CategoryNews>> findAll() {
        List<CategoryNews> categoryNews = categoryNewsService.findAll();

        return ResponseEntity.ok(categoryNews);
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<CategoryNews> findById(@PathVariable Long id) {
        CategoryNews categoryNews = categoryNewsService.findById(id);

        return ResponseEntity.ok(categoryNews);
    }

    @PutMapping("/update")
    public ResponseEntity<MessageResponse> update(@RequestBody CategoryNews categoryNews) {
        CategoryNews result = categoryNewsService.update(categoryNews);

        if(result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try{
            categoryNewsService.delete(id);

            return ResponseEntity.ok(new MessageResponse("success"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }
}
