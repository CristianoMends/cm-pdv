package com.api.pdv.service;

import com.api.pdv.dto.order.CreateOrderDto;
import com.api.pdv.dto.order.ViewOrderDto;
import com.api.pdv.dto.transaction.CreateTransactionDto;
import com.api.pdv.enumeration.DeliveryStatus;
import com.api.pdv.enumeration.PaymentMethod;
import com.api.pdv.enumeration.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderService {
    void create(CreateOrderDto order);

    List<ViewOrderDto> list(
            Long id,
            Long customerId,
            Long productOrderId,
            DeliveryStatus status,
            BigDecimal receivedAmountStart,
            BigDecimal receivedAmountEnd,
            BigDecimal totalAmountStart,
            BigDecimal totalAmountEnd,
            BigDecimal balanceStart,
            BigDecimal balanceEnd,
            PaymentMethod paymentMethod,
            LocalDateTime createdAtStart,
            LocalDateTime createdAtEnd,
            LocalDateTime finishedAtStart,
            LocalDateTime finishedAtEnd,
            PaymentStatus paymentStatus
    );

    void addPayment(Long id, CreateTransactionDto dto);

    void delete(Long id);

    void finishDelivery(Long id);
}
