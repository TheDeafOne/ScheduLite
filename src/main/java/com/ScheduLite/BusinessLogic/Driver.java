package com.ScheduLite.BusinessLogic;

import java.util.ArrayList;

public final class Driver {

    public static void main(String[] args) {
        ArrayList<Session> sessions = new ArrayList<>();
        //lets test this thing


        User keegan = new User();
        Session s1 = new Session(keegan); // if have cookies or something idk


        Session anonUser = new Session(); // if no cookies or not logged in
        sessions.add(s1);
        sessions.add(anonUser);

        // if get request from react for a new session:
            // make session and add it to the sessions arraylist

        // logged in user makes a new schedule



        // someone clicks on website

        // driver makes a new session
            // if there are cookies in the browser and we already know who they are,
            // then make a session with the current user
            // if there are no cookies and we do not know who they are, then make a new session
            //  regardless without a current user. This allows us to still have access to search, etc.
            //  but does not allow making a schedule or adding courses to a schedule UNTIL log in
        // if the anon user wants to create a schedule or something like that then they will have to log in
        //  and the session will handle the log in information and such


    }

}
