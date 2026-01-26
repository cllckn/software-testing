# Module 2: Introduction to Unit Testing

---
<!-- TOC -->
* [Module 2: Introduction to Unit Testing](#module-2-introduction-to-unit-testing)
  * [What is Unit Testing?](#what-is-unit-testing)
    * [Why Unit Testing?](#why-unit-testing)
  * [Writing Your First Unit Test with JUnit](#writing-your-first-unit-test-with-junit)
  * [Test Cases, Assertions, Annotations](#test-cases-assertions-annotations)
    * [Test Case](#test-case)
    * [Assertions](#assertions)
    * [JUnit Annotations](#junit-annotations)
  * [Parameterized Tests](#parameterized-tests)
  * [Test Suite](#test-suite)
  * [Testing With Maven](#testing-with-maven-)
    * [Introduction to Maven](#introduction-to-maven)
    * [Generating Test Reports](#generating-test-reports)
  * [Hands-On Exercises](#hands-on-exercises)
<!-- TOC -->

---


## What is Unit Testing?
Unit testing is the process of testing individual components (or "units") of a software application in isolation. 
A unit is typically a single method, function, or class. The goal is to verify that each unit behaves as expected 
under various conditions.

---

### Why Unit Testing?

* Ensures that individual components work correctly.
* Helps catch bugs early in the development process.
* Makes code easier to maintain and refactor.
* Acts as documentation for how the code is supposed to behave.

---

## Writing Your First Unit Test with JUnit
Writing a simple unit test for the Java Product class given below.

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

package cc.ku.module2.exercise1;


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
      throw new IllegalArgumentException("Reduction amount must be positive");
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
    public void testReduceStock() {
      
        //Arrange: Set up the initial conditions (initialize a Product object with 10 units in stock).
        Product product = new Product(1, "Laptop", 999.99, 10);

        //Act: Perform the action to test (reduce stock by 3).
        product.reduceStock(3);

        //Assert: Verify the result (stock should now be 7).
        // Compare the real output with the expected result
        assertEquals(7, product.getStockQuantity(), "The stock count was not correctly updated after reduction.");
    }
    
}

~~~

>**Best Practices**
> 
>Separating source code and test code is a widely followed convention in software development.
> * Better Organization – Keeps the main application code and tests structured. 
> * Easier Maintenance – Helps developers focus on either implementation or testing. 
> * Prevents Accidental Inclusion – Ensures test code isn’t bundled into the final build. 
> * Follows Industry Best Practices – Used in frameworks like Maven, Gradle, and IntelliJ IDEA.

---




## Test Cases, Assertions, Annotations
### Test Case

A test case is a single scenario that tests a specific behavior or functionality of a unit (e.g., a method or class).

In a test case there are 3 divisions:

* Arrange: Set up the initial conditions (initialize a Product object with 10 units in stock).
* Act: Perform the action to test (reduce stock by 3).
* Assert: Verify the result (stock should now be 7).

testReduceStock() function in the code given above is a test case.

### Assertions
Used to verify that the actual output matches the expected output. The followings are JUnit assertions:

| Assertion                                       | Description                                                                                                                                                    |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `assertEquals(expected, actual, message)`       | Checks if two values are equal; if not, test fails and displays message.                                                                                                           |
| `assertTrue(condition,message)`                 | Checks if the condition is true; if not, test fails and displays message.                                                                                                                            |
| `assertFalse(condition, message)`               | Checks if the condition is false; if not, test fails and displays message.                                                                                                                           |
| `assertThrows(Exception.class, () -> method())` | Ensures a specific exception is thrown; if not, test fails and displays message.                                                                                                                             |
| `assertAll("message", () -> {...})`             | Groups multiple assertions together; if any assertion fails, test fails and displays all errors under the message. It can group multiple assertions, making it easier to test related conditions in one block. |



**Code Example:A complete example that combines all the assertions**
> test/~/ProductAssertionsTest.java
~~~java
//package cc.ku.st.module2;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ProductAssertionsTest {

  @Test
  public void testReduceStock() {
    Product product = new Product(1, "Laptop", 1000.0, 10);
    product.reduceStock(5);
    // Message updated to show intent vs result
    assertEquals(5, product.getStockQuantity(), "The stock count was not correctly updated after reduction.");
  }

  @Test
  public void testSetPrice() {
    Product product = new Product(1, "Laptop", 1000.0, 10);
    product.setPrice(1200.0);
    // Using delta for floating point precision is perfect here
    assertEquals(1200.0, product.getPrice(), 0.001, "The product price failed to update to the specified value.");
  }


  @Test
  public void testStockIsNeverNegative() {
    Product product = new Product(1, "Laptop", 1000.0, 10);

    product.reduceStock(5);

    assertTrue(product.getStockQuantity() >= 0,
            "Stock value must be zero or positive after stock reduction.");
  }

  @Test
  public void testStockIsNeverNegative1() {
    Product product = new Product(1, "Laptop", 1000.0, 10);

    product.reduceStock(5);

    assertFalse(product.getStockQuantity() < 0,
            "Stock value must never be negative after stock reduction.");
  }

  @Test
  public void testReduceStockThrowsException() {
    Product product = new Product(1, "Laptop", 1000.0, 5);
    // assertThrows message appears if NO exception is thrown
    assertThrows(IllegalArgumentException.class,
            () -> product.reduceStock(8),
            "An IllegalArgumentException should be thrown when an invalid stock reduction is attempted.");
  }

  @Test
  public void testMultipleAssertions() {
    Product product = new Product(1, "Laptop", 1000.0, 10);
    // assertAll group message serves as a header for all failures within the block
    assertAll("Product object state properties verification",
            () -> assertEquals(1, product.getId(), "Product ID mismatch"),
            () -> assertEquals("Laptop", product.getName(), "Product Name mismatch"),
            () -> assertEquals(1000.0, product.getPrice(), 0.001, "Product Price mismatch"),
            () -> assertEquals(10, product.getStockQuantity(), "Product Stock mismatch")
    );
  }


  @Test
  public void testProductStateAfterDiscountAndSale() {
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
                    "Price should reflect the newly set discounted value."),

            () -> assertEquals(15, product.getStockQuantity(),
                    "Stock should be reduced by the amount sold."),

            () -> assertTrue(product.getStockQuantity() > 0,
                    "Stock count should be positive."),

            () -> assertEquals("Laptop", product.getName(),
                    "Product name should remain unchanged after price/stock updates.")
    );
  }
}
~~~


### JUnit Annotations

JUnit uses annotations to define test methods and setup/teardown methods. Here are the most common annotations:

| Annotation   | Description                                      |
|-------------|--------------------------------------------------|
| `@Test`      | Marks a method as a test case.                  |
| `@BeforeEach` | Runs before each test (e.g., setting up objects). |
| `@AfterEach`  | Runs after each test (e.g., cleanup).          |
| `@BeforeAll`  | Runs once before all tests (e.g., database setup). |
| `@AfterAll`   | Runs once after all tests (e.g., closing resources). |

**@Test**
The @Test annotation marks a method as a test case. JUnit will execute all methods annotated with @Test.

**@BeforeEach and @AfterEach**

@BeforeEach: Methods annotated with @Before run before each test method. Use this to set up common test data or initialize objects.

@AfterEach: Methods annotated with @After run after each test method. Use this to clean up resources or reset states.


**@BeforeAll and @AfterAll**

@BeforeAll: Methods annotated with @BeforeClass run once before all test methods in the class. Use this for expensive setup operations (e.g., database connections).

@AfterAll: Methods annotated with @AfterClass run once after all test methods in the class. Use this for cleanup operations.


A complete example that combines all the annotations:

~~~java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;

class ProductAnnotationsTest {
  private static Product product;

  @BeforeAll
  public static void setUpClass() {
    // Initialize a Product object once before all tests
    product = new Product(1, "Laptop", 999.99, 10);
    System.out.println("Product object initialized (BeforeAll).");
  }

  @AfterAll
  public static void tearDownClass() {
    // Clean up after all tests
    product = null;
    System.out.println("Product object reset (AfterAll).");
  }

  @BeforeEach
  public void setUp() {
    // Reset the stock to 10 before each test
    product = new Product(1, "Laptop", 999.99, 10);
    System.out.println("Stock reset to 10 (BeforeEach).");
  }

  @AfterEach
  public void tearDown() {
    // No cleanup needed here since @Before resets the state
    System.out.println("Test completed (AfterEach).");
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




##  Parameterized Tests
Parameterized tests allow test developer to run the same test with different inputs.
This is useful for testing multiple scenarios without writing redundant code.

~~~java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

public class ProductParameterizedTest {

    @ParameterizedTest //Marks the method as a parameterized test.
    @CsvSource({        // Provides a list of comma-separated values as input parameters.
        "10, 3, 7",  // Initial stock: 10, reduce by 3, expected stock: 7
        "5, 5, 0",   // Initial stock: 5, reduce by 5, expected stock: 0
        "8, 0, 8"    // Initial stock: 8, reduce by 0, expected stock: 8
    })
    public void testReduceStock(int initialStock, int reduceAmount, int expectedStock) {
        // Arrange
        Product product = new Product(1, "Laptop", 999.99, initialStock);

        // Act
        product.reduceStock(reduceAmount);

        // Assert
        assertEquals(expectedStock, product.getStock(), "Stock reduction failed");
    }
}
~~~
## Test Suite

A test suite is a collection of test cases grouped together for execution. It allows test developer to run multiple tests as a single unit. Test suites are useful for:

    Organizing related tests (e.g., all tests for a specific class or module).
    
    Running tests in a specific order (if needed).
    
    Simplifying test execution (e.g., running all tests with a single command).


~~~java
import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasses({ProductTest.class, ProductParameterizedTest.class})
public class ProductTestSuite {
    // This class is a container for the test suite.
}
~~~


## Testing With Maven 

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

| Phase        | Purpose |
|-------------|--------|
| validate    | Check project structure |
| compile     | Compile source code |
| test        | Run automated tests |
| package     | Package compiled code |
| verify      | Run additional checks |
| install    | Install artifact locally |
| deploy     | Deploy artifact to repository |

Testing is automatically triggered during the **test** phase.

| Command                         | Purpose                                         | Output / Report Location                      |
|---------------------------------|-------------------------------------------------|-----------------------------------------------|
| `mvn test`                      | Compile and run tests only                      | `target/surefire-reports/`                    |
| `mvn clean test`                | Clean previous builds and run tests             | `target/surefire-reports/`                    |
| `mvn clean install`             | Full build with tests and artifact installation | `target/` and local repo (`~/.m2/repository`) |
| `mvn surefire-report:report`    | Generate HTML test report                       | `target/site/surefire-report.html`            |
| `mvn -Dtest=ClassNameTest test` | Run a Specific Test Class                       | `target/surefire-reports/`                    |
| `mvn -Dtest=ClassName#methodName test`                      | Run Specific Test Methods                       | `target/surefire-reports/`                    |
| `mvn compile exec:java`                      | To run your application                         | requires build config in pom.xml              |




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



