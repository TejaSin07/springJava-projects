package com.tejas;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.tejas.constance.AppConstance;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;

@SpringBootApplication
public class KafkaConsumerAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(KafkaConsumerAppApplication.class, args);
	}

	@KafkaListener(topics = AppConstance.Order_TOPIC, groupId = "group_ashokit_orders")
	public void getMsg(String order){
		System.out.println("Msg Received from kafka topic**");
		System.out.println(order);
	}
}
