package cc.ku.st.module2.exercises.exercise4;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ParameterizedStudentTest {
    @ParameterizedTest
    @CsvSource({
            "95, A", "85, B", "75, C", "65, D", "50, F"
    })
    void testLetterGradesParameterized(int grade, String expected) {
        assertEquals(expected, new Student("Test", grade).getLetterGrade());
    }
}
