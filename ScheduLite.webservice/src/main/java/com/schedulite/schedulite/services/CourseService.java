package com.schedulite.schedulite.services;

import com.schedulite.schedulite.models.Course;
import com.schedulite.schedulite.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public List<Course> getAllCourses() {return courseRepository.findAll();}

    public List<Course> getByCourseNum(String number) {
        final Query query = new Query();
        final List<Criteria> criteria = new ArrayList<>();
        criteria.add(Criteria.where("course_number").is(number));
        query.addCriteria(criteria.get(0));
        return mongoTemplate.find(query,Course.class);
    }

//    public Optional<Course> getByCoursePrefix(String prefix) {
//        return courseRepository.findCoursesByCourse_prefix(prefix);
//    }
}
