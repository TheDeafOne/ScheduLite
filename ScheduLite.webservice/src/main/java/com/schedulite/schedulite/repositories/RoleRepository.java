package com.schedulite.schedulite.repositories;

import com.schedulite.schedulite.models.ERole;
import com.schedulite.schedulite.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
