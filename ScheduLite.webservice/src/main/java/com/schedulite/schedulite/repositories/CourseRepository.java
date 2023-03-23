package com.schedulite.schedulite.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.schedulite.schedulite.models.Course;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    public Optional<Course> findCoursesByCourse_number(String number);

    public Optional<Course> findCoursesByCourse_prefix(String prefix);
}