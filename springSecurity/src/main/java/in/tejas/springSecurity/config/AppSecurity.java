package in.tejas.springSecurity.config;

import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import java.security.Security;

@Configuration
@EnableWebSecurity
public class AppSecurity {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests((authorize) -> authorize
//                .requestMatchers("/contact").permitAll()    //exluding urls from security
//                .anyRequest().authenticated())
//                .httpBasic(Customizer.withDefaults())
//                .formLogin(Customizer.withDefaults());

        //below and above both are working
//        http.authorizeHttpRequests((req) -> req
//                        .requestMatchers("/contact").permitAll()//here anyone having any  access role can access "contact url without security"
//                        .anyRequest().authenticated())
//                .formLogin();
//
//        return http.build();

        http.authorizeHttpRequests((req) -> req
                        .requestMatchers("/contact").permitAll()
                        .requestMatchers("/deposit").hasRole("ADMIN")          // we can give role wise security to method
                        .requestMatchers("/withdraw").hasAnyRole("ADMIN", "USER")
                .anyRequest().authenticated())
                .formLogin();

        return http.build();
    }


    // below method is for inMemory authentication
        @Bean
        public InMemoryUserDetailsManager inMemUsers() {
            UserDetails u1 = User.withDefaultPasswordEncoder()
                    .username("manish")
                    .password("manish@123")
                    .roles("ADMIN")
                    .build();

            UserDetails u2 = User.withDefaultPasswordEncoder()
                    .username("aish")
                    .password("aish@123")
                    .roles("USER")
                    .build();

            return new InMemoryUserDetailsManager(u1, u2);

        }

}
