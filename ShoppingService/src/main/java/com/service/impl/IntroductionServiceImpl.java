package com.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.entity.Introduction;
import com.entity.UserSystem;
import com.repository.IntroductionRepository;
import com.repository.UserSystemRepository;
import com.service.IntroductionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class IntroductionServiceImpl implements IntroductionService {
    
    @Autowired
    private IntroductionRepository introductionRepository;

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Override
    public Introduction save(Introduction introduction) {
        try{
            introduction.setLastUpdate(LocalDate.now());
            
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            introduction.setUserSystem(userSystem);

            List<Introduction> introductions = introductionRepository.findAll();

            introductionRepository.deleteAll(introductions);

            return introductionRepository.save(introduction);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Introduction> findAll() {
        List<Introduction> introductions = introductionRepository.findAll();

        return introductions;
    }

    @Override
    public Introduction findById(Long id) {
        Optional<Introduction> introduction = introductionRepository.findById(id);
        
        if(introduction.isPresent()) {
            return introduction.get();
        }

        return null;
    }

    @Override
    public Introduction update(Introduction introduction) {
        try{
            introduction.setLastUpdate(LocalDate.now());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserSystem userSystem = userSystemRepository.findByEmail(authentication.getName());

            introduction.setUserSystem(userSystem);

            return introductionRepository.save(introduction);
        }catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        introductionRepository.deleteById(id);     
    }
    
}
