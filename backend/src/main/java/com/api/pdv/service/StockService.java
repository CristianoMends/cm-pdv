package com.api.pdv.service;

import com.api.pdv.dto.stock.AddProductDto;
import com.api.pdv.dto.stock.UpdateStockDto;
import com.api.pdv.model.Product;
import com.api.pdv.model.Stock;

import java.time.LocalDateTime;
import java.util.List;

public interface StockService {

    void addProduct(AddProductDto dto);

    void addWithdraw(int quantity, Product product);

    void processStockReturn(Long productId, int quantity, String reason);

    List<Stock> getStock(Long id,
                         Integer initialQuantityStart,
                         Integer initialQuantityEnd,
                         Integer totalEntriesStart,
                         Integer totalEntriesEnd,
                         Integer totalWithdrawalsStart,
                         Integer totalWithdrawalsEnd,
                         LocalDateTime createdAtStart,
                         LocalDateTime createdAtEnd,
                         LocalDateTime updatedAtStart,
                         LocalDateTime updatedAtEnd,
                         Long productId,
                         String productName);

    void updateStock(Long id, UpdateStockDto dto);

}
