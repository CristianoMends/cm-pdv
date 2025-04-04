package com.api.pdv.service.impl;

import com.api.pdv.dto.user.*;
import com.api.pdv.enumeration.UserAccess;
import com.api.pdv.enumeration.UserStatus;
import com.api.pdv.exception.BusinessException;
import com.api.pdv.factory.UserFactory;
import com.api.pdv.model.User;
import com.api.pdv.repository.UserRepository;
import com.api.pdv.service.TokenService;
import com.api.pdv.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public User registerUser(CreateUserDto userDto) {
        checkIfEmailExists(userDto.getEmail());
        checkIfPhoneExists(userDto.getPhone());

        var userToSave = UserFactory.createUser(userDto);

        return userRepository.save(userToSave);
    }

    private void checkIfEmailExists(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            if (user.getStatus().equals(UserStatus.INACTIVE)) {
                throw new BusinessException(
                        "The email provided is already associated with a user who has been deleted.",
                        HttpStatus.CONFLICT
                );
            }
            throw new BusinessException(
                    "There is already a user with the e-mail " + email,
                    HttpStatus.CONFLICT
            );
        });
    }

    private void checkIfPhoneExists(String phone) {
        if (phone == null || phone.isEmpty()) {
            return;
        }

        userRepository.findByPhone(phone).ifPresent(user -> {
            if (user.getStatus().equals(UserStatus.INACTIVE)) {
                throw new BusinessException(
                        "The phone provided is already associated with a user who has been deleted.",
                        HttpStatus.CONFLICT
                );
            }
            throw new BusinessException(
                    "There is already a user with the phone " + phone,
                    HttpStatus.CONFLICT
            );
        });
    }

    @Override
    public UserDetails getUserByEmail(String email) {
        return this.userRepository.findByEmail(email).orElseThrow(() ->
                new BusinessException("No user was found with the email provided", HttpStatus.NOT_FOUND)
        );
    }

    @Override
    public User findByEmail(String email) {
        return this.userRepository.findByEmail(email).orElseThrow(()-> new BusinessException("user not found",HttpStatus.NOT_FOUND));
    }

    @Override
    public void deactivateUser(String email) {
        var user = (User) this.getUserByEmail(email);

        if (user.getStatus().equals(UserStatus.INACTIVE)) {
            throw new BusinessException(
                    "The user with the email provided is already inactive",
                    HttpStatus.BAD_REQUEST
            );
        }
        user.setStatus(UserStatus.INACTIVE);
        this.userRepository.save(user);
    }

    @Override
    public Token authenticateUser(LoginDto loginDto) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
        var user = (User) this.authenticationManager.authenticate(usernamePassword).getPrincipal();

        if (user.getStatus().equals(UserStatus.INACTIVE)) {
            throw new BusinessException(
                    "You are trying to access an inactive account",
                    HttpStatus.FORBIDDEN
            );
        }

        var token = this.tokenService.generateToken(user);
        return new Token(token);
    }

    @Override
    public List<User> getUsers(UUID id, String name, String surname, String phone, String email, UserStatus status, UserAccess access) {

        if (email == null) email = "";
        if (phone == null) phone = "";
        if (name == null) name = "";
        if (surname == null) surname = "";

        return userRepository.findByFilters(id, name, surname, phone, email, status, access);
    }

    @Override
    public void updateUser(UpdateUserDto userDto) {
        User user = userRepository.findById(userDto.getId())
                .orElseThrow(() -> new BusinessException("User not found", HttpStatus.NOT_FOUND));

        user = User.Builder.fromUser(user)
                .withName(userDto.getName())
                .withSurname(userDto.getSurname())
                .withPhone(userDto.getPhone())
                .withEmail(userDto.getEmail())
                .withAccess(userDto.getAccess())
                .withStatus(userDto.getStatus())
                .build();

        userRepository.save(user);
    }

    @Override
    public User getLoggedUser() {
        String email = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        return this.userRepository.findByEmail(email).orElse(null);
    }

}
