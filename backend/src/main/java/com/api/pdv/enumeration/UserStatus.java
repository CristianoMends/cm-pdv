package com.api.pdv.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserStatus {
    ACTIVE("Ativo"),
    INACTIVE("Inativo");

    private final String description;
    }
