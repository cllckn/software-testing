package cc.st.module2.exercises.exercise4;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class OrderTest {

    @Test
    void constructor_validAmount_setsStatusToNew() {
        Order order = new Order("O1", 100.0);
        assertEquals("NEW", order.getStatus());
    }

    @Test
    void constructor_invalidAmount_throwsIllegalArgumentException() {
        assertAll("Invalid constructor amounts should throw IllegalArgumentException",

                () -> assertThrows(IllegalArgumentException.class,
                        () -> new Order("O2", 0)),

                () -> assertThrows(IllegalArgumentException.class,
                        () -> new Order("O3", -50))
        );
    }


}
