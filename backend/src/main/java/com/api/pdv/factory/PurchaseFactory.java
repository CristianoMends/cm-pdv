package com.api.pdv.factory;

import com.api.pdv.dto.purchase.CreatePurchaseDto;
import com.api.pdv.model.Purchase;

public interface PurchaseFactory {
    Purchase createPurchase(CreatePurchaseDto dto);
}

