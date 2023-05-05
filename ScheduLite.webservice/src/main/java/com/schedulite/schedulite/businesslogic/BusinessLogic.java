package com.schedulite.schedulite.businesslogic;

import java.util.ArrayList;
import java.util.List;

public class BusinessLogic {

    public List<String> findClasses(String input) {
        List<String> result = new ArrayList<>();
        String[] lines = input.split("\n");

        for (String line : lines) {
            String[] words = line.split(" ");
            String prevWord = null;
            for (String word : words) {
                if (word.matches("\\d{3}[A-Z]")) {
                    if (prevWord != null) {
                        result.add(prevWord + " " + word);
                    }
                    prevWord = "found";
                } else {
                    prevWord = word;
                }
            }
        }

        return result;
    }
}
