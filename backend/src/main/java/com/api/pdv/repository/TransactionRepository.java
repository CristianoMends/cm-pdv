package com.api.pdv.repository;

import com.api.pdv.enumeration.TransactionType;
import com.api.pdv.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("""
            select t from Transaction t
            where (:id is null or t.id = :id) 
            and ((:amountStart is null or :amountEnd is null) or t.amount between :amountStart and :amountEnd) 
            and (:type is null or t.type = :type) 
            and ((:description is null or :description = '') or t.description like concat('%', :description, '%')) 
            and (:orderId is null or t.order.id = :orderId)
            and (:responsibleUserId is null or t.responsibleUser.id = :responsibleUserId )            
            and ((CAST(:createdAtStart as TIMESTAMP) is null or CAST(:createdAtEnd as TIMESTAMP) is null) or t.createdAt between :createdAtStart and :createdAtEnd) 
            order by t.createdAt""")
    List<Transaction> list(
            @Param("id") Long id,
            @Param("amountStart") BigDecimal amountStart,
            @Param("amountEnd") BigDecimal amountEnd,
            @Param("type") TransactionType type,
            @Param("description") String description,
            @Param("createdAtStart") LocalDateTime createdAtStart,
            @Param("createdAtEnd") LocalDateTime createdAtEnd,
            @Param("responsibleUserId") UUID responsibleUserId,
            @Param("orderId") Long orderId
    );

    @Query("""
            select sum(t.amount) 
            from Transaction t 
            where t.order.id = :orderId
            """)
    Optional<BigDecimal> countReceivedAmountByOrderId(@Param("orderId") Long orderId);

    @Query("select sum(t.amount) from Transaction t")
    Optional<BigDecimal> sumBalance();



}