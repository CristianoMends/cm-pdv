package com.api.pdv.controller;

import com.api.pdv.docs.UserDoc;
import com.api.pdv.dto.user.*;
import com.api.pdv.enumeration.UserAccess;
import com.api.pdv.enumeration.UserStatus;
import com.api.pdv.model.User;
import com.api.pdv.service.UserService;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController implements UserDoc {

    @Autowired
    private UserService userService;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody @Valid CreateUserDto userDto) {
        userService.registerUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<Token> authenticate(@RequestBody @Valid LoginDto loginDto) {
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.authenticateUser(loginDto));
    }

    @DeleteMapping()
    @CrossOrigin
    public ResponseEntity<Void> delete(
            @Parameter(description = "E-mail do usuário a ser desativado", required = true)
            @RequestParam @Email(message = "Email deve ser válido") String email
    ) {
        this.userService.deactivateUser(email);
        return ResponseEntity.noContent().build();
    }


    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<ViewUserDto>> list(
            @RequestParam(required = false) UUID id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String surname,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) UserStatus status,
            @RequestParam(required = false) UserAccess access
    ) {
        List<ViewUserDto> users = userService.getUsers(id, name, surname, phone, email, status, access)
                .stream()
                .map(User::toView)
                .toList();
        return ResponseEntity.ok().body(users);
    }

    @PutMapping()
    @CrossOrigin
    public ResponseEntity<Void> update(
            @RequestParam UUID id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String surname,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) UserStatus status,
            @RequestParam(required = false) UserAccess access,
            @RequestParam(required = false) String password
    ) {
        var userDto = new UpdateUserDto(id, name, surname, phone, email, status, access, password);
        userService.updateUser(userDto);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin
    @GetMapping("/logged")
    public ResponseEntity<ViewUserDto> getLogged() {
        var u = this.userService.getLoggedUser();

        if (u != null){
            System.out.println(u.getEmail());

            var user = this.userService.findByEmail(u.getEmail());

            return ResponseEntity.ok(user.toView());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


}
