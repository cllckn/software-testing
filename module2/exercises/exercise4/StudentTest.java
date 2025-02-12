package cc.ku.st.module2.exercises.exercise4;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class StudentTest {
    @Test
    void testLetterGrades() {
        assertEquals("A", new Student("Jane", 95).getLetterGrade());
        assertEquals("B", new Student("Jack", 85).getLetterGrade());
        assertEquals("C", new Student("Joe", 75).getLetterGrade());
        assertEquals("D", new Student("Doe", 65).getLetterGrade());
        assertEquals("F", new Student("Eve", 50).getLetterGrade());
    }

    @Test
    void testInvalidGradeThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> new Student("Invalid", -1));
        assertThrows(IllegalArgumentException.class, () -> new Student("Invalid", 101));
    }

}