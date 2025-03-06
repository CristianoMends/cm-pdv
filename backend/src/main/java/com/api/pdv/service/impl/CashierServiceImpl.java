package com.api.pdv.service.impl;

import com.api.pdv.dto.cashier.ViewCashierDto;
import com.api.pdv.enumeration.PaymentMethod;
import com.api.pdv.enumeration.TransactionStatus;
import com.api.pdv.enumeration.TransactionType;
import com.api.pdv.model.Cashier;
import com.api.pdv.model.Transaction;
import com.api.pdv.repository.OrderRepository;
import com.api.pdv.repository.PurchaseRepository;
import com.api.pdv.repository.TransactionRepository;
import com.api.pdv.service.CashierService;
import com.api.pdv.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.UUID;

@Service
public class CashierServiceImpl implements CashierService {


    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private PurchaseRepository purchaseRepository;
    @Autowired
    private UserService userService;

    private Cashier cashier;

    @PostConstruct
    private void initCashier() {
        this.cashier = new Cashier(BigDecimal.ZERO);
    }

    @Override
    public void addBalance(BigDecimal balance) {
        createAddBalanceTransaction(balance);
        calculateBalance();
    }

    @Override
    public ViewCashierDto list(
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
    ) {
        var transactions = this.transactionRepository.list(
                transactionId,
                amountStart,
                amountEnd,
                type,
                description,
                createdAtStart,
                createdAtEnd,
                responsibleUserId,
                orderId,
                purchaseId
        );
        this.cashier.setTransactions(transactions);
        calculateBalance();
        return cashier.toView();
    }

    private void createAddBalanceTransaction(BigDecimal balance) {
        createTransaction(balance, "Incremento de saldo por usuário");
    }

    private void calculateBalance() {
        BigDecimal balance = this.transactionRepository.sumBalance().orElse(BigDecimal.ZERO);
        this.cashier.setBalance(balance);
    }

    private void createTransaction(BigDecimal amount, String description) {

        var user = this.userService.getLoggedUser();
        var t = new Transaction(
                amount,
                TransactionType.INCOME,
                PaymentMethod.UNDEFINED,
                description,
                user,
                null
        );
        this.transactionRepository.save(t);
    }

}
