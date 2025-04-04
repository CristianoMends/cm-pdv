package com.api.pdv.model;

import com.api.pdv.dto.productItem.ViewProductItemDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "product_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal total;


    @PostLoad
    private void calculateItemTotal() {
        this.total = unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    public ProductOrder(Order order, Product product, Integer quantity, BigDecimal unitPrice) {
        setOrder(order);
        setProduct(product);
        setQuantity(quantity);
        setUnitPrice(unitPrice);
    }

    public ViewProductItemDto toView() {
        return new ViewProductItemDto(
                getId(),
                getQuantity(),
                getUnitPrice(),
                getTotal(),
                getProduct().toView()
        );
    }
}
