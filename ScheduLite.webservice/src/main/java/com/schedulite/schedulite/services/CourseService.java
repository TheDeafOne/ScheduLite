package com.schedulite.schedulite.services;

import com.schedulite.schedulite.models.Course;
import com.schedulite.schedulite.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public List<Course> getAllCourses() {return courseRepository.findAll();}

    public List<Course> getCourseByCourseNumber(String courseNumber) {
        Query query = new Query();
        query.addCriteria(
                Criteria.where("course_number").is(courseNumber)
        );
        return mongoTemplate.find(query,Course.class);
    }

    public List<Course> getCourseByFilters(String semester, String title, String prefix, String number, String time, String name) {
        Criteria crit = new Criteria();
        if (semester != null) { crit.and("semester").regex(semester, "i");}
        if (title != null) { crit.and("course_title").regex(title, "i");}
        if (prefix != null) { crit.and("course_prefix").regex(prefix, "i");}
        if (number != null) { crit.and("course_number").is(number);}
        if (time != null) { crit.and("start_time").regex(time, "i");}
        if (name != null) { crit.and("last_name").regex(name, "i");}

        Query query = new Query(crit);
        return mongoTemplate.find(query,Course.class);
    }
}
