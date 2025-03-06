package com.api.pdv.service;

import com.api.pdv.dto.customer.CreateCustomerDto;
import com.api.pdv.dto.customer.UpdateCustomerDto;
import com.api.pdv.model.Customer;

import java.util.List;

public interface CustomerService {

    void createCustomer(CreateCustomerDto dto);

    List<Customer> findByFilters(Long id,
                                 String name,
                                 String phone,
                                 String street,
                                 String neighborhood,
                                 String city,
                                 String state,
                                 Boolean active,
                                 String cnpj);

    void deleteCustomer(Long id);

    void updateCustomer(Long id, UpdateCustomerDto dto);
}
