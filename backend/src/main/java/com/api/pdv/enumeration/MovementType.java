package com.api.pdv.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MovementType {

    ENTRY("Entrada"),
    WITHDRAWAL("Retirada");

    private final String description;

}
