package com.api.pdv.repository;

import com.api.pdv.enumeration.DeliveryStatus;
import com.api.pdv.enumeration.PaymentMethod;
import com.api.pdv.enumeration.PaymentStatus;
import com.api.pdv.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("""
            select o from Order o 
            inner join o.productOrders productOrders
            where (:id is null or o.id = :id) 
            and (:customerId is null or o.customer.id = :customerId) 
            and (:productOrderId is null or productOrders.id = :productOrderId) 
            and (:deliveryStatus is null or o.deliveryStatus = :deliveryStatus) 
            and ((:paidAmountStart is null or :paidAmountEnd is null) or o.paidAmount between :paidAmountStart and :paidAmountEnd) 
            and ((:totalAmountStart is null or :totalAmountEnd is null) or o.total between :totalAmountStart and :totalAmountEnd)
            and ((:balanceStart is null or :balanceEnd is null) or o.balance between :balanceStart and :balanceEnd) 
            and (:paymentMethod is null or o.paymentMethod = :paymentMethod) 
            and (:paymentStatus is null or o.paymentStatus = :paymentStatus)
            and ((CAST(:createdAtStart as TIMESTAMP) is null or CAST(:createdAtEnd as TIMESTAMP) is null) or o.createdAt between :createdAtStart and :createdAtEnd) 
            and ((CAST(:finishedAtStart as TIMESTAMP) is null or CAST(:finishedAtEnd as TIMESTAMP) is null) or o.finishedAt between :finishedAtStart and :finishedAtEnd)
            order by o.createdAt
            """)
    List<Order> list(
            @Param("id") Long id,
            @Param("customerId") Long customerId,
            @Param("productOrderId") Long productOrderId,
            @Param("deliveryStatus") DeliveryStatus deliveryStatus,
            @Param("paidAmountStart") BigDecimal paidAmountStart,
            @Param("paidAmountEnd") BigDecimal paidAmountEnd,
            @Param("totalAmountStart") BigDecimal totalAmountStart,
            @Param("totalAmountEnd") BigDecimal totalAmountEnd,
            @Param("balanceStart") BigDecimal balanceStart,
            @Param("balanceEnd") BigDecimal balanceEnd,
            @Param("paymentMethod") PaymentMethod paymentMethod,
            @Param("createdAtStart") LocalDateTime createdAtStart,
            @Param("createdAtEnd") LocalDateTime createdAtEnd,
            @Param("finishedAtStart") LocalDateTime finishedAtStart,
            @Param("finishedAtEnd") LocalDateTime finishedAtEnd,
            @Param("paymentStatus") PaymentStatus paymentStatus
            );

}
