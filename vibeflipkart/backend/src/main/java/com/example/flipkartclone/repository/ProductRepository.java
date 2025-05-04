package com.example.flipkartclone.repository;

import com.example.flipkartclone.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    
    @Query("SELECT p FROM Product p WHERE " +
            "(:category IS NULL OR p.category = :category) AND " +
            "(:search IS NULL OR LOWER(p.name) LIKE %:search% OR LOWER(p.description) LIKE %:search%) AND " +
            "(:minPrice IS NULL OR p.currentPrice >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.currentPrice <= :maxPrice)")
    List<Product> findProductsByFilters(
            String category,
            String search,
            BigDecimal minPrice,
            BigDecimal maxPrice
    );
}