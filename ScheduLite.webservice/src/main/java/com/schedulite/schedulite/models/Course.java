package com.schedulite.schedulite.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "courses")
@CompoundIndexes({
        @CompoundIndex(
                name = "smart_search_index",
                def = "{'lastName' : 5, 'coursePrefix': 4, 'courseTitle': 2, 'courseNumber': 3, 'firstName': 1}")
})
public class Course {

    @Id
    public String id;
    public String year;
    public String semester;
    public String coursePrefix;
    public String courseNumber;
    public String courseSection;
    public String lastName;
    public String firstName;
    public String courseTitle;
    public String creditHours;
    public String creditVariation;
    public String courseCapacity;
    public String buildingCode;
    public String roomCode;
    public String onMonday;
    public String onTuesday;
    public String onWednesday;
    public String onThursday;
    public String onFriday;
    public String startTime;
    public String endTime;

    public Course() {
    }

    public Course(String id, String year, String semester, String coursePrefix, String courseNumber, String courseSection, String lastName, String firstName, String courseTitle, String creditHours, String creditVariation, String courseCapacity, String buildingCode, String roomCode, String onMonday, String onTuesday, String onWednesday, String onThursday, String onFriday, String startTime, String endTime) {
        this.id = id;
        this.year = year;
        this.semester = semester;
        this.coursePrefix = coursePrefix;
        this.courseNumber = courseNumber;
        this.courseSection = courseSection;
        this.lastName = lastName;
        this.firstName = firstName;
        this.courseTitle = courseTitle;
        this.creditHours = creditHours;
        this.creditVariation = creditVariation;
        this.courseCapacity = courseCapacity;
        this.buildingCode = buildingCode;
        this.roomCode = roomCode;
        this.onMonday = onMonday;
        this.onTuesday = onTuesday;
        this.onWednesday = onWednesday;
        this.onThursday = onThursday;
        this.onFriday = onFriday;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
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

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
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

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public String getCreditHours() {
        return creditHours;
    }

    public void setCreditHours(String creditHours) {
        this.creditHours = creditHours;
    }

    public String getCreditVariation() {
        return creditVariation;
    }

    public void setCreditVariation(String creditVariation) {
        this.creditVariation = creditVariation;
    }

    public String getCourseCapacity() {
        return courseCapacity;
    }

    public void setCourseCapacity(String courseCapacity) {
        this.courseCapacity = courseCapacity;
    }

    public String getBuildingCode() {
        return buildingCode;
    }

    public void setBuildingCode(String buildingCode) {
        this.buildingCode = buildingCode;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public void setRoomCode(String roomCode) {
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

    @Override
    public String toString() {
        return "Course{" +
                "id='" + id + '\'' +
                ", year='" + year + '\'' +
                ", semester='" + semester + '\'' +
                ", coursePrefix='" + coursePrefix + '\'' +
                ", courseNumber='" + courseNumber + '\'' +
                ", courseSection='" + courseSection + '\'' +
                ", lastName='" + lastName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", courseTitle='" + courseTitle + '\'' +
                ", creditHours='" + creditHours + '\'' +
                ", creditVariation='" + creditVariation + '\'' +
                ", courseCapacity='" + courseCapacity + '\'' +
                ", buildingCode='" + buildingCode + '\'' +
                ", roomCode='" + roomCode + '\'' +
                ", onMonday='" + onMonday + '\'' +
                ", onTuesday='" + onTuesday + '\'' +
                ", onWednesday='" + onWednesday + '\'' +
                ", onThursday='" + onThursday + '\'' +
                ", onFriday='" + onFriday + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                '}';
    }
}