package com.cropmanager.service;

import com.cropmanager.model.User;
import com.cropmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // This is crucial: the username, password, and authorities must be set correctly
            return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(), // The password must be the HASHED password from the database
                user.getAuthorities() // Assumes you have a method to get authorities
            );
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}