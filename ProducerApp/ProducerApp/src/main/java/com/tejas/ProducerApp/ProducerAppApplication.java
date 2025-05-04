package com.tejas.ProducerApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication(scanBasePackages = "com.tejas")
public class ProducerAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProducerAppApplication.class, args);
	}

}
