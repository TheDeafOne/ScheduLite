package com.schedulite.schedulite.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "courses")
public class Course {

    @Id
    public String id;
    public int year;
    public String semester;
    public String coursePrefix;
    public int courseNumber;
    public String courseSection;
    public String lastName;
    public String firstName;
    public String course_title;
    public int creditHours;
    public String creditVariation;
    public int courseCapacity;
    public int courseEnrollment;
    public String buildingCode;
    public int roomCode;
    public String onMonday;

    public Course() {
    }

    public Course(String id, int year, String semester, String coursePrefix, int courseNumber, String courseSection, String lastName, String firstName, String courseTitle, int creditHours, String creditVariation, int courseCapacity, int courseEnrollment, String buildingCode, int roomCode, String onMonday, String onTuesday, String onWednesday, String onThursday, String onFriday, String startTime, String endTime, String preferredName) {
        this.id = id;
        this.year = year;
        this.semester = semester;
        this.coursePrefix = coursePrefix;
        this.courseNumber = courseNumber;
        this.courseSection = courseSection;
        this.lastName = lastName;
        this.firstName = firstName;
        this.course_title = courseTitle;
        this.creditHours = creditHours;
        this.creditVariation = creditVariation;
        this.courseCapacity = courseCapacity;
        this.courseEnrollment = courseEnrollment;
        this.buildingCode = buildingCode;
        this.roomCode = roomCode;
        this.onMonday = onMonday;
        this.onTuesday = onTuesday;
        this.onWednesday = onWednesday;
        this.onThursday = onThursday;
        this.onFriday = onFriday;
        this.startTime = startTime;
        this.endTime = endTime;
        this.preferredName = preferredName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getCoursePrefix() {
        return coursePrefix;
    }

    public void setCoursePrefix(String coursePrefix) {
        this.coursePrefix = coursePrefix;
    }

    public int getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(int courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getCourseSection() {
        return courseSection;
    }

    public void setCourseSection(String courseSection) {
        this.courseSection = courseSection;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getCourse_title() {
        return course_title;
    }

    public void setCourse_title(String course_title) {
        this.course_title = course_title;
    }

    public int getCreditHours() {
        return creditHours;
    }

    public void setCreditHours(int creditHours) {
        this.creditHours = creditHours;
    }

    public String getCreditVariation() {
        return creditVariation;
    }

    public void setCreditVariation(String creditVariation) {
        this.creditVariation = creditVariation;
    }

    public int getCourseCapacity() {
        return courseCapacity;
    }

    public void setCourseCapacity(int courseCapacity) {
        this.courseCapacity = courseCapacity;
    }

    public int getCourseEnrollment() {
        return courseEnrollment;
    }

    public void setCourseEnrollment(int courseEnrollment) {
        this.courseEnrollment = courseEnrollment;
    }

    public String getBuildingCode() {
        return buildingCode;
    }

    public void setBuildingCode(String buildingCode) {
        this.buildingCode = buildingCode;
    }

    public int getRoomCode() {
        return roomCode;
    }

    public void setRoomCode(int roomCode) {
        this.roomCode = roomCode;
    }

    public String getOnMonday() {
        return onMonday;
    }

    public void setOnMonday(String onMonday) {
        this.onMonday = onMonday;
    }

    public String getOnTuesday() {
        return onTuesday;
    }

    public void setOnTuesday(String onTuesday) {
        this.onTuesday = onTuesday;
    }

    public String getOnWednesday() {
        return onWednesday;
    }

    public void setOnWednesday(String onWednesday) {
        this.onWednesday = onWednesday;
    }

    public String getOnThursday() {
        return onThursday;
    }

    public void setOnThursday(String onThursday) {
        this.onThursday = onThursday;
    }

    public String getOnFriday() {
        return onFriday;
    }

    public void setOnFriday(String onFriday) {
        this.onFriday = onFriday;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getPreferredName() {
        return preferredName;
    }

    public void setPreferredName(String preferredName) {
        this.preferredName = preferredName;
    }

    public String onTuesday;
    public String onWednesday;
    public String onThursday;
    public String onFriday;
    public String startTime;
    public String endTime;
    public String preferredName;
}
