# **Hands-On Exercise 1: Test-Driven Development (TDD) – Implementing the Order Class**

## Objective

In this exercise, you will practice Test-Driven Development (TDD) by implementing an Order class based strictly on 
predefined JUnit tests.

You are given the test class below.
Your task is to write the production code so that:

1. Tests fail initially (RED phase)
2. You implement just enough logic to pass them (GREEN phase)
3. You refactor carefully without breaking tests (REFACTOR phase)

Starting with the first test case, apply the red–green–refactor cycle to each test case.


```java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class OrderTest {

    @Test
    void constructor_validInput_initializesCorrectly() {
        Order order = new Order(1, 1000);

        assertAll("Order initialization",
                () -> assertEquals(1, order.getOrderId()),
                () -> assertEquals(1000, order.getTotalAmount(), 0.001)
        );
    }

    @Test
    void constructor_negativeAmount_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> new Order(1, -1),
                "Total amount must be non-negative");
    }

    @Test
    void applyDiscount_validDiscount_reducesAmount() {
        Order order = new Order(1, 1000);

        order.applyDiscount(200);

        assertEquals(800, order.getTotalAmount(), 0.001);
    }

    @Test
    void applyDiscount_exceedsAmount_throwsException() {
        Order order = new Order(1, 500);

        assertThrows(IllegalArgumentException.class,
                () -> order.applyDiscount(600));
    }

    @Test
    void applyTax_validRate_increasesAmount() {
        Order order = new Order(1, 1000);

        order.applyTax(0.1);

        assertEquals(1100, order.getTotalAmount(), 0.001);
    }
}

```



