# Module 2: Introduction to Unit Testing

## What is Unit Testing?
Unit testing is the process of testing individual components (or "units") of a software application in isolation. A unit is typically a single method, function, or class. The goal is to verify that each unit behaves as expected under various conditions.

### Why Unit Testing?

    Ensures that individual components work correctly.
    
    Helps catch bugs early in the development process.
    
    Makes code easier to maintain and refactor.
    
    Acts as documentation for how the code is supposed to behave.

## Writing Your First Unit Test with JUnit
Let’s write a simple unit test for the following Java Product class:
~~~java
public class Product {
    private int id;
    private String name;
    private double price;
    private int stock;

    public Product(int id, String name, double price, int stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    public void reduceStock(int amount) {
        if (amount > stock) {
            throw new IllegalArgumentException("Cannot reduce stock below 0");
        }
        stock -= amount;
    }

    public int getStock() {
        return stock;
    }

    // Other getters and setters...
}
~~~
~~~java
public class ProductMain {
    public static void main(String[] args) {
        Product product = new Product(1, "Laptop", 1000.0, 10);
        System.out.println(product);
    }
}
~~~

The following is an example of a test case for the reduceStock method:
~~~java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class ProductTest {

    @Test
    public void testReduceStock() {
        // Arrange
        Product product = new Product(1, "Laptop", 999.99, 10);

        // Act
        product.reduceStock(3);

        // Assert
        assertEquals(7, product.getStock(), "Stock should be reduced by 3");
    }
}

~~~

## Test Cases, Assertions, and Test Suites
### Test Case: A single scenario to test a specific behavior of a method.
    
    In a test case there are 3 divisions:
    
      Arrange: Set up the initial conditions (initialize a Product object with 10 units in stock).
    
      Act: Perform the action to test (reduce stock by 3).
      
      Assert: Verify the result (stock should now be 7).


### Assertions: Used to verify that the actual output matches the expected output. The followings are JUnit assertions:

| Assertion                          | Description                                  |
|------------------------------------|----------------------------------------------|
| `assertEquals(expected, actual)`  | Checks if two values are equal.             |
| `assertTrue(condition,message)`           | Passes if the condition is `true`.          |
| `assertFalse(condition, message)`          | Passes if the condition is `false`.         |
| `assertThrows(Exception.class, () -> method())` | Ensures an exception is thrown. |
| `assertThrows(Exception.class, () -> method())` | Ensures an exception is thrown. |
| `assertAll("message", () -> {...})`           | Groups multiple assertions together; fails if any assertion fails. It can group multiple assertions, making it easier to test related conditions in one block. |


Here’s a complete example that combines all the assertions:

~~~java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;


public class ProductTest1 {

    @Test
    public void testReduceStock() {
        Product product = new Product(1, "Laptop", 1000.0, 10);
        product.reduceStock(5);
        assertEquals(5, product.getStock());
    }

    @Test
    public void testSetPrice() {
        Product product = new Product(1, "Laptop", 1000.0, 10);
        product.setPrice(1200.0);
        assertEquals(1200.0, product.getPrice());
    }

    @Test
    public void testIsInStock() {
        Product product = new Product(1, "Laptop", 1000.0, 10);
        assertTrue(product.getStock() > 0, "Stock should be greater than 0");
    }

    @Test
    public void testNotInStock() {
        Product product = new Product(1, "Laptop", 1000.0, -10);
        assertFalse(product.getStock() < 0, "Stock should not be negative");
    }

    @Test
    public void testReduceStockThrowsException() {
        Product product = new Product(1, "Laptop", 1000.0, 5);
        assertThrows(IllegalArgumentException.class, () -> product.reduceStock(8));
    }

    @Test
    public void testMultipleAssertions() {
        Product product = new Product(1, "Laptop", 1000.0, 10);
        assertAll("test multiple assertions",
                () -> assertEquals(1, product.getId()),
                () -> assertEquals("Laptop", product.getName()),
                () -> assertEquals(1000.0, product.getPrice()),
                () -> assertEquals(10, product.getStock())
        );
    }

}
~~~



### Test Suite: A collection of test cases grouped together.


## JUnit Annotations

JUnit uses annotations to define test methods and setup/teardown methods. Here are the most common annotations:

| Annotation   | Description                                      |
|-------------|--------------------------------------------------|
| `@Test`      | Marks a method as a test case.                  |
| `@BeforeEach` | Runs before each test (e.g., setting up objects). |
| `@AfterEach`  | Runs after each test (e.g., cleanup).          |
| `@BeforeAll`  | Runs once before all tests (e.g., database setup). |
| `@AfterAll`   | Runs once after all tests (e.g., closing resources). |

### @Test Annotation
The @Test annotation marks a method as a test case. JUnit will execute all methods annotated with @Test.

### @Before and @After Annotations
@Before: Methods annotated with @Before run before each test method. Use this to set up common test data or initialize objects.

@After: Methods annotated with @After run after each test method. Use this to clean up resources or reset states.


### @BeforeClass and @AfterClass Annotations
@BeforeClass: Methods annotated with @BeforeClass run once before all test methods in the class. Use this for expensive setup operations (e.g., database connections).

@AfterClass: Methods annotated with @AfterClass run once after all test methods in the class. Use this for cleanup operations.


Here’s a complete example that combines all the annotations:

~~~java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;

public class ProductTest2 {
    private static Product product;

    @BeforeAll
    public static void setUpClass() {
        // Initialize a Product object once before all tests
        product = new Product(1, "Laptop", 999.99, 10);
        System.out.println("Product object created (BeforeAll).");
    }

    @AfterAll
    public static void tearDownClass() {
        // Clean up after all tests
        product = null;
        System.out.println("Product object reset (AfterAll).");
    }

    @Before
    public void setUp() {
        // Reset the stock to 10 before each test
        product = new Product(1, "Laptop", 999.99, 10);
        System.out.println("Stock reset to 10 (Before).");
    }

    @After
    public void tearDown() {
        // No cleanup needed here since @Before resets the state
        System.out.println("Test completed (After).");
    }

    @Test
    public void testReduceStock() {
        // Act
        product.reduceStock(3);

        // Assert
        assertEquals(7, product.getStock(), "Stock should be reduced by 3");
    }

    @Test
    public void testReduceStockThrowsException() {
        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> product.reduceStock(20));
    }
}
~~~








