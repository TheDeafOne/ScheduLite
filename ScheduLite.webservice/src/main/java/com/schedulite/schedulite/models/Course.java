package com.schedulite.schedulite.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "courses")
public class Course {

    @Id
    public String id;
    public String year;
    public String semester;
    public String course_prefix;
    public String course_number;
    public String course_section;
    public String last_name;
    public String first_name;
    public String course_title;
    public String credit_hours;
    public String credit_variation;
    public String course_capacity;
    public String crs_enrollment;
    public String building_code;
    public String room_code;
    public String on_monday;
    public String on_tuesday;
    public String on_wednesday;
    public String on_thursday;
    public String on_friday;
    public String start_time;
    public String end_time;
    public String preferred_name;

    public Course() {
    }

    public Course(String id, String year, String semester, String course_prefix, String course_number, String course_section, String last_name, String first_name, String course_title, String credit_hours, String credit_variation, String course_capacity, String crs_enrollment, String building_code, String room_code, String on_monday, String on_tuesday, String on_wednesday, String on_thursday, String on_friday, String start_time, String end_time, String preferred_name) {
        this.id = id;
        this.year = year;
        this.semester = semester;
        this.course_prefix = course_prefix;
        this.course_number = course_number;
        this.course_section = course_section;
        this.last_name = last_name;
        this.first_name = first_name;
        this.course_title = course_title;
        this.credit_hours = credit_hours;
        this.credit_variation = credit_variation;
        this.course_capacity = course_capacity;
        this.crs_enrollment = crs_enrollment;
        this.building_code = building_code;
        this.room_code = room_code;
        this.on_monday = on_monday;
        this.on_tuesday = on_tuesday;
        this.on_wednesday = on_wednesday;
        this.on_thursday = on_thursday;
        this.on_friday = on_friday;
        this.start_time = start_time;
        this.end_time = end_time;
        this.preferred_name = preferred_name;
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

    public String getCourse_prefix() {
        return course_prefix;
    }

    public void setCourse_prefix(String course_prefix) {
        this.course_prefix = course_prefix;
    }

    public String getCourse_number() {
        return course_number;
    }

    public void setCourse_number(String course_number) {
        this.course_number = course_number;
    }

    public String getCourse_section() {
        return course_section;
    }

    public void setCourse_section(String course_section) {
        this.course_section = course_section;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getCourse_title() {
        return course_title;
    }

    public void setCourse_title(String course_title) {
        this.course_title = course_title;
    }

    public String getCredit_hours() {
        return credit_hours;
    }

    public void setCredit_hours(String credit_hours) {
        this.credit_hours = credit_hours;
    }

    public String getCredit_variation() {
        return credit_variation;
    }

    public void setCredit_variation(String credit_variation) {
        this.credit_variation = credit_variation;
    }

    public String getCourse_capacity() {
        return course_capacity;
    }

    public void setCourse_capacity(String course_capacity) {
        this.course_capacity = course_capacity;
    }

    public String getCrs_enrollment() {
        return crs_enrollment;
    }

    public void setCrs_enrollment(String crs_enrollment) {
        this.crs_enrollment = crs_enrollment;
    }

    public String getBuilding_code() {
        return building_code;
    }

    public void setBuilding_code(String building_code) {
        this.building_code = building_code;
    }

    public String getRoom_code() {
        return room_code;
    }

    public void setRoom_code(String room_code) {
        this.room_code = room_code;
    }

    public String getOn_monday() {
        return on_monday;
    }

    public void setOn_monday(String on_monday) {
        this.on_monday = on_monday;
    }

    public String getOn_tuesday() {
        return on_tuesday;
    }

    public void setOn_tuesday(String on_tuesday) {
        this.on_tuesday = on_tuesday;
    }

    public String getOn_wednesday() {
        return on_wednesday;
    }

    public void setOn_wednesday(String on_wednesday) {
        this.on_wednesday = on_wednesday;
    }

    public String getOn_thursday() {
        return on_thursday;
    }

    public void setOn_thursday(String on_thursday) {
        this.on_thursday = on_thursday;
    }

    public String getOn_friday() {
        return on_friday;
    }

    public void setOn_friday(String on_friday) {
        this.on_friday = on_friday;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public String getPreferred_name() {
        return preferred_name;
    }

    public void setPreferred_name(String preferred_name) {
        this.preferred_name = preferred_name;
    }

    @Override
    public String toString() {
        return "Course{" +
                "id='" + id + '\'' +
                ", year='" + year + '\'' +
                ", semester='" + semester + '\'' +
                ", course_prefix='" + course_prefix + '\'' +
                ", course_number='" + course_number + '\'' +
                ", course_section='" + course_section + '\'' +
                ", last_name='" + last_name + '\'' +
                ", first_name='" + first_name + '\'' +
                ", course_title='" + course_title + '\'' +
                ", credit_hours='" + credit_hours + '\'' +
                ", credit_variation='" + credit_variation + '\'' +
                ", course_capacity='" + course_capacity + '\'' +
                ", crs_enrollment='" + crs_enrollment + '\'' +
                ", building_code='" + building_code + '\'' +
                ", room_code='" + room_code + '\'' +
                ", on_monday='" + on_monday + '\'' +
                ", on_tuesday='" + on_tuesday + '\'' +
                ", on_wednesday='" + on_wednesday + '\'' +
                ", on_thursday='" + on_thursday + '\'' +
                ", on_friday='" + on_friday + '\'' +
                ", start_time='" + start_time + '\'' +
                ", end_time='" + end_time + '\'' +
                ", preferred_name='" + preferred_name + '\'' +
                '}';
    }
}
