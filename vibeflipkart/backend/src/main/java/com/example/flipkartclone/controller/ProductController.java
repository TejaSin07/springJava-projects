package com.example.flipkartclone.controller;

import com.example.flipkartclone.dto.ProductDto;
import com.example.flipkartclone.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    
    private final ProductService productService;
    
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String deal,
            @RequestParam(required = false) String sort) {
        
        return ResponseEntity.ok(productService.getProducts(category, search, minPrice, maxPrice, deal, sort));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
}