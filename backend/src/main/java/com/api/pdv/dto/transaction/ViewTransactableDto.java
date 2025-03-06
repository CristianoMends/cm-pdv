package com.api.pdv.dto.transaction;

import com.api.pdv.dto.order.ViewOrderDto;
import com.api.pdv.dto.purchase.ViewPurchaseDto;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ViewOrderDto.class, name = "order"),
        @JsonSubTypes.Type(value = ViewPurchaseDto.class, name = "purchase")
})
public abstract class ViewTransactableDto {

}
