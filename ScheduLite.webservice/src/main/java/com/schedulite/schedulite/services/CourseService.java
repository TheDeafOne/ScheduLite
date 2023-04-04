package com.schedulite.schedulite.services;

import com.schedulite.schedulite.models.Course;
import com.schedulite.schedulite.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public List<Course> getAllCourses() {return courseRepository.findAll();} // returns all courses

    public List<Course> getCourseByCourseNumber(String courseNumber) {
        Query query = new Query();
        query.addCriteria(
                where("course_number").is(courseNumber)
        );
        // basic function that returns courses by the course number. It is the only thing added to criteria
        return mongoTemplate.find(query, Course.class);
    }

    public List<Course> getCourseByFilters(String semester, String title, String prefix, String number, String time, String name, String days) {
        Criteria crit = new Criteria();
        // for each given filter, add it to the query criteria.
        // note: all strings are made case-insensitive to make searching simpler
        if (semester != null) { crit.and("semester").regex(semester, "i");}
        if (title != null) { crit.and("course_title").regex(title, "i");}
        if (prefix != null) { crit.and("course_prefix").regex(prefix, "i");}
        if (number != null) { crit.and("course_number").is(number);}
        if (time != null) { crit.and("start_time").regex(time, "i");}
        if (name != null) { crit.and("last_name").regex(name, "i");}
        // finding each day the class occurs on
        if (days != null) {
            for (String day : days.split("")) {
                switch (day) {
                    case "M":
                        crit.and("on_monday").is("M");
                        break;
                    case "T":
                        crit.and("on_tuesday").is("T");
                        break;
                    case "W":
                        crit.and("on_wednesday").is("W");
                        break;
                    case "R":
                        crit.and("on_thursday").is("R");
                        break;
                    case "F":
                        crit.and("on_friday").is("F");
                }
            }
        }

        Query query = new Query(crit);
        // returns all courses with given filters
        return mongoTemplate.find(query,Course.class);
    }
}
