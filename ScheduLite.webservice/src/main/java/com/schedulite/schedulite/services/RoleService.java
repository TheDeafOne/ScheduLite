package com.schedulite.schedulite.services;

import com.schedulite.schedulite.models.Role;
import com.schedulite.schedulite.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;
    public List<Role> getAllRoles() {return roleRepository.findAll();}
}
