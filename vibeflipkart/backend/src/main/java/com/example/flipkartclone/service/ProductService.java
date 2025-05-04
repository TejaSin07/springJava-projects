package com.example.flipkartclone.service;

import com.example.flipkartclone.dto.ProductDto;
import com.example.flipkartclone.model.Product;
import com.example.flipkartclone.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    
    private final ProductRepository productRepository;
    
    public List<ProductDto> getProducts(
            String category,
            String search,
            Double minPrice,
            Double maxPrice,
            String deal,
            String sort) {
        
        BigDecimal minPriceBd = minPrice != null ? BigDecimal.valueOf(minPrice) : null;
        BigDecimal maxPriceBd = maxPrice != null ? BigDecimal.valueOf(maxPrice) : null;
        
        List<Product> products = productRepository.findProductsByFilters(
                category,
                search != null ? search.toLowerCase() : null,
                minPriceBd,
                maxPriceBd
        );
        
        // Apply deal filter if specified
        if ("today".equals(deal)) {
            products = products.stream()
                    .filter(p -> p.getDiscount() != null && p.getDiscount() >= 5)
                    .collect(Collectors.toList());
        }
        
        // Apply sorting if specified
        if (sort != null) {
            switch (sort) {
                case "price_asc":
                    products.sort(Comparator.comparing(Product::getCurrentPrice));
                    break;
                case "price_desc":
                    products.sort(Comparator.comparing(Product::getCurrentPrice).reversed());
                    break;
                case "newest":
                    products.sort(Comparator.comparing(Product::getId).reversed());
                    break;
                case "popular":
                    products.sort(Comparator.comparing(Product::getRatingCount).reversed());
                    break;
                default:
                    break;
            }
        }
        
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        return convertToDto(product);
    }
    
    private ProductDto convertToDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(new ProductDto.PriceDto(
                        product.getCurrentPrice(),
                        product.getOriginalPrice()
                ))
                .discount(product.getDiscount())
                .imageUrl(product.getImageUrl())
                .images(product.getImages())
                .category(product.getCategory())
                .brand(product.getBrand())
                .ratings(new ProductDto.RatingDto(
                        product.getAverageRating(),
                        product.getRatingCount()
                ))
                .specs(product.getSpecs())
                .inStock(product.getInStock())
                .build();
    }
}