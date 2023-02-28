package com.ScheduLite.BusinessLogic;

import java.util.ArrayList;

public class Search {
    public String query;
    public ArrayList<String> filters;
    public ArrayList<Course> results;
    public Schedule scheduleInstance;

    public Search(Schedule schedule){}
    public Search(){}

    public void queryDB(){

        scheduleInstance.addCourse(new Course());
        // if have schedule
        // auto filter results on the current term

        // if the schedule attribute is NULL (no schedule provided in init)
            // provide a new filter option on the side to filter on term
    }

    // user clicks on a class to add
    public void addFilter(String filter){}
    public void removeFilter(String filter){}

    public void loadSchedule(Schedule s){}
    public void unloadSchedule(){}

}
