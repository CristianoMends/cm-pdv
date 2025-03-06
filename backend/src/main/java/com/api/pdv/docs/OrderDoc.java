package com.api.pdv.docs;

import com.api.pdv.dto.order.CreateOrderDto;
import com.api.pdv.dto.order.ViewOrderDto;
import com.api.pdv.dto.transaction.CreateTransactionDto;
import com.api.pdv.enumeration.DeliveryStatus;
import com.api.pdv.enumeration.PaymentMethod;
import com.api.pdv.enumeration.PaymentStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Tag(name = "Order Controller", description = "Controlador responsável pela gestão dos pedidos.")
public interface OrderDoc {
    @Operation(
            summary = "Criação de um novo pedido",
            description = "Este método cria um novo pedido a partir dos dados fornecidos no DTO."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "sucesso.", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Parâmetros inválidos.", content = @Content()),
            @ApiResponse(responseCode = "403", description = "Não autorizado", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Não encontrado.", content = @Content()),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor.", content = @Content())
    })
    ResponseEntity<Void> create(CreateOrderDto dto);

    @Operation(
            summary = "Busca de pedidos por filtros",
            description = "Permite buscar por pedidos com base em filtros(cliente, entregador, etc)."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "sucesso."),
            @ApiResponse(responseCode = "400", description = "Parâmetros inválidos.", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = @Content()),
            @ApiResponse(responseCode = "403", description = "Não autorizado.", content = @Content()),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor.", content = @Content())
    })
    ResponseEntity<List<ViewOrderDto>> list(
            Long id,
            Long customerId,
            Long deliveryPersonId,
            Long productOrderId,
            DeliveryStatus status,
            BigDecimal receivedAmountStart,
            BigDecimal receivedAmountEnd,
            BigDecimal totalAmountStart,
            BigDecimal totalAmountEnd,
            BigDecimal balanceStart,
            BigDecimal balanceEnd,
            PaymentMethod paymentMethod,
            LocalDateTime createdAtStart,
            LocalDateTime createdAtEnd,
            LocalDateTime finishedAtStart,
            LocalDateTime finishedAtEnd,
            PaymentStatus paymentStatus
    );

    @Operation(
            summary = "Adicionar pagamentos a um pedido",
            description = "Adiciona pagamentos a um pedido com base no ID informado."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "sucesso.", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Parâmetros inválidos.", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = @Content()),
            @ApiResponse(responseCode = "403", description = "Não autorizado.", content = @Content()),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor.", content = @Content())
    })
    ResponseEntity<Void> addPayment(Long id, CreateTransactionDto dto);

    @Operation(
            summary = "Marca um pedido como entregue",
            description = "Marca um pedido como entregue"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "sucesso.", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Parâmetros inválidos.", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = @Content()),
            @ApiResponse(responseCode = "403", description = "Não autorizado.", content = @Content()),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor.", content = @Content())
    })
    ResponseEntity<Void> finishDelivery(@PathVariable Long id);

    @Operation(
            summary = "Cancela um pedido",
            description = "Cancela um pedido"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "sucesso.", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Parâmetros inválidos.", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = @Content()),
            @ApiResponse(responseCode = "403", description = "Não autorizado.", content = @Content()),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor.", content = @Content())
    })
    ResponseEntity<Void> delete(@PathVariable Long id);
}
