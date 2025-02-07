package cc.ku.st.module2.exercises.exercise1;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ProductTest {

    @Test
    public void testIncreaseStockWithValidAmount() {
        Product product = new Product(1, "Laptop", 1000.0, 50);
        product.increaseStock(20);
        assertEquals(70, product.getStock());
    }

    @Test
    public void testIncreaseStockExceedsLimitThrowsException() {
        Product product = new Product(1, "Laptop", 1000.0, 90);
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            product.increaseStock(20);
        });
        assertEquals("Stock cannot exceed 100.", exception.getMessage());
        // assertThrows(IllegalArgumentException.class, () -> product.increaseStock(20), "Should throw an exception when stock falls below 0");

    }

    @Test
    public void testIncreaseStockWithNegativeAmountThrowsException() {
        Product product = new Product(1, "Laptop", 1000.0, 50);
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            product.increaseStock(-10);
        });
        assertEquals("Amount cannot be negative.", exception.getMessage());
    }

    @Test
    public void testApplyValidDiscount() {
        Product product = new Product(1, "Laptop", 1000.0, 50);
        product.applyDiscount(100.0);
        assertEquals(900.0, product.getPrice());
    }

    @Test
    public void testApplyDiscountNotBelowZero() {
        Product product = new Product(1, "Laptop", 50.0, 50);
        product.applyDiscount(100.0);
        assertEquals(0.0, product.getPrice());
    }

    @Test
    public void testSetPriceWithNegativeValueThrowsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            Product product = new Product(1, "Laptop", -100.0, 50);
        });
        assertEquals("Price cannot be negative.", exception.getMessage());
    }
}
