package com.schedulite.schedulite.models;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

public class Schedule {
    private String scheduleName;
    private String semester;
    @DocumentReference
    private List<Course> activeCourses;
    @DocumentReference
    private List<Course> tentativeCourses;

    public Schedule () {

    }
    public Schedule(String scheduleName, String semester, List<Course> tentativeCourses, List<Course> activeCourses) {
        this.scheduleName = scheduleName;
        this.semester = semester;
        this.tentativeCourses = tentativeCourses;
        this.activeCourses = activeCourses;
    }

    public String getScheduleName() {
        return scheduleName;
    }

    public void setScheduleName(String scheduleName) {
        this.scheduleName = scheduleName;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public List<Course> getTentativeCourseIds() {
        return tentativeCourses;
    }

    public void setTentativeCourseIds(List<Course> tentativeCourses) {
        this.tentativeCourses = tentativeCourses;
    }

    public List<Course> getActiveCourses() {
        return activeCourses;
    }

    public void setActiveCourses(List<Course> activeCourses) {
        this.activeCourses = activeCourses;
    }
}
