package com.schedulite.schedulite.controllers;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.schedulite.schedulite.models.Course;
import com.schedulite.schedulite.services.CourseService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@WebMvcTest(CourseController.class)
class CourseControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CourseService service;

   // public List<Course> courses;
    @Test
    public void courseShouldReturnMessageFromService() throws Exception {
        //when(service.getAllCourses()).thenReturn(courses);
        this.mockMvc.perform(get("/api/v1/courses")).andDo(print()).andExpect(status().isOk());
    }
    @Test
    void getRoles() {

    }
}