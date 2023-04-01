package com.schedulite.schedulite.controllers;

import com.schedulite.schedulite.models.Course;
import com.schedulite.schedulite.models.Schedule;
import com.schedulite.schedulite.models.User;
import com.schedulite.schedulite.services.RoleService;
import com.schedulite.schedulite.services.UserDetailsImpl;
import com.schedulite.schedulite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/v1/users")
public class UserController {
    @Autowired
    private RoleService roleService;
    @Autowired
    private UserService userService;

    @GetMapping("/roles")
    public ResponseEntity<?> getRoles() {
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }

    @PostMapping("/add-schedule")
    public ResponseEntity<?> addSchedule(@Valid @RequestBody Schedule newSchedule) {
        String userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        if (userId == null) {
            return new ResponseEntity<>("Not logged in", HttpStatus.FORBIDDEN);
        }

        Optional<User> optionalUser = userService.getUserByUserId(userId);
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>("User does not exist", HttpStatus.FORBIDDEN);
        }

        User currentUser = optionalUser.get();

        currentUser.addSchedule(newSchedule);
        userService.setUpdatedUser(currentUser);

        return new ResponseEntity<>("Successfully added schedule", HttpStatus.OK);
    }

    @PostMapping("remove-schedule")
    public ResponseEntity<?> removeSchedule(@Valid @RequestBody Schedule oldSchedule) {
        String userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        if (userId == null) {
            return new ResponseEntity<>("Not logged in", HttpStatus.FORBIDDEN);
        }

        Optional<User> optionalUser = userService.getUserByUserId(userId);
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>("User does not exist", HttpStatus.FORBIDDEN);
        }
        User currentUser = optionalUser.get();

        currentUser.removeSchedule(oldSchedule.getScheduleName());
        userService.setUpdatedUser(currentUser);

        return new ResponseEntity<>("Successfully removed schedule", HttpStatus.OK);
    }

    @PostMapping("update-schedule")
    public ResponseEntity<?> updateSchedule(@Valid @RequestBody Schedule updatedSchedule) {
        String userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        if (userId == null) {
            return new ResponseEntity<>("Not logged in", HttpStatus.FORBIDDEN);
        }

        Optional<User> optionalUser = userService.getUserByUserId(userId);
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>("User does not exist", HttpStatus.FORBIDDEN);
        }
        User currentUser = optionalUser.get();

        currentUser.removeSchedule(updatedSchedule.getScheduleName());
        currentUser.addSchedule(updatedSchedule);

        userService.setUpdatedUser(currentUser);

        return new ResponseEntity<>("Successfully updated schedule", HttpStatus.OK);
    }

}
