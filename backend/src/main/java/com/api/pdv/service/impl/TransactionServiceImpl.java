package com.api.pdv.service.impl;

import com.api.pdv.enumeration.PaymentMethod;
import com.api.pdv.enumeration.TransactionType;
import com.api.pdv.model.Order;
import com.api.pdv.model.Purchase;
import com.api.pdv.model.Transactable;
import com.api.pdv.model.Transaction;
import com.api.pdv.observer.TransactionObserver;
import com.api.pdv.repository.TransactionRepository;
import com.api.pdv.service.TransactionService;
import com.api.pdv.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class TransactionServiceImpl implements TransactionService, TransactionObserver {

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private UserService userService;

    @Override
    public void update(Transactable transactable, BigDecimal amount, PaymentMethod paymentMethod, String description, TransactionType transactionType) {
        if (transactable instanceof Order) {
            createOrderTransaction((Order) transactable, amount, paymentMethod, description,transactionType);
        } else {
            createPurchaseTransaction((Purchase) transactable, amount, paymentMethod, description, transactionType);
        }
    }

    private void createOrderTransaction(Order order, BigDecimal amount, PaymentMethod paymentMethod, String description, TransactionType transactionType) {
        var user = this.userService.getLoggedUser();
        var t = new Transaction(
                amount,
                transactionType,
                paymentMethod,
                description,
                user,
                order
        );
        this.transactionRepository.save(t);
    }

    private void createPurchaseTransaction(Purchase purchase, BigDecimal amount, PaymentMethod paymentMethod, String description, TransactionType transactionType) {
        var user = this.userService.getLoggedUser();
        var t = new Transaction(
                amount,
                transactionType,
                paymentMethod,
                description,
                user,
                purchase
        );
        this.transactionRepository.save(t);
    }
}
