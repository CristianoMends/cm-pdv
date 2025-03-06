package com.api.pdv.service;

import com.api.pdv.dto.purchase.CreatePurchaseDto;
import com.api.pdv.dto.purchase.ViewPurchaseDto;
import com.api.pdv.dto.transaction.CreateTransactionDto;
import com.api.pdv.enumeration.PaymentMethod;
import com.api.pdv.enumeration.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface PurchaseService {

    void create(CreatePurchaseDto dto);

    List<ViewPurchaseDto> list(
            Long id,
            BigDecimal totalAmountStart,
            BigDecimal totalAmountEnd,
            BigDecimal paidAmountStart,
            BigDecimal paidAmountEnd,
            Boolean active,
            LocalDateTime entryAtStart,
            LocalDateTime entryAtEnd,
            LocalDateTime createdAtStart,
            LocalDateTime createdAtEnd,
            LocalDateTime finishedAtStart,
            LocalDateTime finishedAtEnd,
            LocalDateTime canceledAtStart,
            LocalDateTime canceledAtEnd,
            String description,
            Long supplierId,
            Long productId,
            String nfe,
            PaymentMethod paymentMethod,
            PaymentStatus paymentStatus
    );

    void addPayment(Long id, CreateTransactionDto dto);

    void delete(Long id);

}
