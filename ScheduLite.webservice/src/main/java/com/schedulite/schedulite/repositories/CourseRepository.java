package com.schedulite.schedulite.repositories;

import com.schedulite.schedulite.models.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> { }
// extending mongo repository allows us to call findAll() and other basic useful methods