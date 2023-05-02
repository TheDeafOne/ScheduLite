package com.schedulite.schedulite.controllers;

import com.schedulite.schedulite.models.Course;
import com.schedulite.schedulite.models.Schedule;
import com.schedulite.schedulite.models.User;
import com.schedulite.schedulite.services.CourseService;
import com.schedulite.schedulite.services.UserDetailsImpl;
import com.schedulite.schedulite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/v1/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getCourses() {
        return new ResponseEntity<>(courseService.getAllCourses(), HttpStatus.OK);
    }
    @GetMapping("/query")
    public ResponseEntity<?> getCoursesByQuery(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String courseTitle,
            @RequestParam(required = false) String coursePrefix,
            @RequestParam(required = false) String courseNumber,
            @RequestParam(required = false) String semester,
            @RequestParam(required = false) String courseTime,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String days
    ) {
        // return all courses by the given number, or none if none found
        return new ResponseEntity<>(courseService.getCourseByFiltersAndQuery(query, courseTitle, coursePrefix, courseNumber,
                semester, courseTime, firstName, lastName, days), HttpStatus.OK);
    }

    @GetMapping("/by-schedule")
    public ResponseEntity<?> getCoursesBySchedule(@RequestParam String scheduleName) {
        // making sure the user that created a schedule is trying to access the schedule
        String userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        if (userId == null) {
            return new ResponseEntity<>("Not logged in", HttpStatus.FORBIDDEN);
        }

        Optional<User> optionalUser = userService.getUserByUserId(userId);
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>("User does not exist", HttpStatus.FORBIDDEN);
        }
        User currentUser = optionalUser.get();
        Schedule returnSchedule = new Schedule();
        for (Schedule schedule : currentUser.getSchedules()) {
            if (schedule.getScheduleName().equals(scheduleName)) {
                returnSchedule = schedule;
            }
        }
        // gathering all selected courses in their active or tentative lists
        HashMap<String, Set<Course>> courseMap = new HashMap<>();
        courseMap.put("active",returnSchedule.getActiveCourses());
        courseMap.put("tentative",returnSchedule.getTentativeCourses());

        return new ResponseEntity<>(courseMap,HttpStatus.OK);
    }
}
