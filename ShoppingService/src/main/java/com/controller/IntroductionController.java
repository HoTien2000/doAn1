package com.controller;

import java.util.List;

import com.entity.Introduction;
import com.payload.MessageResponse;
import com.service.IntroductionService;

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
@RequestMapping(path = "/api/introduction")
public class IntroductionController {
    
    @Autowired
    private IntroductionService introductionService;

    @PostMapping("/save")
    public ResponseEntity<MessageResponse> save (@RequestBody Introduction introduction) {
        Introduction result = introductionService.save(introduction);

        if(result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<Introduction>> findAll() {
        List<Introduction> introductions = introductionService.findAll();

        return ResponseEntity.ok(introductions);
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<Introduction> findById(@PathVariable Long id) {
        Introduction introduction = introductionService.findById(id);

        return ResponseEntity.ok(introduction);
    }

    @PutMapping("/update")
    public ResponseEntity<MessageResponse> update(@RequestBody Introduction introduction) {
        Introduction result = introductionService.update(introduction);

        if(result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try{
            introductionService.delete(id);

            return ResponseEntity.ok(new MessageResponse("success"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/all/find-all")
    public ResponseEntity<List<Introduction>> findByCategory() {
        List<Introduction> introductions = introductionService.findAll();

        return ResponseEntity.ok(introductions);
    }
}
