package com.tejas.rest;


import com.tejas.binding.Order;
import com.tejas.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderRestController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/order")
    public String placeOrder( @RequestBody Order order){
        return  orderService.createOrder(order);
    }

}
