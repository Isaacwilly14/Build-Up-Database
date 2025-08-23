package com.cropmanager.controller;

import com.cropmanager.model.User;
import com.cropmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users") // Base URL for all user-related endpoints
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping // Maps GET requests to /api/users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}