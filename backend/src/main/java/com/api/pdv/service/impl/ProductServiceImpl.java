package com.api.pdv.service.impl;

import com.api.pdv.dto.product.CreateProductDto;
import com.api.pdv.dto.product.UpdateProductDto;
import com.api.pdv.exception.BusinessException;
import com.api.pdv.model.Product;
import com.api.pdv.repository.ProductCategoryRepository;
import com.api.pdv.repository.ProductRepository;
import com.api.pdv.repository.StockRepository;
import com.api.pdv.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Override
    public void registerProduct(CreateProductDto dto, String url) {

        var cat = this.productCategoryRepository.findById(dto.getCategoryId()).orElseThrow(
                () -> new BusinessException("Product category not found", HttpStatus.NOT_FOUND)
        );

        if (cat.getActive().equals(false)) throw new BusinessException("Category is inactive");

        var product = new Product();
        product.setImage(url);
        product.setPrice(dto.getPrice());
        product.setCost(dto.getCost());
        product.setActive(true);
        product.setName(dto.getName());
        product.setBrand(dto.getBrand());
        product.setNcm(dto.getNcm());
        product.setUnit(dto.getUnit());
        product.setCategory(cat);
        product.setCreatedAt(LocalDateTime.now(ZoneOffset.of("-03:00")));
        this.productRepository.save(product);
    }

    @Override
    public List<Product> getProducts(Long id,
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
                                     String ncm) {
        if (name == null) name = "";
        if (category == null) category = "";
        if (unit == null) unit = "";
        if (brand == null) brand = "";
        if (ncm == null) ncm = "";


        if (startUpdateDate != null && endUpdateDate != null
                && startUpdateDate.isAfter(endUpdateDate)) {
            throw new BusinessException("Start date cannot be after end date in update date.", HttpStatus.BAD_REQUEST);
        }

        if (startRegisterDate != null && endRegisterDate != null
                && startRegisterDate.isAfter(endRegisterDate)) {
            throw new BusinessException("Start date cannot be after end date in creation date.", HttpStatus.BAD_REQUEST);
        }

        return this.productRepository.findByFilters(
                id,
                name,
                priceStart,
                priceEnd,
                costStart,
                costEnd,
                unit,
                brand,
                category,
                startRegisterDate,
                endRegisterDate,
                startUpdateDate,
                endUpdateDate,
                active,
                ncm
        );
    }

    @Override
    public void updateProduct(Long id, UpdateProductDto dto) {
        Product p = this.productRepository.findById(id).orElseThrow(() ->
                new BusinessException("Product not found", HttpStatus.NOT_FOUND));

        if (dto.getCategoryId() != null) {
            var cat = this.productCategoryRepository.findById(dto.getCategoryId()).orElseThrow(
                    () -> new BusinessException("Product category not found", HttpStatus.NOT_FOUND)
            );

            p.setCategory(cat);
        }


        if (dto.getNcm() != null) p.setNcm(dto.getNcm());
        if (dto.getBrand() != null) p.setBrand(dto.getBrand());
        if (dto.getUnit() != null) p.setUnit(dto.getUnit());
        if (dto.getName() != null) p.setName(dto.getName());
        if (dto.getPrice() != null) p.setPrice(dto.getPrice());
        if (dto.getCost() != null) p.setCost(dto.getCost());

        p.setUpdatedAt(LocalDateTime.now(ZoneOffset.of("-03:00")));
        p.setActive(true);
        this.productRepository.save(p);
    }

    @Override
    public void delete(Long id) {
        var p = this.productRepository.findById(id).orElseThrow(
                () -> new BusinessException("Product not found", HttpStatus.NOT_FOUND)
        );

        var stockByProduct = this.stockRepository.findProduct(p.getId());

        if (stockByProduct.isPresent() && stockByProduct.get().getCurrentQuantity() > 0) {
            throw new BusinessException("The product cannot be deleted because it is still in stock.");
        }

        p.setActive(false);
        this.productRepository.save(p);
    }
}
