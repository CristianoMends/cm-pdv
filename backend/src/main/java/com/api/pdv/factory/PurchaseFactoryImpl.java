package com.api.pdv.factory;

import com.api.pdv.dto.productItem.CreateProductItemDto;
import com.api.pdv.dto.purchase.CreatePurchaseDto;
import com.api.pdv.enumeration.PaymentStatus;
import com.api.pdv.exception.BusinessException;
import com.api.pdv.model.Product;
import com.api.pdv.model.ProductPurchase;
import com.api.pdv.model.Purchase;
import com.api.pdv.repository.ProductRepository;
import com.api.pdv.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PurchaseFactoryImpl implements PurchaseFactory {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public Purchase createPurchase(CreatePurchaseDto dto) {
        var purchase = new Purchase();
        var supplier = supplierRepository.findById(dto.getSupplierId()).orElseThrow(()-> new BusinessException("Supplier not found", HttpStatus.NOT_FOUND));
        if (!supplier.getActive()) throw new BusinessException("Supplier is inactive");
        purchase.setSupplier(supplier);
        purchase.setProductPurchases(createProductPurchases(dto.getItems(), purchase));
        purchase.setPaymentMethod(dto.getPaymentMethod());
        purchase.setPaidAmount(dto.getPaidAmount());
        purchase.setNfe(dto.getNfe());
        purchase.setEntryAt(dto.getEntryAt());
        purchase.setPaymentStatus(PaymentStatus.PENDING);
        purchase.setActive(true);
        purchase.setDescription(dto.getDescription());
        return purchase;
    }

    private List<ProductPurchase> createProductPurchases(List<CreateProductItemDto> productDtos, Purchase purchase) {
        List<ProductPurchase> productPurchases = new ArrayList<>();
        productDtos.forEach(dto -> {
            Product product = productRepository.findById(dto.getProductId()).orElseThrow();
            productPurchases.add(new ProductPurchase(purchase, product, dto.getQuantity(), dto.getUnitPrice() != null ? dto.getUnitPrice() : product.getPrice()));
        });
        return productPurchases;
    }
}
