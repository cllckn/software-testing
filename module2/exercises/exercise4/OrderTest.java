package cc.st.module2.exercises.exercise4;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class OrderTest {

    @Test
    void orderShouldBeCreatedWithCreatedStatus() {
        Order order = new Order("O1", 100.0);
        assertEquals("NEW", order.getStatus());
    }

    @Test
    void zeroAmountShouldThrowException() {
        assertThrows(IllegalArgumentException.class,
                () -> new Order("O2", 0));
    }

    @Test
    void negativeAmountShouldThrowException() {
        assertThrows(IllegalArgumentException.class,
                () -> new Order("O3", -50));
    }
}
