# Module 1: Introduction to Software Testing

---

<!-- TOC -->
* [Module 1: Introduction to Software Testing](#module-1-introduction-to-software-testing)
  * [1. What Is Software Testing?](#1-what-is-software-testing)
  * [2. Software Testing Terminology](#2-software-testing-terminology)
    * [Error](#error)
    * [Defect (or Fault)](#defect-or-fault)
    * [Bug](#bug)
    * [Failure](#failure)
    * [Summary of Relationship Between Error, Defect, Bug, and Failure](#summary-of-relationship-between-error-defect-bug-and-failure)
    * [Verification](#verification)
    * [Validation](#validation)
  * [3. Importance of Testing in Software Development](#3-importance-of-testing-in-software-development)
  * [4. Types of Software Testing](#4-types-of-software-testing)
    * [4.1 Functional Testing](#41-functional-testing)
      * [Unit Testing](#unit-testing)
      * [Integration Testing](#integration-testing)
      * [System Testing](#system-testing)
      * [Acceptance Testing](#acceptance-testing)
      * [Regression Testing](#regression-testing)
    * [4.2 Non-Functional Testing](#42-non-functional-testing)
      * [Performance Testing](#performance-testing)
      * [Security Testing](#security-testing)
      * [Usability Testing](#usability-testing)
  * [Setting Up the Development Environment](#setting-up-the-development-environment)
    * [1. IntelliJ IDEA Ultimate  (https://www.jetbrains.com/idea/download) (for Java Development, Unit Tests, TDD, BDD)](#1-intellij-idea-ultimate-httpswwwjetbrainscomideadownload-for-java-development-unit-tests-tdd-bdd)
    * [2. Node.js (for Web Development)](#2-nodejs-for-web-development)
    * [3. HTTP Client (for testing web services)](#3-http-client-for-testing-web-services)
    * [4. PostgreSQL (for DB Operations)](#4-postgresql-for-db-operations)
  * [Module Summary](#module-summary)
<!-- TOC -->

---


## 1. What Is Software Testing?

Software testing is the process of evaluating a software application or system to identify defects, ensure it meets 
specified requirements, and verify that it behaves as expected. It involves executing the software under controlled 
conditions to:

- **Find defects(bugs) or errors:** Identify issues in the code or functionality.
- **Ensure quality:** Verify that the software meets user expectations and defined requirements.
- **Validate functionality:** Confirm that the software works as intended.
- **Improve reliability:** Ensure consistent behavior under various conditions.

Software testing is a critical activity within the **Software Development Life Cycle (SDLC)**.

>***Testing is not only about finding bugs; it is also a key quality assurance activity that ensures the software is 
reliable, secure, and user-friendly.***

---

## 2. Software Testing Terminology

To better understand software testing, it is important to clarify the following core terms.

---

### Error

- **Definition:** An error is a mistake made by a developer during the coding or design phase. It may occur due to 
incorrect logic, misunderstanding requirements, or unintentional human oversight (such as missing a detail or edge case).

- **Examples:**
  - Forgetting to validate or filter user input.
  - Using an incorrect comparison operator (e.g., `>` instead of `<`) in a conditional statement, which is a common and 
  error-prone scenario.
  - Skipping or overlooking a specified requirement during implementation.

- **Example:**
  A developer misunderstands a requirement and implements a discount rule incorrectly, assuming a 5% discount instead 
of the specified 10%.

---

### Defect (or Fault)

- **Definition:** A defect is a flaw in the software caused by an error in the code or design. It represents the 
manifestation of an error in the system and may or may not result in a failure.

- **Example:**  
  The source code contains incorrect logic that applies a 5% discount rather than the required 10%. This incorrect 
implementation is a defect in the system.

---

### Bug

- **Definition:** A bug is a commonly used term for a defect that has been identified during testing or reported by users.

- **Example:**  
  During system testing, a tester notices that customers receive lower discounts than expected and reports the issue 
in the bug tracking system as a pricing bug.

---

### Failure

- **Definition:** A failure occurs when the software does not behave as expected during execution. It is the observable outcome of a defect.

- **Example:**  
  When the application is used in production, customers are charged higher prices than expected, leading to incorrect invoices and customer complaints. This visible incorrect behavior represents a system failure.

---

>In many industry contexts, the terms 'defect' and 'bug' are used synonymously to refer to any flaw in the 
> software. The distinction provided here is useful for understanding the lifecycle of an issue.

### Summary of Relationship Between Error, Defect, Bug, and Failure

- **Error:** Developer misunderstands the discount requirement.
- **Defect:** Incorrect discount logic is implemented in the code.
- **Bug:** The issue is discovered and reported during testing.
- **Failure:** Users experience incorrect pricing in real usage.


- **Error → Defect → Failure (when executed)**
- A **bug** is a reported defect.

---

### Verification

- Performed **during the development process**.
- Ensures the software is built correctly according to specifications and design documents.
- Focuses on the **process of development** and correctness of implementation.
- Typically performed through:
    - Code reviews
    - Unit testing
    - Static code analysis
- **Process-oriented**.

> Verification: “Are we building the product right?”

**Examples:**
- Reviewing source code for compliance with design specifications.
- Conducting peer code reviews.
- Using static analysis tools to detect issues without executing the software.

---

### Validation

- Performed **during or after development**.
- Ensures the software meets **user needs and business requirements**.
- Focuses on outcomes and real-world usage.
- Typically performed through:
    - Functional testing
    - System testing
    - User Acceptance Testing (UAT)
- **Product-oriented**.

> Validation: “Are we building the right product?”

**Examples:**
- Verifying that users can successfully complete transactions on an e-commerce platform.
- Executing test cases to validate expected functionality.
- Conducting UAT to confirm customer satisfaction.

---

## 3. Importance of Testing in Software Development


The SDLC is a structured process used to develop high-quality software in a systematic and efficient way. It breaks 
software development into distinct phases, each with specific goals and deliverables.

Although it is traditionally shown as a phase after development, testing is applied across all stages when developing 
modern software systems, especially web-based applications.


![](../resources/sdlc.png)



```text
The exponential cost of fixing a defect over the Software Development Life Cycle (SDLC).


^ Cost                                                      
|                                            *
|                                         *
|                                      *
|                                 *                    
|                           *
|                    * 
|            *
| *   
+-------------------------------------------------->
Requirements  Design  Coding   Testing   Maintenance
```

This graph shows that detecting a defect early—such as during development—is inexpensive to fix, while discovering it 
in production can cost a company tens or even hundreds of times more, considering both financial impact and reputational damage.


Software testing plays a vital role in modern software development for the following reasons:

- **Prevents defects:** Identifies issues early, reducing cost and effort.
- **Ensures quality:** Delivers reliable software that meets expectations.
- **Builds confidence:** Provides assurance that the software is ready for deployment.
- **Saves time and money:** Fixing defects early is significantly less expensive than post-release fixes.
- **Improves user satisfaction:** Reduces failures and enhances user experience.
- **Ensures compliance:** Ensures adherence to industry standards and regulatory requirements.
- **Manages change effectively:** In CI/CD environments, testing ensures that new features and fixes do not break existing functionality.


>Testing is not optional; it is essential for delivering high-quality software systems, especially in software 
>development environments where change is inevitable and continuous.

>Effective testing protects organizational reputation by preventing costly failures.

---

## 4. Types of Software Testing

Software testing can be categorized based on scope and purpose. The two main categories are **Functional Testing** 
and **Non-Functional Testing**.

---

### 4.1 Functional Testing

Functional testing verifies that the software behaves according to specified requirements.

#### Unit Testing

- **Description:** Testing individual units such as functions, methods, or classes in isolation.
- **Purpose:** To ensure each unit works as expected.
- **SDLC Phase:** Implementation (Coding)
- **Tools:** JUnit (Java), Jest (JavaScript), pytest (Python), NUnit (.NET)
- **Methodologies:** Traditional Unit Testing, Test-Driven Development (TDD), Behavior-Driven Development (BDD)
- **Example:** Testing a function that calculates the total price of items.

---

#### Integration Testing

- **Description:** Testing interactions between integrated components or modules.
- **Purpose:** To identify issues in interfaces and data flow between components.
- **SDLC Phase:** Implementation / Testing → Integration
- **Tools:** JUnit, TestNG, Cypress, Postman (API testing), Selenium (UI interactions)
- **Methodologies:** Big Bang, Top-Down, Bottom-Up, Hybrid Integration Testing
- **Example:** Testing interaction between a login module and a database.

---

#### System Testing

- **Description:** Testing the complete, integrated system as a whole.
- **Purpose:** To verify compliance with functional and non-functional requirements.
- **SDLC Phase:** Testing
- **Tools:** Selenium, Cypress, Katalon Studio, Appium (Mobile testing)
- **Methodologies:** Black-box testing, End-to-End (E2E) testing
- **Example:** Testing the full application including UI, APIs, and database.

---

#### Acceptance Testing

- **Description:** Testing to determine whether the system is ready for delivery.
- **Purpose:** To ensure the software meets end-user and business requirements.
- **SDLC Phase:** Testing / Deployment
- **Types:**
    - User Acceptance Testing (UAT)
    - Alpha Testing
    - Beta Testing
- **Tools:** TestRail, Zephyr (test management), survey tools for feedback
- **Methodologies:** Exploratory testing, Black-box testing
- **Example:** Validating a banking application against business rules and user needs.

---

#### Regression Testing

- **Description:** Re-execution of tests after software changes.
- **Purpose:** To ensure new changes do not introduce defects into existing functionality.
- **SDLC Phase:** Testing / Maintenance
- **Tools:** Selenium, Cypress, TestNG, JUnit, Jenkins (CI/CD)
- **Methodologies:** Retest-all, Selective regression, Automated regression testing
- **Note:** Regression testing is not a separate testing level; it is an activity applied across multiple levels.
- **Example:** Verifying existing features after modifying authentication logic.

---

### 4.2 Non-Functional Testing

Non-functional testing evaluates system attributes such as performance, security, and usability.

---

#### Performance Testing

- **Description:** Measures system responsiveness, stability, and scalability.
- **Purpose:** To ensure acceptable performance under varying conditions.
- **SDLC Phase:** Testing / Maintenance
- **Tools:** Artillery, JMeter, Gatling, Locust, LoadRunner, k6
- **Methodologies:** Load testing, Stress testing, Scalability testing, Endurance testing
- **Example:** Evaluating system behavior with thousands of concurrent users.

---

#### Security Testing

- **Description:** Identifies vulnerabilities and ensures protection against threats.
- **Purpose:** To protect data and ensure compliance with security standards.
- **SDLC Phase:** Testing / Maintenance
- **Tools:** OWASP ZAP, Burp Suite, Metasploit, Nessus, SonarQube (static code and security analysis)
- **Methodologies:** Penetration testing, Vulnerability scanning, Threat modeling
- **Example:** Ensuring sensitive user data is securely stored and transmitted.

---

#### Usability Testing

- **Description:** Evaluates how intuitive and user-friendly the system is.
- **Purpose:** To improve user experience and accessibility.
- **SDLC Phase:** Design / Testing / Maintenance
- **Tools:** Hotjar, Crazy Egg, UserTesting, Google Optimize
- **Methodologies:** A/B testing, Heuristic evaluation, User surveys
- **Example:** Assessing ease of navigation in an online learning platform.


---

## Setting Up the Development Environment

To practice throughout this course, install and configure the following tools:

### 1. IntelliJ IDEA Ultimate  (for Java-Based Program Development, Unit Tests, TDD, BDD)
- Popular IDE for Java based development.
- For accessing a free IDE, you can visit (https://www.jetbrains.com/shop/eform/students)
- Download Link: [IntelliJ](https://www.jetbrains.com/idea/download)
- To enable:
  - JUnit (IntelliJ IDEA -> Preferences -> JUnit )
  - HTTP Client (IntelliJ IDEA -> Preferences -> HTTP Client )


- File -> New -> Project -> Java
  - give a name, choose a location
  - Build system: Maven
  - JDK -> choose a proper JDK, download if not exist
  - check "add sample code" option
  - write the following code snippet

~~~java
/**
 * Must be stored as HelloWorld.java
 *
 */
public class HelloWorld {

    public static void main(String[] s) {

        System.out.println("Hello World");
    }

}
~~~

- Open a terminal
- Compiling
~~~console
javac HelloWorld.java
~~~

- Running
~~~console
java HelloWorld.java
~~~

- Output
~~~console
Hello World
~~~


* To write a simple unit test, add the following JUnit libraries into the pom.xml file located in the root folder of 
the project.
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
    public void setPrice(double price) {
        this.price = price;
    }

    public double getPrice() {
        return price;
    }

     public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "st.module1.Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", stock=" + stock +
                '}';
    }
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
      assertEquals(7, product.getStock(), "Stock should be reduced by 3");
    }

  @Test
  public void testReduceStockThrowsException() {
    Product product = new Product(1, "Laptop", 1000.0, 5);
    assertThrows(IllegalArgumentException.class, () -> product.reduceStock(6), "Should throw an exception when stock falls below 0");
  }
    
}
~~~


* Run tests using maven

```sh
# run all the tests
mvn test


# To run tests and generate a test report
mvn surefire-report:report 
```




### 2. Node.js (for Web Development)
- JavaScript runtime environment for server-side(backend) development.
- Used for building web applications and web services(APIs).
- Download Link: [Node.js](https://nodejs.org/en/download)

* Set up Intellij for Node.js based development (or install WebStorm)
  - IntelliJ IDEA -> Preferences -> Plugins -> Node.js (OSX, Linux)
  - IntelliJ IDEA -> File -> Settings -> Plugins -> Node.js (Windows)

* Initialize a new Node.js project
  - WebStorm/IntelliJ IDEA -> File -> New -> Project -> Empty Project (Give the project an appropriate name.)
  - Open the terminal in IntelliJ
  - npm init -y
  - Make a /src folder for the source code of the project

* Make a hello-world.js file and write the following code:
~~~javascript
  console.log('Hello world.');
~~~

* Run the app:
  - node hello-world.js


* Make a /src/server.js file and write the following code:

~~~javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
~~~ 
* Run the app:
  - node server.js

### 3. HTTP Client (for testing web services)
- Provides the ability to compose and execute HTTP requests from the code editor.

* Setting up Intellij for http client
  - IntelliJ IDEA -> Preferences -> Plugins -> HTTP Client

* Make a rest-api-test.http file and write the following code:

~~~http request
GET localhost:3000/
~~~

### 4. PostgreSQL (for DB Operations)
- PostgreSQL is an open-source and powerful relational database management system.
- Complies with SQL standards and supports Linux, macOS, and Windows.
- Download Link: [Download PostgreSQL](https://www.postgresql.org/download/) any version that can
  be installed without issues.

---

## Module Summary

- Software testing ensures quality, reliability, and compliance.
- Errors lead to defects, which may cause failures when executed.
- Verification focuses on building the product correctly; validation ensures the right product is built.
- Testing spans multiple levels and includes both functional and non-functional aspects.
- Effective testing is essential in modern, continuously evolving software systems.
