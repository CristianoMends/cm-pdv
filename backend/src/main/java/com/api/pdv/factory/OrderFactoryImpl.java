package com.api.pdv.factory;

import com.api.pdv.dto.order.CreateOrderDto;
import com.api.pdv.dto.productItem.CreateProductItemDto;
import com.api.pdv.enumeration.DeliveryStatus;
import com.api.pdv.exception.BusinessException;
import com.api.pdv.model.*;
import com.api.pdv.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderFactoryImpl implements OrderFactory {

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Order createOrder(CreateOrderDto dto) {
        var order = new Order();
        var customer = customerRepository.findById(dto.getCustomerId()).orElseThrow(() -> new BusinessException("Customer not found", HttpStatus.NOT_FOUND));

        order.setCustomer(customer);
        order.setProductOrders(createProductOrders(dto.getProductOrders(), order));
        order.setDeliveryStatus(DeliveryStatus.PENDING);
        order.setPaidAmount(dto.getPaidAmount());

        order.setPaidAmount(dto.getPaidAmount());
        order.calculateTotalAmount();
        order.setCreatedAt(LocalDateTime.now());
        order.setBalance(order.getTotal().subtract(dto.getPaidAmount()));
        order.setPaymentMethod(dto.getPaymentMethod());
        order.setDescription(dto.getDescription());
        return order;
    }

    private List<ProductOrder> createProductOrders(List<CreateProductItemDto> productDtos, Order order) {
        List<ProductOrder> productOrders = new ArrayList<>();
        productDtos.forEach(dto -> {
            Stock stock = stockRepository.findProduct(dto.getProductId()).orElseThrow(() -> new BusinessException("Product with id " + dto.getProductId() + " not found in stock", HttpStatus.NOT_FOUND));

            if (stock.getCurrentQuantity() < dto.getQuantity())
                throw new BusinessException("does not have the stated quantity in stock");

            productOrders.add(new ProductOrder(order, stock.getProduct(), dto.getQuantity(), dto.getUnitPrice() != null ? dto.getUnitPrice() : stock.getProduct().getPrice()));
        });
        return productOrders;
    }
}
