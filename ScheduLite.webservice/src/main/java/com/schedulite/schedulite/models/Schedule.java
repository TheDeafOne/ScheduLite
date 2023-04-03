package com.schedulite.schedulite.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Schedule {
    private String scheduleName;
    private String semester;

    private String year;
    @DBRef
    private Set<Course> activeCourses = new HashSet<>();
    @DBRef
    private Set<Course> tentativeCourses = new HashSet<>();

    public Schedule () {

    }

    public Schedule(String scheduleName, String semester, String year, Set<Course> tentativeCourses, Set<Course> activeCourses) {
        this.scheduleName = scheduleName;
        this.year = year;
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

    public Set<Course> getTentativeCourses() {
        return tentativeCourses;
    }

    public void setTentativeCourses (Set<Course> tentativeCourses) {
        this.tentativeCourses = tentativeCourses;
    }

    public Set<Course> getActiveCourses() {
        return activeCourses;
    }

    public void setActiveCourses(Set<Course> activeCourses) {
        this.activeCourses = activeCourses;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    @Override
    public String toString() {
        return "Schedule{" +
                "scheduleName='" + scheduleName + '\'' +
                ", semester='" + semester + '\'' +
                ", year='" + year + '\'' +
                ", activeCourses=" + activeCourses +
                ", tentativeCourses=" + tentativeCourses +
                '}';
    }

    //    @Override
//    public int hashCode() {
//        return scheduleName.hashCode();
//    }
}
