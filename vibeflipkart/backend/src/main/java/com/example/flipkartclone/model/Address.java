package com.example.flipkartclone.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "addresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String name;
    
    @NotBlank
    private String line1;
    
    private String line2;
    
    @NotBlank
    private String city;
    
    @NotBlank
    private String state;
    
    @NotBlank
    private String postalCode;
    
    @NotBlank
    private String country;
    
    @NotBlank
    private String phone;
    
    private Boolean isDefault = false;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}