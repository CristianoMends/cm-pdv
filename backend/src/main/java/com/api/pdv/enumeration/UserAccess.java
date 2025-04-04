package com.api.pdv.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserAccess {

    OWNER("Dono"),
    EMPLOYEE("Funcionario"),
    MANAGER("Gestor");

    private final String description;

    }
