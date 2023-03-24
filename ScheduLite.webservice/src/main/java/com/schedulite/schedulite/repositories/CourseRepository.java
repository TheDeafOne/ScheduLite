package com.schedulite.schedulite.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.schedulite.schedulite.models.Course;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import com.schedulite.schedulite.models.Course;
import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
//    @Query("{course_number:?0}")
//    Optional<List<Course>> getCourseByCourse_number(String course_number);
}