package com.security.service;

import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

import com.entity.Role;
import com.entity.UserSystem;
import com.repository.UserSystemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    
    @Autowired
    private UserSystemRepository userSystemRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserSystem userSystem = userSystemRepository.findByEmail(username);

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();

        if(userSystem != null) {
            Set<Role> roles = userSystem.getRoles();

            for(Role role : roles) {
                grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
            }

            return new org.springframework.security.core.userdetails.User(userSystem.getEmail(), userSystem.getPassword(),
				grantedAuthorities);
        }

        return null;
    }
}
