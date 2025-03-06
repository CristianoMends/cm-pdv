package com.api.pdv.factory;

import com.api.pdv.dto.user.CreateUserDto;
import com.api.pdv.enumeration.UserStatus;
import com.api.pdv.model.User;
import com.api.pdv.security.PasswordEncoderSingleton;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserFactory {
    private static final BCryptPasswordEncoder encoder = PasswordEncoderSingleton.getInstance().getEncoder();

    public static User createUser(CreateUserDto dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setAccess(dto.getAccess());
        user.setStatus(UserStatus.ACTIVE);
        user.setPassword(encoder.encode(dto.getPassword()));

        return user;
    }
}
