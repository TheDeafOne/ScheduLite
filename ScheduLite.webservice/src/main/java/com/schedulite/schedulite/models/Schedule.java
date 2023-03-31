package com.schedulite.schedulite.models;

import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

public class Schedule {
    private String scheduleName;
    private String semester;
    @DocumentReference
    private List<Course> tentativeCourseIds;
    @DocumentReference
    private List<Course> activeCourses;

    public Schedule () {

    }
    public Schedule(String scheduleName, String semester, List<Course> tentativeCourseIds, List<Course> activeCourses) {
        this.scheduleName = scheduleName;
        this.semester = semester;
        this.tentativeCourseIds = tentativeCourseIds;
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
        return tentativeCourseIds;
    }

    public void setTentativeCourseIds(List<Course> tentativeCourseIds) {
        this.tentativeCourseIds = tentativeCourseIds;
    }

    public List<Course> getActiveCourses() {
        return activeCourses;
    }

    public void setActiveCourses(List<Course> activeCourses) {
        this.activeCourses = activeCourses;
    }
}
