package com.schedulite.schedulite.repositories;

import com.schedulite.schedulite.models.Course;
import com.schedulite.schedulite.models.ERole;
import com.schedulite.schedulite.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    Optional<Course> findByName(Course name);
}
