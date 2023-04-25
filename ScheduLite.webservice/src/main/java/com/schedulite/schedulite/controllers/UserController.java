package com.schedulite.schedulite.controllers;

import com.schedulite.schedulite.models.Course;
import com.schedulite.schedulite.models.Schedule;
import com.schedulite.schedulite.models.User;
import com.schedulite.schedulite.services.RoleService;
import com.schedulite.schedulite.services.UserDetailsImpl;
import com.schedulite.schedulite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
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
        // checking for valid user and schedule
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
        // if user and schedule provided is valid, return successful notice
        return new ResponseEntity<>("Successfully added schedule", HttpStatus.OK);
    }

    @PostMapping("remove-schedule")
    public ResponseEntity<?> removeSchedule(@Valid @RequestBody Schedule oldSchedule) {
        // checking for valid user request
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
        // deletes selected schedule of the current user
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


    @RequestMapping("upload-transcript")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> classify(@Valid @NotNull @RequestParam("file") final MultipartFile pdfFile) {

        return new ResponseEntity<>("Successfully added completed courses", HttpStatus.OK);
    }



        public List<String> findClasses(String input) {
        List<String> result = new ArrayList<>();
        String[] lines = input.split("\n");

        for (String line : lines) {
            String[] words = line.split(" ");
            String prevWord = null;
            for (String word : words) {
                if (word.matches("\\d{3}[A-Z]")) {
                    if (prevWord != null) {
                        result.add(prevWord + " " + word);
                    }
                    prevWord = "found";
                } else {
                    prevWord = word;
                }
            }
        }

        return result;
    }
}
