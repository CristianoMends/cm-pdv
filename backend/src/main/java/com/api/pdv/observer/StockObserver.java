package com.api.pdv.observer;

import com.api.pdv.enumeration.MovementType;
import com.api.pdv.model.Stock;

public interface StockObserver {
    void update(Stock stock, MovementType type, Integer quantity, String description);
}
