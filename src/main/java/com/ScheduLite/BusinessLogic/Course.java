package com.ScheduLite.BusinessLogic;

import java.util.ArrayList;

public class Course {
    public int ref;
    public String prof;
    public String time;
    public int capacity;
    public String dept;
    public String title; // dept + code
    public String room;
    public int credits;
    public ArrayList<Course> prereqs;
    public ArrayList<Course> coreqs;
    public String semester;
    public String division;
    public String description;
    public String course_type;

    // this might serve best as a record instead of a class
}
