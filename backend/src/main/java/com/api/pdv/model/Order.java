package com.api.pdv.model;

import com.api.pdv.dto.order.ViewOrderDto;
import com.api.pdv.enumeration.DeliveryStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
public class Order extends Transactable {

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductOrder> productOrders;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;

    @PrePersist
    private void prePersist(){
        calculateTotalAmount();
        setCreatedAt(LocalDateTime.now());
    }
    @PostLoad
    private void onLoad(){
        setBalance(this.getTotal().subtract(this.getPaidAmount()));
    }

    public void calculateTotalAmount(){
        if (getTotal() != null) return;

        var total = productOrders.stream()
                .map(p -> p.getUnitPrice()
                        .multiply(BigDecimal.valueOf(p.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        setTotal(total);
    }


    public ViewOrderDto toView() {
        return new ViewOrderDto(
                getId(),
                getDeliveryStatus(),
                getPaymentStatus(),
                getPaidAmount(),
                getTotal(),
                getBalance(),
                getPaymentMethod(),
                getCreatedAt(),
                getFinishedAt(),
                getCanceledAt(),
                getDescription(),
                getCustomer(),
                getProductOrders().stream().map(ProductOrder::toView).toList()
        );
    }
}
