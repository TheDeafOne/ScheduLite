package com.schedulite.schedulite.controllers;

import com.schedulite.schedulite.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@CrossOrigin
@RequestMapping("api/v1/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<?> getCourses() {
        return new ResponseEntity<>(courseService.getAllCourses(), HttpStatus.OK);
    }

//    @GetMapping("/query")
//    public ResponseEntity<?> getFilteredCourses(@RequestBody String query) {
//        return new ResponseEntity<>(courseService.getByCourseNum(query), HttpStatus.OK);}
}
