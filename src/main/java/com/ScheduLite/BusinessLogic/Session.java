package com.ScheduLite.BusinessLogic;

public class Session {
    private Schedule currentSchedule;
    private Search search;
    private User user;
    private String identifier;
    public Session(User user){}
    public Session(){}

    /**
     * If the user clicks on the new schedule button
     */
    public void newSchedule(){
        Schedule newS = new Schedule();
        user.addSchedule(newS);
        loadSchedule(newS);
    }

    /**
     * Can be called with a new schedule or a preexisting one
     * This function is called when the page is switched to the schedule view page
     *  or when a user clicks on a schedule
     * @param schedule the schedule to load
     */
    public void loadSchedule(Schedule schedule) {

    }

    public void unloadSchedule(){


    }
    public void saveSchedule(Schedule schedule) {}

    public String getIdentifier() {
        return null;
    }


}
