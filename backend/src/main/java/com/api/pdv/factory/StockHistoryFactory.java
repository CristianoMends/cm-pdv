package com.api.pdv.factory;

import com.api.pdv.enumeration.MovementType;
import com.api.pdv.model.Stock;
import com.api.pdv.model.StockHistory;
import com.api.pdv.model.User;

public class StockHistoryFactory {

    public static StockHistory createStockHistory(User user, Stock stock, MovementType type, int quantity, String description) {
        return new StockHistory(user, stock, type, quantity, description);
    }

}
