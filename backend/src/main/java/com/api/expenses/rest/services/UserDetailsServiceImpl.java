package com.api.expenses.rest.services;

import com.api.expenses.rest.models.Currency;
import com.api.expenses.rest.models.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Currency currency = new Currency(
                1,
                "currencyName",
                "currencySymbol"
        );


        return new User(
                "user",
                "password",
                "email",
                "role",
                currency,
                "profilePicture"

        );
    }
}
