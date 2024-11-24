package com.api.expenses.rest.services;

import com.api.expenses.rest.models.Currency;
import com.api.expenses.rest.models.User;
import com.api.expenses.rest.repositories.CurrencyRepository;
import com.api.expenses.rest.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final CurrencyRepository currencyRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, CurrencyRepository currencyRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.currencyRepository = currencyRepository;
        this.passwordEncoder = passwordEncoder;
    }


    /**
     * Creates a new user, by encoding the password and saving the user to the database
     * @param username
     * @param password
     * @param email
     * @param currencyId
     * @param role
     * @throws RuntimeException if the currency with the given id is not found
     * @return the id of the created user
     */
    public UUID createUser(
            String username,
            String password,
            String email,
            int currencyId,
            String role) {

        Currency currency = getCurrencyById(currencyId);

        String encodedPassword = passwordEncoder.encode(password);

        User user = new User(
                username,
                encodedPassword,
                email,
                role,
                currency,
                "profilePicture"
        );

       User savedUser =  userRepository.save(user);
       return savedUser.getId();
    }

    /**
     * Authenticates a user by checking if the username exists and the password matches
     * @param username
     * @param password
     * @return true if the user has been successfully authenticated, false otherwise
     */
    public boolean authenticateUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent() && passwordEncoder.matches(password, user.get().getPassword());
    }

    public boolean updateUser(User user) {

        // Validate it has a correct currency
        Currency currency = getCurrencyById(user.getCurrency().getId());

        userRepository.save(user);
        return true; // TODO: check what happens if the user has the email of another user
    }

    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }





    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    private Currency getCurrencyById(int currencyId) {
        return currencyRepository.findById(currencyId).
                orElseThrow(() -> new RuntimeException("Currency not found")); // TODO: create a custom exception
    }
}
