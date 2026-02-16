package cc.st.module2.exercises.exercise4;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PaymentServiceTest {

    private final PaymentService service = new PaymentService();

    @Test
    void validPaymentShouldMarkOrderAsPaid() {
        Order order = new Order("O1", 100);
        service.processPayment(order, 100);
        assertEquals("PAID", order.getStatus());
    }

    @Test
    void insufficientPaymentShouldMarkOrderAsFailed() {
        Order order = new Order("O2", 100);
        service.processPayment(order, 50);
        assertEquals("FAILED", order.getStatus());
    }

    @Test
    void zeroPaymentShouldThrowException() {
        Order order = new Order("O3", 100);
        assertThrows(IllegalArgumentException.class,
                () -> service.processPayment(order, 0));
    }

    @Test
    void negativePaymentShouldThrowException() {
        Order order = new Order("O4", 100);
        assertThrows(IllegalArgumentException.class,
                () -> service.processPayment(order, -10));
    }
}
