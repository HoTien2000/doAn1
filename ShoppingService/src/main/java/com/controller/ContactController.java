package com.controller;

import java.util.List;

import com.entity.Contact;
import com.payload.MessageResponse;
import com.service.ContactService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/contact")
public class ContactController {
    
    @Autowired
    private ContactService contactService;

    @PostMapping("/all/save")
    public ResponseEntity<MessageResponse> save (@RequestBody Contact contact) {
        Contact result = contactService.save(contact);

        if(result != null) {
            return ResponseEntity.ok(new MessageResponse("success"));
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<Contact>> findAll() {
        List<Contact> contacts = contactService.findAll();

        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity<Contact> findById(@PathVariable Long id) {
        Contact contact = contactService.findById(id);

        return ResponseEntity.ok(contact);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        try{
            contactService.delete(id);

            return ResponseEntity.ok(new MessageResponse("success"));
        } catch(Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(new MessageResponse("failed"));
    }
}
