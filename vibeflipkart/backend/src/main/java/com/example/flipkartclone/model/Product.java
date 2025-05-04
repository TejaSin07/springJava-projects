package com.example.flipkartclone.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotNull
    @PositiveOrZero
    private BigDecimal currentPrice;
    
    @PositiveOrZero
    private BigDecimal originalPrice;
    
    @PositiveOrZero
    private Integer discount;
    
    private String imageUrl;
    
    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> images = new ArrayList<>();
    
    @NotBlank
    private String category;
    
    @NotBlank
    private String brand;
    
    @NotNull
    @PositiveOrZero
    private Double averageRating;
    
    @NotNull
    @PositiveOrZero
    private Integer ratingCount;
    
    @ElementCollection
    @CollectionTable(name = "product_specs", joinColumns = @JoinColumn(name = "product_id"))
    @MapKeyColumn(name = "spec_key")
    @Column(name = "spec_value")
    private Map<String, String> specs = new HashMap<>();
    
    @NotNull
    private Boolean inStock;
}