package com.service.dto;

import java.util.List;

public class StatisticDTO {
    private List<PaymentDTO> paymentDTOs;
    private Long totalImport;
    private Long totalSell;
    private Long total;

    public List<PaymentDTO> getPaymentDTOs() {
        return paymentDTOs;
    }

    public void setPaymentDTOs(List<PaymentDTO> paymentDTOs) {
        this.paymentDTOs = paymentDTOs;
    }

    public Long getTotalImport() {
        return totalImport;
    }

    public void setTotalImport(Long totalImport) {
        this.totalImport = totalImport;
    }

    public Long getTotalSell() {
        return totalSell;
    }

    public void setTotalSell(Long totalSell) {
        this.totalSell = totalSell;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    
    
}
