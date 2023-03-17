package com.schedulite.schedulite.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.schedulite.schedulite.models.Course;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {

}