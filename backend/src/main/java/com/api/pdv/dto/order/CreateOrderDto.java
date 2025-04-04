package com.api.pdv.dto.order;

import com.api.pdv.dto.productItem.CreateProductItemDto;
import com.api.pdv.enumeration.PaymentMethod;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Schema(description = "DTO para criação de um novo Pedido.")
public class CreateOrderDto {
    @Schema(description = "Id do cliente atrelado ao pedido", example = "1")
    private Long customerId;

    @ArraySchema(schema = @Schema(implementation = CreateProductItemDto.class))
    @Schema(description = "Lista de produtos pedidos", example = "[{\"productId\": 1, \"quantity\": 3, \"unitPrice\": 19.99}]")
    @NotNull(message = "Products is mandatory")
    private List<CreateProductItemDto> productOrders;

    @Schema(description = "Valor recebido", example = "6.50")
    @NotNull(message = "ReceivedAmount is mandatory")
    private BigDecimal paidAmount;

    @Schema(description = "Valor total, caso não informado, é calculado automatico", example = "14.00")
    private BigDecimal totalAmount;

    @Schema(description = "Metodo de pagamento", example = "PIX")
    @NotNull(message = "PaymentMethod is mandatory")
    private PaymentMethod paymentMethod;

    @Schema(description = "Descrição do pedido", example = "Sem descrição")
    private String description;

}
