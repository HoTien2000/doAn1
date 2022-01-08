package com.controller;

import java.util.List;

import com.entity.DiscountCode;
import com.payload.MessageResponse;
import com.service.DiscountCodeService;

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
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/discount-code")
public class DiscountCodeController {
    
    @Autowired
    private DiscountCodeService discountCodeService;

    @PostMapping("/save")
    public ResponseEntity<MessageResponse> save(@RequestParam("quantity") String quantity, @RequestParam("discount") String discount) {
        try{
            discountCodeService.save(quantity, discount);

            return ResponseEntity.ok().body(new MessageResponse("success"));
        } catch(Exception e) {
            e.printStackTrace();
        }
        
        return ResponseEntity.ok().body(new MessageResponse("failed"));
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<DiscountCode>> findAll() {
        List<DiscountCode> discountCodes = discountCodeService.findAll();

        return ResponseEntity.ok().body(discountCodes);
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<DiscountCode> findById(@PathVariable Long id) {
        DiscountCode discountCode = discountCodeService.findById(id);

        return ResponseEntity.ok().body(discountCode);
    }

    @PutMapping("/update")
    public ResponseEntity<MessageResponse> update(@RequestBody DiscountCode discountCode) {
        DiscountCode result = discountCodeService.update(discountCode);

        if (result != null) {
            return ResponseEntity.ok().body(new MessageResponse("success"));
        }

        return ResponseEntity.ok().body(new MessageResponse("failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try{
            discountCodeService.delete(id);

            return ResponseEntity.ok().body(new MessageResponse("success"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok().body(new MessageResponse("failed"));
    }

    @GetMapping("/find-discount-code")
    public ResponseEntity<DiscountCode> findDiscountCode() {
        DiscountCode discountCode = discountCodeService.getDiscountCode();

        return ResponseEntity.ok().body(discountCode);
    }
    
}
