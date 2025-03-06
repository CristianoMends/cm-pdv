package com.api.pdv.controller;

import com.api.pdv.docs.CustomerDoc;
import com.api.pdv.dto.customer.CreateCustomerDto;
import com.api.pdv.dto.customer.UpdateCustomerDto;
import com.api.pdv.model.Customer;
import com.api.pdv.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("customers")
public class CustomerController implements CustomerDoc {
    @Autowired
    private CustomerService service;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Void> create(
            @RequestBody @Valid CreateCustomerDto dto
    ) {
        this.service.createCustomer(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<Customer>> list(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String street,
            @RequestParam(required = false) String neighborhood,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) Boolean active,
            @RequestParam(required = false) String cnpj
    ) {
        List<Customer> customers = service.findByFilters(id, name, street, neighborhood, city, state, phone, active, cnpj);
        return ResponseEntity.ok(customers);
    }

    @CrossOrigin
    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.service.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody @Valid UpdateCustomerDto dto) {
        this.service.updateCustomer(id, dto);
        return ResponseEntity.noContent().build();
    }
}
