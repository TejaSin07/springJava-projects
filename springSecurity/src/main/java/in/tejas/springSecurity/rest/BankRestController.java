package in.tejas.springSecurity.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BankRestController {

    @GetMapping("/deposit")
    public String  deposit(){
        return "deposit success";
    }

    @GetMapping("/withdraw")
    public String  withdraw(){
        return "withdraw success";
    }

    @GetMapping("/contact")
    public String  contact(){
        return "91-27382789";
    }

}
