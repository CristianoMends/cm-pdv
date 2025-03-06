package com.api.pdv.model;

import com.api.pdv.dto.cashier.ViewCashierDto;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Cashier {
    private BigDecimal balance;

    private List<Transaction> transactions;

    public Cashier(BigDecimal initialBalance) {
        this.balance = initialBalance;
        this.transactions = new ArrayList<>();
    }

    public ViewCashierDto toView() {
        return new ViewCashierDto(
                getBalance(),
                getTransactions().stream().map(Transaction::toView).toList()
        );
    }
}
