package cc.st.module2.exercises.exercise1;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class ProductTest {

    // Test case
    // Single scenario that tests a specific behavior or functionality of a unit
    @Test
    public void reduceStock_validQuantity_updatesStockCorrectly() {

        //Arrange: Set up the initial conditions (initialize a Product object with 10 units in stock).
        cc.st.module2.Product product = new cc.st.module2.Product(1, "Laptop", 999.99, 10);

        //Act: Perform the action to test (reduce stock by 3).
        product.reduceStock(3);

        //Assert: Verify the result (stock should now be 7).
        // Compare the real output with the expected result
        assertEquals(7, product.getStockQuantity(),
                () -> "Stock quantity should be 7 after reducing 3 units from an initial 10.");
    }

    @Test
    public void reduceStock_invalidQuantity_throwsException() {

        //Arrange: Set up the initial conditions (initialize a Product object with 10 units in stock).
        cc.st.module2.exercises.exercise1.Product product = new cc.st.module2.exercises.exercise1.Product(1, "Laptop", 999.99, 10);

        // 2. Act & Assert: Attempting to send a negative number
        assertThrows(IllegalArgumentException.class,
                () -> product.reduceStock(-10),
                () -> "An IllegalArgumentException should be thrown  when an invalid quantity is attempted.");

    }

    @Test
    public void reduceStock_insufficientStockQuantity_throwsException() {
        cc.st.module2.exercises.exercise1.Product product = new cc.st.module2.exercises.exercise1.Product(1, "Laptop", 1000.0, 5);
        // assertThrows message appears if NO exception is thrown
        assertThrows(IllegalArgumentException.class,
                () -> product.reduceStock(8),
                ()-> "An IllegalArgumentException should be thrown when an invalid stock reduction is attempted.");
    }


    // Test case
    // Single scenario that tests a specific behavior or functionality of a unit
    @Test
    public void increaseStock_validQuantity_updatesStockCorrectly() {

        //Arrange: Set up the initial conditions (initialize a Product object with 10 units in stock).
        Product product = new Product(1, "Laptop", 999.99, 10);

        //Act: Perform the action to test (reduce stock by 3).
        product.increaseStock(5);

        //Assert: Verify the result (stock should now be 15).
        // Compare the real output with the expected result
        assertEquals(15, product.getStockQuantity(),
                () -> "Stock quantity should be 15 after increasing initial 10 by 5.");
    }

    @Test
    public void increaseStock_exeedsLimit_throwsException() {
        // 1. Arrange: Start with 60 units
        Product product = new Product(1, "Laptop", 1000.0, 60);

        // 2. Act & Assert: Adding 50 would total 110, which exceeds the limit of 100
        assertThrows(IllegalArgumentException.class,
                () -> product.increaseStock(50),
                ()-> "An IllegalArgumentException should be thrown when stock exceeds the maximum limit.");
    }

    @Test
    public void increaseStock_invalidQuantity_throwsException() {
        // 1. Arrange: Start with 50 units
        Product product = new Product(1, "Laptop", 1000.0, 50);

        // 2. Act & Assert: Attempting to add a negative number
        assertThrows(IllegalArgumentException.class,
                () -> product.increaseStock(-10),
                ()-> "An IllegalArgumentException should be thrown  when an invalid quantity is attempted.");
    }

    @Test
    public void applyDiscount_validDiscount_appliesDiscountCorrectly() {
        Product product = new Product(1, "Laptop", 1000.0, 50);
        product.applyDiscount(100.0);
        assertEquals(900.0, product.getPrice(),
                () -> "Price should be 900 after applying a discount 100 to the original price of 1000");
    }

    @Test
    public void applyDiscount_invalidDiscount_throwsException() {
        Product product = new Product(1, "Laptop", 50.0, 50);
        product.applyDiscount(100.0);
        assertEquals(0.0, product.getPrice(),
                () -> "Price should be 0 after applying a discount 100 to the original price of 50");
    }

    @Test
    public void constructor_invalidPrice_throwsException() {
        // 2. Act & Assert: Attempting to send a negative number
        assertThrows(IllegalArgumentException.class,
                () -> new Product(1, "Laptop", -100.0, 50),
                ()-> "An IllegalArgumentException should be thrown  when an invalid price is attempted.");

    }
}
