package com.example.flipkartclone.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private PriceDto price;
    private Integer discount;
    private String imageUrl;
    private List<String> images;
    private String category;
    private String brand;
    private RatingDto ratings;
    private Map<String, String> specs;
    private Boolean inStock;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PriceDto {
        private BigDecimal current;
        private BigDecimal original;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RatingDto {
        private Double average;
        private Integer count;
    }
}