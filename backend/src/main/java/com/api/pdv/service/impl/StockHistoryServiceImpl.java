package com.api.pdv.service.impl;

import com.api.pdv.enumeration.MovementType;
import com.api.pdv.factory.StockHistoryFactory;
import com.api.pdv.model.Stock;
import com.api.pdv.observer.StockObserver;
import com.api.pdv.repository.StockHistoryRepository;
import com.api.pdv.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockHistoryServiceImpl implements StockObserver {

    @Autowired
    private UserService userService;
    @Autowired
    private StockHistoryRepository stockHistoryRepository;

    @Override
    public void update(Stock stock, MovementType type, Integer quantity, String description) {
        var user = this.userService.getLoggedUser();
        var history = StockHistoryFactory.createStockHistory(user, stock, type, quantity, description);
        this.stockHistoryRepository.save(history);
    }
}
