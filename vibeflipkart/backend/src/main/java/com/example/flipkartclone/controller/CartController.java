package com.example.flipkartclone.controller;

import com.example.flipkartclone.dto.CartDto;
import com.example.flipkartclone.dto.CartItemDto;
import com.example.flipkartclone.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {
    
    private final CartService cartService;
    
    @GetMapping
    public ResponseEntity<CartDto> getUserCart() {
        return ResponseEntity.ok(cartService.getUserCart());
    }
    
    @PostMapping("/items")
    public ResponseEntity<CartDto> addCartItem(@RequestBody CartItemDto cartItemDto) {
        return ResponseEntity.ok(cartService.addItemToCart(cartItemDto));
    }
    
    @PutMapping("/items/{productId}")
    public ResponseEntity<CartDto> updateCartItem(
            @PathVariable Long productId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateCartItemQuantity(productId, quantity));
    }
    
    @DeleteMapping("/items/{productId}")
    public ResponseEntity<CartDto> removeCartItem(@PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeItemFromCart(productId));
    }
    
    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok().build();
    }
}