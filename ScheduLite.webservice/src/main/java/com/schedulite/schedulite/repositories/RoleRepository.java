package com.schedulite.schedulite.repositories;

import com.schedulite.schedulite.models.ERole;
import com.schedulite.schedulite.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
