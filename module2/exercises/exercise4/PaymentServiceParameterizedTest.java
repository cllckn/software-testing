package cc.st.module2.exercises.exercise4;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.*;

class PaymentServiceParameterizedTest {

    private final PaymentService service = new PaymentService();

    @ParameterizedTest
    @CsvSource({
            "100, 100, PAID",
            "100, 150, PAID",
            "100, 99.99, FAILED"
    })
    void processPayment_validOrInsufficientAmount_setsOrderStatus(double orderAmount,
                              double paymentAmount,
                              String expectedStatus) {

        Order order = new Order("PX", orderAmount);
        service.processPayment(order, paymentAmount);

        assertEquals(expectedStatus, order.getStatus());
    }


    @ParameterizedTest
    @CsvSource({
            "0",
            "-10",
            "-0.1"
    })
    void processPayment_invalidAmount_throwsIllegalArgumentException(double paymentAmount) {

        Order order = new Order("O3", 100);

        assertAll("Invalid payment amounts should throw IllegalArgumentException",

                () -> assertThrows(IllegalArgumentException.class,
                        () -> service.processPayment(order, paymentAmount)),

                () -> assertThrows(IllegalArgumentException.class,
                        () -> service.processPayment(order, paymentAmount))
        );
    }

}
