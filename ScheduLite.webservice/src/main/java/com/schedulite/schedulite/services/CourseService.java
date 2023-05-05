package com.schedulite.schedulite.services;

import com.mongodb.BasicDBObject;
import com.schedulite.schedulite.models.Course;
import com.schedulite.schedulite.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.*;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

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

    public List<Course> getCourseByFiltersAndQuery(String searchString, String courseTitle, String coursePrefix, String courseNumber,
                                                   String semester, String year, String courseTime, String firstName, String lastName, String days) {
        Criteria filterCriteria = new Criteria();
        // for each given filter, add it to the query criteria.
        // note: all strings are made case-insensitive to make searching simpler
        if (semester != null) { filterCriteria.and("semester").regex(semester, "i");}
        if (year != null) { filterCriteria.and("year").regex(year, "i");}
        if (courseTitle != null) { filterCriteria.and("courseTitle").regex(courseTitle, "i");}
        if (coursePrefix != null) { filterCriteria.and("coursePrefix").regex(coursePrefix, "i");}
        if (courseNumber != null) { filterCriteria.and("courseNumber").is(courseNumber);}
        if (courseTime != null) { filterCriteria.and("startTime").regex(courseTime, "i");}
        if (lastName != null) { filterCriteria.and("lastName").regex(lastName, "i");}
        if (firstName != null) { filterCriteria.and("firstName").regex(firstName, "i");}
        // finding each day the class occurs on
        if (days != null) {
            for (String day : days.split("")) {
                switch (day) {
                    case "M":
                        filterCriteria.and("onMonday").is(true);
                        break;
                    case "T":
                        filterCriteria.and("onTuesday").is(true);
                        break;
                    case "W":
                        filterCriteria.and("onWednesday").is(true);
                        break;
                    case "R":
                        filterCriteria.and("onThursday").is(true);
                        break;
                    case "F":
                        filterCriteria.and("onFriday").is(true);
                }
            }
        }


        Query query = new Query();
        if (searchString != null && !searchString.equals("")) {
            query = TextQuery
                    .queryText(new TextCriteria().matchingAny(searchString.split(" ")))
                    .sortByScore()
                    .includeScore();
        }
        query.addCriteria(filterCriteria);




        // returns all courses with given filters
        return mongoTemplate.find(query,Course.class);

    }
}
