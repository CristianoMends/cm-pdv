package com.api.pdv.observer;

import com.api.pdv.enumeration.PaymentMethod;
import com.api.pdv.enumeration.TransactionType;
import com.api.pdv.model.Transactable;

import java.math.BigDecimal;

public interface TransactionSubject {
    void addObserver(TransactionObserver observer);
    void removeObserver(TransactionObserver observer);
    void notifyObservers(Transactable purchase, BigDecimal amount, PaymentMethod paymentMethod, String description, TransactionType transactionType);
}
