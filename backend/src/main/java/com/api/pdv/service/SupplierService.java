package com.api.pdv.service;

import com.api.pdv.dto.supplier.CreateSupplierDto;
import com.api.pdv.dto.supplier.UpdateSupplierDto;
import com.api.pdv.model.Supplier;

import java.util.List;

public interface SupplierService {

    void create(CreateSupplierDto dto);

    List<Supplier> list(
            Long id,
            String socialReason,
            String cnpj,
            String phone,
            Boolean active,
            String tradeName,
            String stateRegistration,
            String municipalRegistration
    );

    void delete(Long id);

    void update(Long id, UpdateSupplierDto dto);

}
