package com.tejas.config;

import com.fasterxml.jackson.databind.JsonDeserializer;
import com.tejas.binding.Order;
import com.tejas.constance.AppConstance;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaConsumerConfig {

    @Bean
    public ConsumerFactory<String, Order> consumerFactory() {

        Map<String, Object> configProps = new HashMap<>();

        configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, AppConstance.HOST);
        configProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        configProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(configProps);

    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Order> kafkaListnerFactory() {

        ConcurrentKafkaListenerContainerFactory<String, Order> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(consumerFactory());

        return factory;
    }

}
