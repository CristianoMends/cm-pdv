package com.api.pdv.service;

import com.api.pdv.dto.cashier.ViewCashierDto;
import com.api.pdv.enumeration.TransactionStatus;
import com.api.pdv.enumeration.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public interface CashierService {

    void addBalance(BigDecimal balance);
    ViewCashierDto list(
            Long transactionId,
            TransactionStatus transactionStatus,
            BigDecimal amountStart,
            BigDecimal amountEnd,
            TransactionType type,
            String description,
            LocalDateTime createdAtStart,
            LocalDateTime createdAtEnd,
            UUID responsibleUserId,
            Long orderId,
            Long purchaseId
    );

}
