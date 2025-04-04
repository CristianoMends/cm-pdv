package com.api.pdv.dto.stock;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO utilizado para transferir informações de atualização de estoque.")
public class UpdateStockDto {

    @Schema(description = "Identificador único do produto", example = "1")
    private Long productId;

    @Schema(description = "Nova quantidade em estoque. Pode ser nulo caso não haja alteração na quantidade",
            example = "100")
    private Integer quantity;
}
