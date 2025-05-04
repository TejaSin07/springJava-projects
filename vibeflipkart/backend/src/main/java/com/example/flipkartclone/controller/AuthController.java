package com.example.flipkartclone.controller;

import com.example.flipkartclone.dto.AuthResponse;
import com.example.flipkartclone.dto.LoginRequest;
import com.example.flipkartclone.dto.RegisterRequest;
import com.example.flipkartclone.dto.UserDto;
import com.example.flipkartclone.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));
    }
    
    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser() {
        return ResponseEntity.ok(authService.getCurrentUser());
    }
}