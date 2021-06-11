package com.example;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ServiceTest {

    Service service;

    @BeforeEach
    void setup() {
        service = new Service();
    }

    @Test
    void nameInput() {
        assertEquals("Hello Alan Turing", service.hello("Alan Turing"));
    }

}
