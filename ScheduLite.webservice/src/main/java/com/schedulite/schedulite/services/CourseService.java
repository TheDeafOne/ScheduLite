package com.schedulite.schedulite.services;

import com.schedulite.schedulite.models.Course;
import com.schedulite.schedulite.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    public List<Course> getAllCourses() {return courseRepository.findAll();}
    public Optional<Course> getByCourseNum(String number) {
        return courseRepository.findCoursesByCourse_number(number);
    }

    public Optional<Course> getByCoursePrefix(String prefix) {
        return courseRepository.findCoursesByCourse_prefix(prefix);
    }
}
