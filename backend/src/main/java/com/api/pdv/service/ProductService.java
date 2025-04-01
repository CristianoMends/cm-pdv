package com.api.pdv.service;

import com.api.pdv.dto.product.CreateProductDto;
import com.api.pdv.dto.product.UpdateProductDto;
import com.api.pdv.model.Product;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface ProductService {

    void registerProduct(CreateProductDto productDto, String url);

    List<Product> getProducts(Long id,
                              String name,
                              BigDecimal priceStart,
                              BigDecimal priceEnd,
                              BigDecimal costStart,
                              BigDecimal costEnd,
                              String category,
                              String unit,
                              String brand,
                              LocalDateTime startUpdateDate,
                              LocalDateTime endUpdateDate,
                              LocalDateTime startRegisterDate,
                              LocalDateTime endRegisterDate,
                              Boolean active,
                              String ncm);

    void updateProduct(Long id, UpdateProductDto dto);

    void delete(Long id);
}
