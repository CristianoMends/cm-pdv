package com.api.pdv.factory;

import com.api.pdv.dto.order.CreateOrderDto;
import com.api.pdv.model.Order;

public interface OrderFactory {
    Order createOrder(CreateOrderDto dto);
}

