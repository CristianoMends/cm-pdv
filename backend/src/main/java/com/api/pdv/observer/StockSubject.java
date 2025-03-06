package com.api.pdv.observer;

import com.api.pdv.enumeration.MovementType;
import com.api.pdv.model.Stock;

public interface StockSubject {
    void addObserver(StockObserver observer);
    void removeObserver(StockObserver observer);
    void notifyObservers(Stock stock, MovementType type, Integer quantity, String description);
}
