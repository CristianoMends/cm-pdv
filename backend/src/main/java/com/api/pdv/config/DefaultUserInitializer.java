package com.api.pdv.config;

import com.api.pdv.enumeration.UserAccess;
import com.api.pdv.enumeration.UserStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.api.pdv.model.User;
import com.api.pdv.repository.UserRepository;

@Component
public class DefaultUserInitializer implements CommandLineRunner {

    @Value("${default-user.email}")
    String defaultEmail;

    @Value("${default-user.password}")
    String defaultPassword;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.count() == 0) {
            User defaultUser = new User.Builder()
                    .withName("usuario")
                    .withEmail(defaultEmail)
                    .withPassword(defaultPassword)
                    .withStatus(UserStatus.ACTIVE)
                    .withAccess(UserAccess.OWNER)
                    .build();

            userRepository.save(defaultUser);
        }
    }
}
