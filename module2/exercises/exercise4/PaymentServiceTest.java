package cc.st.module2.exercises.exercise4;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PaymentServiceTest {

    private final PaymentService service = new PaymentService();

    @Test
    void processPayment_validAmount_setsOrderStatusToPaid() {
        Order order = new Order("O1", 100);
        service.processPayment(order, 100);
        assertEquals("PAID", order.getStatus());
    }

    @Test
    void processPayment_insufficientAmount_setsOrderStatusToFailed() {
        Order order = new Order("O2", 100);
        service.processPayment(order, 50);
        assertEquals("FAILED", order.getStatus());
    }

    @Test
    void processPayment_invalidAmount_throwsIllegalArgumentException() {

        Order order = new Order("O3", 100);

        assertAll("Invalid payment amounts should throw IllegalArgumentException",

                () -> assertThrows(IllegalArgumentException.class,
                        () -> service.processPayment(order, 0)),
                () -> assertThrows(IllegalArgumentException.class,
                        () -> service.processPayment(order, -10))
        );
    }

}
