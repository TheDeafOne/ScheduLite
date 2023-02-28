package com.ScheduLite.BusinessLogic;

import java.util.ArrayList;

public class Schedule {
    public ArrayList<Course> currentCourses;
    public ArrayList<Course> tentativeCourses;
    public ArrayList<Course> suggestedCourses;
    public String title;
    public String semester;
    public ArrayList<Conflict> conflicts;

    public void addCourse(Course course){}
    public void removeCourse(Course course){}
}
