# Module 2: Introduction to Unit Testing

---
<!-- TOC -->
* [Module 2: Introduction to Unit Testing](#module-2-introduction-to-unit-testing)
  * [1. What is Unit Testing?](#1-what-is-unit-testing)
    * [Why Unit Testing?](#why-unit-testing)
  * [2. Writing Your First Unit Test](#2-writing-your-first-unit-test)
  * [3. JUnit Naming Conventions (Behavior-Oriented)](#3-junit-naming-conventions-behavior-oriented)
    * [Test Class Naming](#test-class-naming)
    * [Test Method Naming Pattern](#test-method-naming-pattern)
    * [Example Test Method Names](#example-test-method-names)
  * [4. Test Cases, Assertions, and Annotations](#4-test-cases-assertions-and-annotations)
    * [Test Case](#test-case)
    * [Assertions](#assertions)
    * [JUnit Annotations](#junit-annotations)
  * [5. Parameterized Tests](#5-parameterized-tests)
    * [Parameterized Test for Grade Calculation](#parameterized-test-for-grade-calculation)
    * [Edge Cases and Boundary Values](#edge-cases-and-boundary-values)
    * [Input-Output Pairs for Grade Calculation Testing](#input-output-pairs-for-grade-calculation-testing)
  * [6. Test Suite](#6-test-suite)
  * [7. Testing With Maven](#7-testing-with-maven)
    * [Introduction to Maven](#introduction-to-maven)
    * [Generating Test Reports](#generating-test-reports)
  * [Hands-On Exercises](#hands-on-exercises)
<!-- TOC -->

---

## 1. What is Unit Testing?

Unit testing is the process of **testing individual components (or “units”) of a software application in isolation**.  
A unit is typically a **single method, function, or class**. The main goal is to **verify that each unit behaves as
expected under various conditions**.

---

### Why Unit Testing?

* Ensures that individual components **function correctly**.
* Helps **catch defects early** in the development process.
* Makes code **easier to maintain and refactor**.
* Serves as **documentation** for the expected behavior of the code.

---

## 2. Writing Your First Unit Test

Unit tests can be written using **any testing framework** appropriate for the programming language.

For example, in Java, **JUnit** is commonly used. A unit test verifies that a class or method works as intended by
providing **input and checking the expected output**.

**Key Points When Writing Unit Tests:**

* Test **one functionality at a time**.
* Include both **normal and boundary inputs**.
* Handle **expected exceptions** where applicable.
* Keep tests **independent and repeatable**– each test should run on its own and produce the same results every time.

> Tip: Unit tests should be fast, automated, and run frequently during development to catch defects early.

* Initialize a new Java project in IntelliJ with Maven (package manager) support.
* Add the following JUnit libraries into the pom.xml file located in the root folder of the project.

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>cc.st</groupId>
    <artifactId>java-software-testing-projects</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>19</maven.compiler.source>
        <maven.compiler.target>19</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>5.10.0</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>5.10.0</version>
            <scope>test</scope>
        </dependency>

        <!-- For Parameterized Tests (@ParameterizedTest, @CsvSource) -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-params</artifactId>
            <version>5.10.0</version>
            <scope>test</scope>
        </dependency>

        <!-- JUnit Platform Suite (for @Suite and @SelectClasses) -->
        <dependency>
            <groupId>org.junit.platform</groupId>
            <artifactId>junit-platform-suite-api</artifactId>
            <version>1.10.0</version> <!-- Use the latest version -->
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.platform</groupId>
            <artifactId>junit-platform-suite-engine</artifactId>
            <version>1.10.0</version>
            <scope>test</scope>
        </dependency>

    </dependencies>

</project>
~~~

* Add the following Product and ProductMain classes in the project.

**Code Example**
> ./Product.java

~~~java
//package cc.ku.st.module2;

public class Product {
    private int id;
    private String name;
    private double price;
    private int stockQuantity;

    public Product(int id, String name, double price, int stockQuantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stockQuantity = stockQuantity;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void reduceStock(int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        if (quantity > stockQuantity) {
            throw new IllegalArgumentException("Cannot reduce stockQuantity below 0");
        }
        stockQuantity -= quantity;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", stock quantity=" + stockQuantity +
                '}';
    }
}


~~~

**Code Example**
> ./ProductMain.java

~~~java
public class ProductMain {
    public static void main(String[] args) {
        Product product = new Product(1, "Laptop", 1000.0, 10);
        System.out.println(product);
    }
}
~~~

**Code Example**
> test/~/ProductTest.java

* Write a unit test for the reduceStock method in the Product class.

~~~java
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class ProductTest {
    // Test case
    // Single scenario that tests a specific behavior or functionality of a unit
    @Test
    public void reduceStock_validQuantity_updatesStockCorrectly() {

        //Arrange: Set up the initial conditions (initialize a Product object with 10 units in stock).
        Product product = new Product(1, "Laptop", 999.99, 10);

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
                () -> "An IllegalArgumentException should be thrown when an invalid stock reduction is attempted.");
    }

}

~~~

> **Best Practices**
>
>Separating source code and test code is a widely followed convention in software development.
> * Better Organization – Keeps the main application code and tests structured.
> * Easier Maintenance – Helps developers focus on either implementation or testing.
> * Prevents Accidental Inclusion – Ensures test code isn’t bundled into the final build.
> * Follows Industry Best Practices – Used in frameworks like Maven, Gradle, and IntelliJ IDEA.

---

## 3. JUnit Naming Conventions (Behavior-Oriented)

Behavior-oriented naming focuses on **what the system does under a specific condition and what outcome is expected**.

**Purpose of Behavior-Oriented Naming**

- Improves readability for developers, testers, and reviewers
- Produces self-explanatory test reports
- Helps map tests directly to requirements and business rules
- Encourages thinking in **behavior**, not implementation

---

### Test Class Naming

| Convention              | Example               | When to Use                                |
|-------------------------|-----------------------|--------------------------------------------|
| `ClassNameTest`         | `ProductTest`         | Standard and most common                   |
| `ClassNameTests`        | `ProductTests`        | When grouping many related tests           |
| `ClassNameBehaviorTest` | `ProductBehaviorTest` | When emphasizing business behavior         |
| `ClassNameUnitTest`     | `ProductUnitTest`     | When distinguishing from integration tests |

> **Best Practice:**  
> Use `ClassName` + `Test` pattern.

---

### Test Method Naming Pattern

**Standard Pattern**

> methodName_condition_expectedResult


---

### Example Test Method Names

| Scenario                  | Behavior-Oriented Test Name                           |
|---------------------------|-------------------------------------------------------|
| Valid stock increase      | `increaseStock_validQuantity_increasesStockQuantity`  |
| Negative stock increase   | `increaseStock_negativQuantity_throwsException`       |
| Reduce stock within limit | `reduceStock_availableQuantity_reducesStockCorrectly` |
| Reduce stock beyond limit | `reduceStock_insufficientQuantity_throwsException`    |
| Valid grade conversion    | `getLetterGrade_scoreAbove90_returnsA`                |
| Boundary grade case       | `getLetterGrade_scoreExactly90_returnsA`              |
| Invalid grade input       | `constructor_invalidGrade_throwsException`            |

> A test name should describe **what happens(methodName)**, **under what condition(in case of)**, and **what the
expected outcome is** —
> without reading the test body.

## 4. Test Cases, Assertions, and Annotations

### Test Case

A **test case** is a single scenario that checks a specific behavior or functionality of a unit (e.g., a method or
class).

A test case typically has **three parts**:

* **Arrange:** Set up initial conditions.  
  *Example:* Initialize a `Product` object with 10 units in stock.
* **Act:** Perform the action to test.  
  *Example:* Reduce the stock by 3 units.
* **Assert:** Verify the outcome matches expectations.  
  *Example:* Stock should now be 7.

> Example: The `testReduceStock()` function shown earlier is a test case.

---

### Assertions

**Assertions** are used to **verify that actual output matches the expected output**.

Some common assertions in Java (JUnit) include:

| Assertion                                       | Description                                                                                                                                                                                                    |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `assertEquals(expected, actual, message)`       | Checks if two values are equal; if not, test fails and displays message.                                                                                                                                       |
| `assertTrue(condition,message)`                 | Checks if the condition is true; if not, test fails and displays message.                                                                                                                                      |
| `assertFalse(condition, message)`               | Checks if the condition is false; if not, test fails and displays message.                                                                                                                                     |
| `assertThrows(Exception.class, () -> method())` | Ensures a specific exception is thrown; if not, test fails and displays message.                                                                                                                               |
| `assertAll("message", () -> {...})`             | Groups multiple assertions together; if any assertion fails, test fails and displays all errors under the message. It can group multiple assertions, making it easier to test related conditions in one block. |
| `assertNull(object)`                            | checks that an object is null.                                                                                                                                                                                 |
| `assertNotNull(object)`                         | checks that an object is not null  .                                                                                                                                                                           |

**Code Example:A complete example that combines all the assertions**
> test/~/ProductAssertionsTest.java

~~~java
//package cc.ku.st.module2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ProductAssertionsTest {

    // Test case
    // Single scenario that tests a specific behavior or functionality of a unit
    @Test
    public void reduceStock_validQuantity_updatesStockCorrectly() {

        //Arrange: Set up the initial conditions (initialize a Product object with 10 units in stock).
        Product product = new Product(1, "Laptop", 999.99, 10);

        //Act: Perform the action to test (reduce stock by 3).
        product.reduceStock(3);

        //Assert: Verify the result (stock should now be 7).
        // Compare the real output with the expected result
        assertEquals(7, product.getStockQuantity(),
                () -> "Stock quantity should be 7 after reducing 3 units from an initial 10.");
    }

    @Test
    public void setPrice_validAmount_updatesPriceCorrectly() {

        Product product = new Product(1, "Laptop", 1000.0, 10);

        product.setPrice(1200.0);

        // Using delta (0.001) for floating point precision
        assertEquals(1200.0, product.getPrice(), 0.001,
                () -> "The product price should be 1200 after updating the original price from 1000.");
    }


    @Test
    public void reduceStock_validQuantity_updatesStockCorrectly1() {
        Product product = new Product(1, "Laptop", 1000.0, 10);

        product.reduceStock(5);

        assertTrue(product.getStockQuantity() >= 0,
                () -> "Stock value should be zero or positive after stock reduction.");
    }

    @Test
    public void reduceStock_validQuantity_updatesStockCorrectly2() {
        Product product = new Product(1, "Laptop", 1000.0, 10);

        product.reduceStock(5);

        assertFalse(product.getStockQuantity() < 0,
                () -> "Stock value should never be negative after stock reduction.");
    }

    @Test
    public void reduceStock_insufficientQuantity_throwsException() {
        Product product = new Product(1, "Laptop", 1000.0, 5);

        //Act & Assert
        assertThrows(IllegalArgumentException.class,
                () -> product.reduceStock(8),
                () -> "An IllegalArgumentException should be thrown when an invalid stock reduction is attempted.");
    }

    @Test
    public void product_initialization_propertiesAreCorrect() {
        Product product = new Product(1, "Laptop", 1000.0, 10);
        // assertAll group message serves as a header for all failures within the block
        assertAll("Product object state properties verification",
                () -> assertEquals(1, product.getId(), () -> "Product ID mismatch"),
                () -> assertEquals("Laptop", product.getName(), () -> "Product Name mismatch"),
                () -> assertEquals(1000.0, product.getPrice(), 0.001, () -> "Product Price mismatch"),
                () -> assertEquals(10, product.getStockQuantity(), () -> "Product Stock mismatch")
        );
    }


    @Test
    public void product_validDiscountAndSale_stateIsUpdatedCorrectly() {
        // 1. Setup: Starting with 20 Laptops at $1000 each
        Product product = new Product(1, "Laptop", 1000.0, 20);

        // 2. Action: Apply a 10% discount and sell 5 units
        product.setPrice(900.0);
        product.reduceStock(5);
        // Instead of product.reduceStock(5), we call the actual business function
        //orderService.placeOrder(product, 5);

        // 3. Verification: Check multiple related states at once
        assertAll("Verify product state after price change and stock reduction",
                () -> assertEquals(900.0, product.getPrice(), 0.001,
                        () -> "Price should reflect the newly set discounted value."),

                () -> assertEquals(15, product.getStockQuantity(),
                        () -> "Stock should be reduced by the amount sold."),

                () -> assertTrue(product.getStockQuantity() > 0,
                        () -> "Stock count should be positive."),

                () -> assertEquals("Laptop", product.getName(),
                        () -> "Product name should remain unchanged after price/stock updates.")
        );
    }
}
~~~

### JUnit Annotations

JUnit uses annotations to define test methods and setup/teardown methods. Here are the most common annotations:

| Annotation    | Description                                                                          |
|---------------|--------------------------------------------------------------------------------------|
| `@Test`       | Marks a method as a test case.                                                       |
| `@BeforeEach` | Runs before each test method (used to set up test data).                             |
| `@AfterEach`  | Runs after each test method (used to clean up resources).                            |
| `@BeforeAll`  | Runs once before all test methods in the class-static method (e.g., database setup). |
| `@AfterAll`   | Runs once after all test methods in the class-static method (e.g., closing resources).|
| `@Disabled`   | Temporarily disables a test method so it is **skipped during execution**. |


* `@Test` – Marks a method as a test case. JUnit will execute all methods annotated with `@Test`.
* `@BeforeEach` – Runs **before each test method**. Use it to set up common test data or initialize objects.
* `@AfterEach` – Runs **after each test method**. Use it to clean up resources or reset states.
* `@BeforeAll` – Runs **once before all test methods** in the class. Ideal for expensive setup operations, such as
  opening a database connection.
* `@AfterAll` – Runs **once after all test methods** in the class. Ideal for cleanup operations, such as closing
  database connections.
*` @Disabled` – Temporarily disables a test method so it is **skipped during execution**.


**Code Example:A complete example that combines all the annotations**
> test/~/ProductAnnotationsTest.java

~~~java
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.*;

/**
 * Example: Using JUnit annotations to test a Product class.
 * Demonstrates @BeforeAll, @AfterAll, @BeforeEach, @AfterEach, @Test, and realistic test scenarios.
 */
class ProductAnnotationsTest {

    // Shared resource for all tests (simulating expensive setup, e.g., DB connection)
    private static Product product;

    /**
     * Runs once before all tests.
     * Use it to perform expensive setup tasks that are common to all tests.
     * Example: Initialize a Product object that simulates loading from a database.
     */
    @BeforeAll
    public static void setUpClass() {
        product = new Product(1, "Laptop", 999.99, 10);
        System.out.println("Product object initialized (BeforeAll) - simulating DB load.");
    }

    /**
     * Runs once after all tests.
     * Use it to clean up resources created in @BeforeAll, e.g., close database connections.
     */
    @AfterAll
    public static void tearDownClass() {
        product = null;
        System.out.println("Product object reset (AfterAll) - simulating DB cleanup.");
    }

    /**
     * Runs before each test method.
     * Reset the product state to ensure **tests are independent and repeatable**.
     */
    @BeforeEach
    public void setUp() {
        // Reset stock and price before each test
        product = new Product(1, "Laptop", 999.99, 10);
        System.out.println("Stock and price reset (BeforeEach).");
    }

    /**
     * Runs after each test method.
     * Use it for test-level cleanup if necessary.
     */
    @AfterEach
    public void tearDown() {
        // Example: Could reset mocks or temporary files
        System.out.println("Test completed (AfterEach).");
    }

    /**
     * Test Case: Reduce stock by a valid amount
     * Scenario: A customer buys 3 laptops; stock should decrease correctly.
     */
    @Test
    public void reduceStock_validQuantity_updatesStockCorrectly() {
        // Act: simulate selling 3 laptops
        product.reduceStock(3);

        //Assert: Verify the result (stock should now be 7).
        // Compare the real output with the expected result
        assertEquals(7, product.getStockQuantity(),
                () -> "Stock quantity should be 7 after reducing 3 units from an initial 10.");
    }

    /**
     * Test Case: Attempt to reduce stock below 0
     * Scenario: A customer tries to buy 20 laptops, but only 10 are in stock.
     * The system should throw an exception to prevent invalid stock state.
     */
    @Test
    public void reduceStock_insufficientQuantity_throwsException() {
        // Act & Assert: should throw IllegalArgumentException
        assertThrows(IllegalArgumentException.class,
                () -> product.reduceStock(20),
                ()-> "An IllegalArgumentException should be thrown when an invalid stock reduction is attempted.");
    }

}
~~~

## 5. Parameterized Tests

**Parameterized tests** allow a test developer to **run the same test logic with multiple sets of input data**.  
This helps to:

* Test **multiple scenarios** efficiently.
* Avoid writing **redundant test cases**.
* Ensure consistent behavior across different input values.

**Code Example:A complete example that combines all the annotations**
> test/~/ProductParameterizedTest.java

~~~java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

//ProductTest, ProductStockRulesTest, ProductBehaviorTest... these names are more convenient in practice.
class ProductParameterizedTest {

    @ParameterizedTest //Marks the method as a parameterized test.
    @CsvSource({        // Provides a list of comma-separated values as input parameters.
            "10, 3, 7",  // Initial stock: 10, reduce by 3, expected stock: 7
            "5, 5, 0",   // Initial stock: 5, reduce by 5, expected stock: 0
            "8, 7, 1"    // Initial stock: 8, reduce by 7, expected stock: 1
    })
    public void reduceStock_validQuantity_updatesStockCorrectly(int initialStock, int reduceQuantity, int expectedStock) {
        // Arrange
        Product product = new Product(1, "Laptop", 999.99, initialStock);

        // Act
        product.reduceStock(reduceQuantity);

        // Assert
        assertEquals(expectedStock, product.getStockQuantity(),
                () -> "Stock quantity should be " + expectedStock + " after reducing " + reduceQuantity + " units from an initial " + initialStock);
    }
}
~~~

### Parameterized Test for Grade Calculation

**Scenario:** We want to test a `calculateGrade()` method that converts numeric averages into letter grades as follows:

| Average Score | Expected Grade |
|---------------|----------------|
| 95            | A              |
| 85            | B              |
| 75            | C              |
| 65            | D              |
| 55            | F              |

Instead of writing **separate test methods for each score**, a **parameterized test** runs the same test logic for all
these inputs.

---

### Edge Cases and Boundary Values

**Edge cases** are inputs that are at the **extremes or unusual situations**, e.g., the **highest or lowest possible
scores**:

* Minimum possible score: 0 → Should return grade F
* Maximum possible score: 100 → Should return grade A
* Boundary values around grade thresholds:
    - 89 → B, 90 → A
    - 79 → C, 80 → B
    - 69 → D, 70 → C
    - 59 → F, 60 → D

**Best Practices:**

* Always include **boundary values** to verify correct grade transitions.
* Include **typical values** to ensure normal cases work.
* Include **extreme values** to test system limits.
* Keep tests **independent and repeatable**.

> Using parameterized tests for these cases ensures **thorough coverage** without duplicating code.
> **Combining normal, boundary, and edge cases ensures full functional coverage.**
> **Full functional coverage** means testing **all meaningful input scenarios** a system may encounter—typical inputs,
> extreme limits, and values at the edges of ranges—so that both normal behavior and potential failure points are
> verified.

### Input-Output Pairs for Grade Calculation Testing

| Test Case | Average Score (Input) | Expected Grade (Output) | Type of Test Case |
|-----------|-----------------------|-------------------------|-------------------|
| 1         | 95                    | A                       | Normal            |
| 2         | 90                    | A                       | Boundary          |
| 3         | 89                    | B                       | Boundary          |
| 4         | 85                    | B                       | Normal            |
| 5         | 80                    | B                       | Boundary          |
| 6         | 79                    | C                       | Boundary          |
| 7         | 75                    | C                       | Normal            |
| 8         | 70                    | C                       | Boundary          |
| 9         | 69                    | D                       | Boundary          |
| 10        | 65                    | D                       | Normal            |
| 11        | 60                    | D                       | Boundary          |
| 12        | 59                    | F                       | Boundary          |
| 13        | 55                    | F                       | Normal            |
| 14        | 0                     | F                       | Edge Case         |
| 15        | 100                   | A                       | Edge Case         |


**Code Example**
> src/~/Student.java
> 
```java

package cc.ku.st.module2.exercises.exercise4;

class Student {
    private String name;
    private int grade;

    public Student(String name, int grade) {
        if (grade < 0 || grade > 100) {
            throw new IllegalArgumentException("Grade must be between 0 and 100");
        }
        this.name = name;
        this.grade = grade;
    }

    public String getLetterGrade() {
        if (grade >= 90) return "A";
        if (grade >= 80) return "B";
        if (grade >= 70) return "C";
        if (grade >= 60) return "D";
        return "F";
    }
}
```

**Code Example:Testing Student getLetterGrade()**
> test/~/StudentTest.java

```java
package cc.ku.st.module2;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class StudentTest {

    /**
     * Test the getLetterGrade() method using multiple input scores.
     * The CsvSource provides: <grade>,<expectedLetterGrade>
     */
    @ParameterizedTest(name = "Grade {0} should return {1}")
    @CsvSource({
            // Normal values
            "95, A",
            "85, B",
            "75, C",
            "65, D",
            "55, F",
            // Boundary values
            "90, A",
            "89, B",
            "80, B",
            "79, C",
            "70, C",
            "69, D",
            "60, D",
            "59, F",
            // Edge cases
            "0, F",
            "100, A"
    })
    void getLetterGrade_validValues_returnsLetterGrades(int grade, String expectedLetterGrade) {
        // Arrange: instantiate student with given grade
        Student student = new Student("Test Student", grade);

        // Act: calculate letter grade
        String actualGrade = student.getLetterGrade();

        // Assert: verify the output
        assertEquals(expectedLetterGrade, actualGrade,
                "Grade " + grade + " should be mapped to letter " + expectedLetterGrade);
    }

    /**
     * Test invalid grades (edge cases outside 0-100) to ensure exception is thrown.
     */
    @ParameterizedTest(name = "Invalid grade {0} should throw exception")
    @CsvSource({
            "-1",
            "-10",
            "101",
            "150"
    })
    void constructor_invalidGrade_throwsException(int invalidGrade) {
        assertThrows(IllegalArgumentException.class,
                () -> new Student("Test Student", invalidGrade),
                "Grades outside 0-100 should throw IllegalArgumentException");
    }
}


```

## 6. Test Suite

A test suite is a collection of test cases grouped together for execution. It allows test developer to run multiple
tests as a single unit. Test suites are useful for:

* Organizing related tests (e.g., all tests for a specific class or module).
* Running tests in a specific order (if needed).
* Simplifying test execution (e.g., running all tests with a single command).

**Code Example**
> test/~/ProductTestSuite.java

~~~java
import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasses({ProductTest.class, ProductParameterizedTest.class})
public class ProductTestSuite {
    // This class is a container for the test suite.
}
~~~

## 7. Testing With Maven

### Introduction to Maven

**What Is Maven?**

**Apache Maven** is a build automation and dependency management tool primarily used for Java-based projects.  
It standardizes how projects are built, tested, and packaged, making development and collaboration more efficient.

Maven is widely used to:

- Manage external libraries (dependencies)
- Compile source code
- Run automated tests
- Generate reports
- Package applications for deployment

---

**Why Maven Is Used in Testing Projects**

In software testing and quality assurance, Maven plays a critical role by:

- Automatically **downloading and managing test libraries** (e.g., unit testing frameworks, database drivers)
- Providing a **consistent project structure**
- Enabling **repeatable test execution** across different environments
- Supporting **test reporting and lifecycle automation**

---

**Maven Project Structure (Standard Layout)**

Maven enforces a well-known directory structure:

* Source code: /src/main/java/...
* Test code: /src/test/java/...
* For Compiled code, test results, reports:  /target/
* Project Object Model (configuration file): /pom.xml

This structure clearly separates **production code** from **test code**.

---

**The POM File (pom.xml)**

The **Project Object Model (POM)** is the core configuration file in Maven.  
It defines:

- Project metadata (name, version)
- Dependencies (libraries)
- Build configuration
- Test execution and reporting behavior

```xml

<project>

    <!--
        groupId:
        Uniquely identifies the organization or group that owns the project.
        Typically follows reverse domain name notation.
    -->
    <groupId>cc.ku</groupId>

    <!--
        artifactId:
        The name of the project or module.
        This becomes the base name of the generated artifact (JAR/WAR).
    -->
    <artifactId>java-projects</artifactId>

    <!--
        version:
        The current version of the project.
        SNAPSHOT indicates a development version that may change frequently.
    -->
    <version>1.0-SNAPSHOT</version>


    ```xml
    <properties>

        <!--
            Specifies the Java language level used during compilation.
            This controls which language features are allowed (e.g., Java 19 features).
            It does NOT install or select a JDK.
        -->
        <maven.compiler.source>19</maven.compiler.source>

        <!--
            Specifies the target JVM version for the generated bytecode.
            The compiled classes will be compatible with Java 19 runtimes.
            It does NOT control which JDK Maven uses.
        -->
        <maven.compiler.target>19</maven.compiler.target>

        <!--
            Defines the character encoding for source files.
            UTF-8 ensures consistent handling of text across platforms.
        -->
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

    </properties>

    <!--
        IMPORTANT:
        The actual JDK version used by Maven is determined by the Java installation
        running Maven, NOT by the properties above.
    
        To check which JDK Maven is using, run:
            mvn -version
    -->


    <!--
        dependencies:
        Defines external libraries required by the project.
        Maven automatically downloads and manages these based on scope.
    -->
    <dependencies>
        ...
    </dependencies>

</project>

```

---

**Dependency Management**

Maven automatically downloads required libraries from remote repositories.

Typical dependencies in testing projects include:

- Unit testing frameworks
- Integration and API testing libraries
- Database drivers (e.g., PostgreSQL)
- Assertion and mocking libraries
- ...

Benefits:

- No manual JAR management
- Version consistency across teams
- Transitive dependency handling

**Maven Dependency Scopes**

**compile (default)**

- Available during **compilation, testing, and runtime**
- Included in the final packaged application
- Used for core libraries required by the application

**provided**

- Available during **compilation and testing**
- **Not included** in the final package
- Expected to be provided by the runtime environment (e.g., application server)

**runtime**

- Not available during compilation
- Available during **runtime and testing**
- Used when a dependency is needed only at execution time (e.g., database drivers)

**test**

- Available only during **test compilation and execution**
- Not available to production code
- Not included in the final package
- Used for testing frameworks and test utilities

**system**

- Similar to `provided`, but dependency must be referenced with an explicit local path
- Not downloaded from repositories
- **Strongly discouraged** due to poor portability

**import**

- Used only in `<dependencyManagement>`
- Allows importing dependency versions from another POM (typically a BOM)
- Not used for normal dependencies

---

**Maven Build Lifecycle**

Maven follows a **well-defined lifecycle**, which is especially important for testing:

| Phase    | Purpose                       |
|----------|-------------------------------|
| validate | Check project structure       |
| compile  | Compile source code           |
| test     | Run automated tests           |
| package  | Package compiled code         |
| verify   | Run additional checks         |
| install  | Install artifact locally      |
| deploy   | Deploy artifact to repository |

Testing is automatically triggered during the **test** phase.

| Command                                | Purpose                                         | Output / Report Location                      |
|----------------------------------------|-------------------------------------------------|-----------------------------------------------|
| `mvn test`                             | Compile and run tests only                      | `target/surefire-reports/`                    |
| `mvn clean test`                       | Clean previous builds and run tests             | `target/surefire-reports/`                    |
| `mvn clean install`                    | Full build with tests and artifact installation | `target/` and local repo (`~/.m2/repository`) |
| `mvn surefire-report:report`           | Generate HTML test report                       | `target/site/surefire-report.html`            |
| `mvn -Dtest=ClassNameTest test`        | Run a Specific Test Class                       | `target/surefire-reports/`                    |
| `mvn -Dtest=ClassName#methodName test` | Run Specific Test Methods                       | `target/surefire-reports/`                    |
| `mvn compile exec:java`                | To run your application                         | requires build config in pom.xml              |

**Key Benefits of Using Maven**

- Centralized dependency management
- Standard project structure
- Automated testing and reporting
- Improved team collaboration and consistency

### Generating Test Reports

Test reports provide a structured summary of test execution, highlighting passed, failed, and skipped tests. They help
identify failures, analyze errors with stack traces, and track test stability over time. Reports improve collaboration
by allowing teams to share results. They also serve as documentation for compliance, audit purposes, and performance
analysis by measuring test execution times. Running mvn surefire-report:report generates a detailed HTML report, making
it easier to monitor software quality and debug issues efficiently.

```sh
# run all the test
mvn test


# To run tests and generate a test report
mvn surefire-report:report 
```

The report file is located at /target/reports/surefire.html.

## Hands-On Exercises

[Exercises](exercises/exercises.md)



