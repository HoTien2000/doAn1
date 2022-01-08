package com.mailconfig;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfiguration {
    @Autowired
    private Environment environment;
 
    @Bean
    public JavaMailSender getMailSender() {
        JavaMailSenderImpl mailSenderImpl = new JavaMailSenderImpl();
 
        mailSenderImpl.setHost(environment.getProperty("spring.mail.host"));
        mailSenderImpl.setPort(Integer.valueOf(environment.getProperty("spring.mail.port")));
        mailSenderImpl.setUsername(environment.getProperty("spring.mail.username"));
        mailSenderImpl.setPassword(environment.getProperty("spring.mail.password"));
 
        Properties properties = new Properties();
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.debug", "true");
 
        mailSenderImpl.setJavaMailProperties(properties);
        
        return mailSenderImpl;
    }
}
