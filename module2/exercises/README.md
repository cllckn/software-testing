# Exercises


<!-- TOC -->
* [Exercises](#exercises)
* [Hands-on Exercise1: Extending the Product Class and Writing Unit Tests](#hands-on-exercise1-extending-the-product-class-and-writing-unit-tests)
    * [Objective](#objective)
    * [Task 1: Extend the Product Class](#task-1-extend-the-product-class)
    * [Task 2: Write JUnit Test Cases](#task-2-write-junit-test-cases)
    * [Task 3: Run and Analyze Your Tests](#task-3-run-and-analyze-your-tests)
    * [Additional Challenges (Optional)](#additional-challenges-optional)
* [Hands-on Exercise 2: Implementing an Order Class and Comprehensive Unit Testing](#hands-on-exercise-2-implementing-an-order-class-and-comprehensive-unit-testing)
    * [Objective](#objective-1)
  * [Task 1: Pre-requisite Step](#task-1-pre-requisite-step)
    * [Task 1.1. Reuse and Verify Exercise 1 Solution](#task-11-reuse-and-verify-exercise-1-solution)
    * [Task 1.2. Intentional Error Injection](#task-12-intentional-error-injection-)
  * [Task 2: Implement the Order Class](#task-2-implement-the-order-class)
    * [Attributes](#attributes)
    * [Constructor](#constructor)
    * [Business Methods](#business-methods)
      * [1. `applyDiscount(double discount)`](#1-applydiscountdouble-discount)
      * [2. Additional Methods](#2-additional-methods)
  * [Task 2: Write JUnit Test Cases](#task-2-write-junit-test-cases-1)
    * [Constructor Tests](#constructor-tests)
    * [Discount Tests](#discount-tests)
    * [Additional Method Tests](#additional-method-tests)
    * [General Rules](#general-rules)
  * [Task 3: Run, Analyze, and Reflect](#task-3-run-analyze-and-reflect)
* [Hands-on Exercise 3: Parameterized Testing, Test Suites, and Automated Test Execution](#hands-on-exercise-3-parameterized-testing-test-suites-and-automated-test-execution)
    * [Objective](#objective-2)
  * [Pre-requisite Step](#pre-requisite-step)
  * [Task 1: Refactor Tests into Parameterized Tests](#task-1-refactor-tests-into-parameterized-tests)
    * [Apply Parameterized Tests to All Business Methods](#apply-parameterized-tests-to-all-business-methods)
    * [Input Categories to Cover](#input-categories-to-cover)
      * [Normal Values](#normal-values)
      * [Boundary Values (Tipping Points)](#boundary-values-tipping-points)
      * [Edge / Invalid Values](#edge--invalid-values)
  * [Task 2: Design Input–Output Tables](#task-2-design-inputoutput-tables)
  * [Task 3: Design a JUnit Test Suite](#task-3-design-a-junit-test-suite)
  * [Task 4: Run Tests and Generate Reports Using Maven](#task-4-run-tests-and-generate-reports-using-maven)
  * [Reflection Questions](#reflection-questions)
* [Hands-on Exercise 4: Testing an Order and Payment Service (Parameterized & Regression Testing)](#hands-on-exercise-4-testing-an-order-and-payment-service-parameterized--regression-testing)
  * [Task 1: System Design](#task-1-system-design)
  * [1.1 Order Class](#11-order-class)
  * [1.2 PaymentService Class](#12-paymentservice-class)
    * [Business Rules](#business-rules)
* [Task 2: Unit Testing](#task-2-unit-testing)
  * [2.1 Order Tests](#21-order-tests)
  * [2.2 PaymentService Tests](#22-paymentservice-tests)
* [Task 3: Parameterized Tests](#task-3-parameterized-tests)
  * [3.1 Payment Scenarios](#31-payment-scenarios)
* [Task 4: Regression Testing](#task-4-regression-testing)
* [Task 5: Test Suite](#task-5-test-suite)
* [Task 6: Generate HTML Test Report](#task-6-generate-html-test-report)
<!-- TOC -->


# Hands-on Exercise1: Extending the Product Class and Writing Unit Tests
### Objective
In this exercise, you will extend the **[existing Product class](../README.md#writing-your-first-unit-test)** to add a new method that increases the stock. 
You will also write unit tests in the **[existing ProductTest class](../README.md#writing-your-first-unit-test)** to validate the functionality of this method, ensuring that it works correctly under 
different conditions.

### Task 1: Extend the Product Class

1. Implement a new method  increaseStock(int quantity) in the [existing Product class](../README.md#writing-your-first-unit-test) that:
2. Increases the stock of the product by a given quantity.
3. If the increased stock quantity exceeds 100, an exception should be thrown.
4. If the quantity is zero or negative, an exception should be thrown.
5. The stock should be updated accordingly if the quantity is valid.

### Task 2: Write JUnit Test Cases
1. Write a test case in the ProductTest class to verify that the stock is increased correctly when a valid quantity is provided.
2. Write a test case to ensure an exception is thrown if the stock exceeds 100.
3. Write a test case to ensure an exception is thrown if a negative quantity is provided.

### Task 3: Run and Analyze Your Tests
1. Run the test cases in your IDE. 
2. Ensure all test cases pass and verify expected behavior.
3. Modify the `increaseStock` method to **intentionally introduce a faulty calculation**.
4. Re-run all the test cases to observe the failure(**test failed**).

### Additional Challenges (Optional)

* Implement a method to apply a discount to the product’s price (a percentage or fixed amount) and update the price accordingly.
* Implement validation to ensure the product has a valid price (e.g., it should not be negative).










***












# Hands-on Exercise 2: Implementing an Order Class and Comprehensive Unit Testing

### Objective
In this exercise, you will extend an existing e-commerce domain model by implementing an `Order` class and thoroughly testing its behavior using JUnit.  
You will practice **test-driven thinking**, **fault detection**, and **full functional coverage** by intentionally introducing logical errors and identifying them through unit tests.

---

## Task 1: Pre-requisite Step

### Task 1.1. Reuse and Verify Exercise 1 Solution

1. **Copy the complete solution code from Exercise 1 to the new folder `Exercise2`**.
2. Run all existing tests and ensure:
   - All tests pass
   - The baseline behavior is correct
   - Comprehend the logic behind them 

---

### Task 1.2. Intentional Error Injection 

After confirming the correct behavior:

1. **Introduce logical mistakes intentionally** in the following methods:
   - `reduceStock`
   - `increaseStock`
   - `applyDiscount`

2. Examples of intentional mistakes:
   - Allowing negative stock
   - Incorrect arithmetic (e.g., adding instead of subtracting)
   - Missing validation checks

3. **Run the tests after each change** and:
   - Observe which test fails
   - Identify the exact location and cause of the fault
   - Fix the logic and rerun the tests

> This step demonstrates how unit tests help *localize defects early*.

---

## Task 2: Implement the Order Class

Design a new `Order` class with the following responsibilities:

### Attributes
- `orderId`: a unique identifier for the order
- `totalAmount`: total monetary value of the order

### Constructor
- Initialize all attributes
- Validate that `totalAmount` is non-negative

---

### Business Methods

#### 1. `applyDiscount(double discount)`
- Accepts a discount amount
- Ensures:
   - Discount is not negative
   - Discount does not exceed `totalAmount`
- If valid, reduces `totalAmount`, otherwise throws exception.

#### 2. Additional Methods

- `applyTax(double taxRate)` - reduces totalAmount by taxRate
- `addItem(double price)` - increases totalAmount
- `removeItem(double price)` - decreases totalAmount

Each method must:
- Follow proper validation rules
- Modify `totalAmount` correctly
- Enforce business constraints

---

## Task 2: Write JUnit Test Cases

Write **separate test methods** to achieve **full functional coverage**.

> Follow [behavior-oriented naming](../../module2/README.md#3-junit-naming-conventions-behavior-oriented) for test classes and methods.

### Constructor Tests
- Valid constructor initializes fields correctly
- Constructor throws exception for invalid total amount

### Discount Tests
- Valid discount reduces total amount correctly
- Negative discount throws exception
- Discount exceeding total amount throws exception
- Boundary cases (e.g., discount = 0, discount = totalAmount)

### Additional Method Tests
- Test normal values
- Test boundary values
- Test edge cases and invalid inputs

### General Rules
- Each test must:
   - Test **one behavior**
   - Be **independent and repeatable**
   - Improve assertion messages for clarity and diagnostics
   - Follow behavior-oriented naming:
     ```
     methodName_condition_expectedResult
     ```


---

## Task 3: Run, Analyze, and Reflect

1. Run all tests and ensure they pass
2. Introduce a **logical defect** into each method one at a time.
3. Re-run tests and:
   - Observe failure messages
   - Identify which test caught the defect
   - Fix the implementation
4. Confirm all tests pass again













***










# Hands-on Exercise 3: Parameterized Testing, Test Suites, and Automated Test Execution

### Objective
In this exercise, you will enhance your testing strategy by converting existing unit tests into **parameterized tests**.  
You will systematically test **normal, boundary, and edge case values**, organize tests using a **JUnit test suite**, 
and execute all tests using **Maven**, generating an automated **Surefire test report**.

This exercise emphasizes **test completeness, reusability, and automation**.

---

## Pre-requisite Step

1. **Copy the complete solution code from Exercise 2 to the new folder `Exercise3`**.
2. Run all existing tests and ensure:
    - All tests pass
    - The baseline behavior is correct
    - Comprehend the logic behind them
3. Introduce logical mistakes intentionally.

4. **Run the tests after each change** and:
    - Observe which test fails
    - Identify the exact location and cause of the fault
    - Fix the logic and rerun the tests

> This step demonstrates how unit tests help *localize defects early*.



---

## Task 1: Refactor Tests into Parameterized Tests

Refactor the unit tests written in Exercise 2 to use **JUnit parameterized tests** wherever applicable.

> Parameterized tests allow the same test logic to be executed with multiple input–output combinations.

---

### Apply Parameterized Tests to All Business Methods

You must write parameterized tests for **each method**, including:

- Constructor
- `applyDiscount(double discount)`
- `applyTax(double taxRate)`
- `addItem(double price)`
- `removeItem(double price)`

---

### Input Categories to Cover

For **each method**, include test cases covering:

#### Normal Values
Typical values expected during regular system usage.

**Examples:**
- Discount: `50`, `100`
- Tax rate: `0.05`, `0.1`
- Item price: `200`, `499.99`

#### Boundary Values (Tipping Points)
Values at the limits where system behavior may change.

**Examples:**
- Discount = `0`
- Discount = `totalAmount`
- Tax rate = `0`
- Item price = `0`

#### Edge / Invalid Values
Values outside the valid range that should trigger exceptions.

**Examples:**
- Negative discount or tax rate
- Discount greater than `totalAmount`
- Negative item price

> Each parameterized test must clearly document expected outcomes.

---

## Task 2: Design Input–Output Tables

For each parameterized test, explicitly define input–output pairs.

Example for `applyDiscount`:

| Initial Amount | Discount | Expected Result | Type of input pairs |
|---------------|----------|-----------------|---------------|
| 1000          | 100      | 900             | Valid         |
| 1000          | 0        | 1000            | Boundary      |
| 1000          | 1000     | 0               | Boundary      |
| 1000          | -10      | Exception       | Edge Exception         |
| 1000          | 1500     | Exception       | Edge Exception         |

---

## Task 3: Design a JUnit Test Suite

Design a **JUnit test suite** that executes **all test classes** under exercises package:

---

## Task 4: Run Tests and Generate Reports Using Maven

Execute all tests using Maven from the project root:


1. Run all tests and ensure they pass
2. Generate and Inspect `surefire` `HTML` Report
   - Review:
     - Number of tests executed
     - Passed / failed test cases
     - Execution time
3. Introduce a **logical defect** into each method one at a time.
4. Re-run tests and:
    - Observe failure messages on the `surefire` report
    - Identify which test caught the defect
    - Fix the implementation
5. Confirm all tests pass again

---


## Reflection Questions

1. How do parameterized tests improve test maintainability?
2. Why are boundary and edge case values critical in testing business logic?
3. How does automated test execution support continuous integration?
4. What advantages do Surefire reports provide over IDE-based test runs?

---









# Hands-on Exercise 4: Testing an Order and Payment Service (Parameterized & Regression Testing)

---

**Objective**

In this exercise, students will:

- Design a simple **Order** and **PaymentService**
- Write unit tests
- Implement parameterized tests
- Perform regression testing
- Create a JUnit test suite
- Generate an HTML test report using Maven Surefire

The focus is on **business rule validation**, **boundary value analysis**, and **regression safety nets**.

---

## Task 1: System Design

## 1.1 Order Class

**Attributes**

- `orderId` — unique identifier
- `amount` — total order amount
- `status` — possible values: `NEW`, `PAID`, `FAILED`

**Methods**

- `getAmount()`
- `getStatus()`
- `markPaid()`
- `markFailed()`


**Business Rules**

- Order amount must be **greater than 0**
- Status can only change through `PaymentService`

---

## 1.2 PaymentService Class

**Method**

```java
//Processes payments for an order.
processPayment(Order order, double paymentAmount){}
```



### Business Rules

1. Payment amount must be **greater than 0**
2. Payment amount must be **equal to or greater than order amount**
3. If valid:
    - Order status becomes `PAID`
4. If invalid:
    - Order status becomes `FAILED`
    - Invalid inputs should throw an exception

---

# Task 2: Unit Testing

## 2.1 Order Tests

Verify:

- Order is initialized with status `NEW`
- New order with zero or negative amount throws exception
- markPaid() changes status correctly
- markFailed() changes status correctly

---

## 2.2 PaymentService Tests

Students must verify:

- Valid payment marks order as `PAID`
- Payment less than order amount marks order as `FAILED`
- Zero payment throws exception
- Negative payment throws exception
- Order state does not change incorrectly after failed validation

---

# Task 3: Parameterized Tests

Use JUnit Parameterized Tests (e.g., `@CsvSource`) to test multiple payment scenarios efficiently.

---

## 3.1 Payment Scenarios

| Order Amount | Payment Amount | Expected Result |Type
|--------------|---------------|----------------|--------------|
| 100.0 | 100.0 | PAID | Normal|
| 100.0 | 150.0 | PAID |Normal|
| 100.0 | 99.99 | FAILED |Boundary|
| 100.0 | 0.0 | Exception |Edge Exception|
| 100.0 | -10.0 | Exception |Edge Exception|


Verify:

- Correct status transition
- Correct exception handling
- No unintended side effects

---

# Task 4: Regression Testing

After confirming all tests pass:

1. Introduce **one logical mistake at a time**, such as:
    - Using `>` instead of `>=`
    - Forgetting to update order status
    - Removing validation for zero payments
2. Re-run all tests
3. Observe:
    - Which test fails
    - Why it fails
4. Fix the defect
5. Confirm all tests pass again

Students must explain:

- Why this is considered regression testing
- Which tests acted as defect detectors
- Whether parameterized tests caught boundary defects

---

# Task 5: Test Suite

Create a test suite that groups:

- Order tests
- PaymentService tests
- Parameterized tests

The suite must execute all tests in a single run.

---

# Task 6: Generate HTML Test Report

Run:

    mvn test

Locate report in:

    target/surefire-reports
