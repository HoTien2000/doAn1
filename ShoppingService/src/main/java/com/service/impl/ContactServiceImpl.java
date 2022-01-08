package com.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.entity.Contact;
import com.repository.ContactRepository;
import com.service.ContactService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ContactServiceImpl implements ContactService {
    
    @Autowired
    private ContactRepository contactRepository;

    @Override
    public Contact save(Contact contact) {
        try {
            contact.setDateCreate(LocalDate.now());

            return contactRepository.save(contact);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Contact> findAll() {
        List<Contact> contacts = new ArrayList<>();
        
        try{
            contacts = contactRepository.findAll();
        } catch(Exception e) {
            e.printStackTrace();
        }

        return contacts;
    }

    @Override
    public Contact findById(Long id) {
        Optional<Contact> optional = contactRepository.findById(id);

        if(optional.isPresent()) {
            return optional.get();
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        contactRepository.deleteById(id);
    }

}
