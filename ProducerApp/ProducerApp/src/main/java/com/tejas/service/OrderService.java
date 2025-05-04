package com.tejas.service;

import com.tejas.binding.Order;
import com.tejas.constance.AppConstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    public String createOrder(Order order){
        kafkaTemplate.send(AppConstance.Order_TOPIC,order);
        return "Order created in kafka topic";
    }
}
