package com.schedulite.schedulite.controllers;

import com.schedulite.schedulite.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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

    @GetMapping("/query")
    public ResponseEntity<?> getCourseByNumber(@RequestParam(required = false) String query) {
        return new ResponseEntity<>(courseService.getCourseByCourseNumber(query), HttpStatus.OK);
    }

    @GetMapping("/filters")
    public ResponseEntity<?> getFilteredCourses(@RequestParam(required = false) String semester, @RequestParam(required = false) String title, @RequestParam(required = false) String prefix, @RequestParam(required = false) String number, @RequestParam(required = false) String time, @RequestParam(required = false) String name) {
        return new ResponseEntity<>(courseService.getCourseByFilters(semester, title, prefix, number, time, name), HttpStatus.OK);
    }
}
