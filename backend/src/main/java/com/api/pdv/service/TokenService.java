package com.api.pdv.service;

import com.api.pdv.model.User;

public interface TokenService {

    String generateToken(User user);

    String validateToken(String token);

    User getUserFromToken(String token);

    void invalidateToken(String token);

}
