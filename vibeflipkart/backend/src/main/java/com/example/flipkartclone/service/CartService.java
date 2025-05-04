package com.example.flipkartclone.service;

import com.example.flipkartclone.dto.CartDto;
import com.example.flipkartclone.dto.CartItemDto;
import com.example.flipkartclone.model.Product;
import com.example.flipkartclone.model.User;
import com.example.flipkartclone.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CartService {
    
    private final ProductRepository productRepository;
    
    // In a real application, this would be stored in a database
    // For simplicity, we're using an in-memory map
    private final Map<String, List<CartItemDto>> userCarts = new HashMap<>();
    
    public CartDto getUserCart() {
        String userEmail = getCurrentUserEmail();
        List<CartItemDto> items = userCarts.getOrDefault(userEmail, new ArrayList<>());
        return calculateCartTotals(items);
    }
    
    public CartDto addItemToCart(CartItemDto cartItemDto) {
        String userEmail = getCurrentUserEmail();
        List<CartItemDto> cartItems = userCarts.getOrDefault(userEmail, new ArrayList<>());
        
        // Check if product exists
        Product product = productRepository.findById(cartItemDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        // Check if the item already exists in the cart
        boolean itemExists = false;
        for (CartItemDto item : cartItems) {
            if (item.getProductId().equals(cartItemDto.getProductId())) {
                // Increase quantity
                item.setQuantity(item.getQuantity() + cartItemDto.getQuantity());
                item.setSubtotal(product.getCurrentPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
                itemExists = true;
                break;
            }
        }
        
        // If the item doesn't exist, add it
        if (!itemExists) {
            CartItemDto newItem = CartItemDto.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .imageUrl(product.getImageUrl())
                    .quantity(cartItemDto.getQuantity())
                    .price(product.getCurrentPrice())
                    .subtotal(product.getCurrentPrice().multiply(BigDecimal.valueOf(cartItemDto.getQuantity())))
                    .build();
            
            cartItems.add(newItem);
        }
        
        userCarts.put(userEmail, cartItems);
        return calculateCartTotals(cartItems);
    }
    
    public CartDto updateCartItemQuantity(Long productId, int quantity) {
        String userEmail = getCurrentUserEmail();
        List<CartItemDto> cartItems = userCarts.getOrDefault(userEmail, new ArrayList<>());
        
        for (CartItemDto item : cartItems) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(quantity);
                item.setSubtotal(item.getPrice().multiply(BigDecimal.valueOf(quantity)));
                break;
            }
        }
        
        userCarts.put(userEmail, cartItems);
        return calculateCartTotals(cartItems);
    }
    
    public CartDto removeItemFromCart(Long productId) {
        String userEmail = getCurrentUserEmail();
        List<CartItemDto> cartItems = userCarts.getOrDefault(userEmail, new ArrayList<>());
        
        cartItems.removeIf(item -> item.getProductId().equals(productId));
        
        userCarts.put(userEmail, cartItems);
        return calculateCartTotals(cartItems);
    }
    
    public void clearCart() {
        String userEmail = getCurrentUserEmail();
        userCarts.put(userEmail, new ArrayList<>());
    }
    
    private CartDto calculateCartTotals(List<CartItemDto> items) {
        int totalItems = items.stream().mapToInt(CartItemDto::getQuantity).sum();
        
        BigDecimal subtotal = items.stream()
                .map(CartItemDto::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        // Calculate discount (for example, 5% off subtotal)
        BigDecimal discount = subtotal.multiply(new BigDecimal("0.05"));
        
        // Calculate total
        BigDecimal total = subtotal.subtract(discount);
        
        return CartDto.builder()
                .items(items)
                .totalItems(totalItems)
                .subtotal(subtotal)
                .discount(discount)
                .total(total)
                .build();
    }
    
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}