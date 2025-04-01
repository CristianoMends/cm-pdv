package com.api.pdv.service;

import com.api.pdv.dto.user.*;
import com.api.pdv.enumeration.UserAccess;
import com.api.pdv.enumeration.UserStatus;
import com.api.pdv.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.UUID;

public interface UserService {

    User registerUser(CreateUserDto userDto);

    UserDetails getUserByEmail(String email);

    User findByEmail(String email);

    void deactivateUser(String email);

    Token authenticateUser(LoginDto loginDto);

    List<User> getUsers(UUID id,
                        String name,
                        String surname,
                        String phone,
                        String email,
                        UserStatus status,
                        UserAccess access);

    void updateUser(UpdateUserDto userDto);

    User getLoggedUser();
}
