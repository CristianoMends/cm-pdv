package com.api.pdv.controller;

import com.api.pdv.docs.OrderDoc;
import com.api.pdv.dto.order.CreateOrderDto;
import com.api.pdv.dto.order.ViewOrderDto;
import com.api.pdv.dto.transaction.CreateTransactionDto;
import com.api.pdv.enumeration.DeliveryStatus;
import com.api.pdv.enumeration.PaymentMethod;
import com.api.pdv.enumeration.PaymentStatus;
import com.api.pdv.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("orders")
@CrossOrigin
public class OrderController implements OrderDoc {

    @Autowired
    private OrderService service;

    @PostMapping
    public ResponseEntity<Void> create(
            @RequestBody @Valid CreateOrderDto dto) {
        this.service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @GetMapping
    public ResponseEntity<List<ViewOrderDto>> list(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) Long productOrderId,
            @RequestParam(required = false) DeliveryStatus deliveryStatus,
            @RequestParam(required = false) BigDecimal paidAmountStart,
            @RequestParam(required = false) BigDecimal paidAmountEnd,
            @RequestParam(required = false) BigDecimal totalAmountStart,
            @RequestParam(required = false) BigDecimal totalAmountEnd,
            @RequestParam(required = false) BigDecimal balanceStart,
            @RequestParam(required = false) BigDecimal balanceEnd,
            @RequestParam(required = false) PaymentMethod paymentMethod,
            @RequestParam(required = false) LocalDateTime createdAtStart,
            @RequestParam(required = false) LocalDateTime createdAtEnd,
            @RequestParam(required = false) LocalDateTime finishedAtStart,
            @RequestParam(required = false) LocalDateTime finishedAtEnd,
            @RequestParam(required = false) PaymentStatus paymentStatus
    ) {
        List<ViewOrderDto> orders = service.list(
                id,
                customerId,
                productOrderId,
                deliveryStatus,
                paidAmountStart,
                paidAmountEnd,
                totalAmountStart,
                totalAmountEnd,
                balanceStart,
                balanceEnd,
                paymentMethod,
                createdAtStart,
                createdAtEnd,
                finishedAtStart,
                finishedAtEnd,
                paymentStatus
        );
        return ResponseEntity.ok(orders);
    }

    @PostMapping("payment/{id}")
    public ResponseEntity<Void> addPayment(
            @PathVariable Long id, @RequestBody @Valid CreateTransactionDto dto) {
        this.service.addPayment(id, dto);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("finishDelivery{id}")
    public ResponseEntity<Void> finishDelivery(@PathVariable Long id) {
        this.service.finishDelivery(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.service.delete(id);
        return ResponseEntity.noContent().build();
    }


}

