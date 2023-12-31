package com.codecool.trv.repository;

import com.codecool.trv.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByUsername(String name);

    Optional<User> findByEmail(String email);

}
