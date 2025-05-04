package com.example.flipkartclone.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentDetails {
    
    private String trackingNumber;
    
    private String carrier;
    
    private LocalDateTime shippedDate;
    
    private LocalDateTime estimatedDeliveryDate;
    
    private LocalDateTime deliveredDate;
}