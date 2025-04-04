package com.api.pdv.dto.product;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Schema(description = "DTO com dados para criar um novo produto no sistema")
public class CreateProductDto {

    @Schema(description = "Nome do produto", example = "Água Mineral", maxLength = 50)
    @NotBlank(message = "Name is mandatory")
    @Size(max = 50, message = "Name should not exceed 50 characters")
    private String name;

    @Schema(description = "Valor de custo do produto", example = "47.59")
    @NotNull
    private BigDecimal cost;

    @Schema(description = "Preço de venda do produto ao ser adicionado ao estoque", example = "50.49")
    @NotNull
    private BigDecimal price;

    @Schema(description = "Unidade de medida do produto", example = "ml", maxLength = 20)
    @NotBlank(message = "Unit is mandatory")
    @Size(max = 20, message = "Unit should not exceed 20 characters")
    private String unit;

    @Schema(description = "A Nomenclatura Comum do Mercosul (NCM)", example = "2201.10.00")
    private String ncm;

    @Schema(description = "Marca do produto", example = "Crystal", maxLength = 30)
    @Size(max = 30, message = "Brand should not exceed 30 characters")
    private String brand;

    @Schema(description = "Categoria do produto", example = "1")
    private Long categoryId;

    @Schema(description = "Imagem do produto")
    private String image;
}
