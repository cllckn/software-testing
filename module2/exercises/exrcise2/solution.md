

~~~java
//Order.java
public class Order {
private final String orderId;
private double totalAmount;

    public Order(String orderId, double totalAmount) {
        if (totalAmount < 0) {
            throw new IllegalArgumentException("Total amount cannot be negative");
        }
        this.orderId = orderId;
        this.totalAmount = totalAmount;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void applyDiscount(double discount) {
        if (discount < 0) {
            throw new IllegalArgumentException("Discount cannot be negative");
        }
        if (discount > totalAmount) {
            throw new IllegalArgumentException("Discount cannot exceed total amount");
        }
        this.totalAmount -= discount;
    }
}
~~~
~~~java
// OrderTest.java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class OrderTest {
@Test
void testApplyValidDiscount() {
Order order = new Order("order-1", 100.0);
order.applyDiscount(20.0);
assertEquals(80.0, order.getTotalAmount(), 0.01);
}

    @Test
    void testApplyNegativeDiscountThrowsException() {
        Order order = new Order("order-1", 100.0);
        assertThrows(IllegalArgumentException.class, () -> order.applyDiscount(-10.0));
    }

    @Test
    void testApplyExcessiveDiscountThrowsException() {
        Order order = new Order("order-1", 100.0);
        assertThrows(IllegalArgumentException.class, () -> order.applyDiscount(150.0));
    }
}
~~~
