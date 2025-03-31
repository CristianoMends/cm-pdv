package com.api.pdv.controller;

import com.api.pdv.docs.TransactionDoc;
import com.api.pdv.dto.transaction.ViewTransactionDto;
import com.api.pdv.enumeration.TransactionType;
import com.api.pdv.model.Transaction;
import com.api.pdv.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("transactions")
public class TransactionController implements TransactionDoc {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<ViewTransactionDto>> listTransactions(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) BigDecimal amountStart,
            @RequestParam(required = false) BigDecimal amountEnd,
            @RequestParam(required = false) TransactionType type,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) LocalDateTime createdAtStart,
            @RequestParam(required = false) LocalDateTime createdAtEnd,
            @RequestParam(required = false) UUID responsibleUserId,
            @RequestParam(required = false) Long orderId
    ) {

        List<ViewTransactionDto> transactions = transactionRepository.list(
                id,
                amountStart,
                amountEnd,
                type,
                description,
                createdAtStart,
                createdAtEnd,
                responsibleUserId,
                orderId
        ).stream().map(Transaction::toView).toList();
        return ResponseEntity.ok(transactions);
    }
}
