package com.api.pdv.dto.transaction;

import com.api.pdv.dto.order.ViewOrderDto;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ViewOrderDto.class, name = "order"),
})
public abstract class ViewTransactableDto {

}
