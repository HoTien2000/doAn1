package com.controller;

import java.util.List;

import com.entity.Payment;
import com.service.PaymentService;
import com.service.dto.NotificationDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private PaymentService paymentService;
    
    @MessageMapping("/send")
    @SendTo("/topic/public")
    public NotificationDTO sendNotification(@Payload NotificationDTO notificationDTO) {
        List<Payment> payments = paymentService.findByStatus(0);

        String size = String.valueOf(payments.size());

        NotificationDTO message = new NotificationDTO();
        message.setMessage(size);

        return message;
    }
}
