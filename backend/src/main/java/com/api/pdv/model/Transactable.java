package com.api.pdv.model;

import com.api.pdv.dto.transaction.ViewTransactableDto;
import com.api.pdv.enumeration.PaymentMethod;
import com.api.pdv.enumeration.PaymentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
public abstract class Transactable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal balance;
    private BigDecimal total;
    private BigDecimal paidAmount;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private LocalDateTime createdAt;
    private LocalDateTime finishedAt;
    private LocalDateTime canceledAt;
    private String description;

    public abstract void calculateTotalAmount();
    public abstract ViewTransactableDto toView();
}
