package com.api.pdv.observer;

import com.api.pdv.enumeration.PaymentMethod;
import com.api.pdv.enumeration.TransactionType;
import com.api.pdv.model.Transactable;

import java.math.BigDecimal;

public interface TransactionObserver {
    void update(Transactable purchase, BigDecimal amount, PaymentMethod paymentMethod, String description, TransactionType transactionType);
}
