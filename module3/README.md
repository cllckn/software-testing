# Module 3: Test-Driven Development (TDD) and Behavior-Driven Development (BDD)

---
<!-- TOC -->
* [Module 3: Test-Driven Development (TDD) and Behavior-Driven Development (BDD)](#module-3-test-driven-development-tdd-and-behavior-driven-development-bdd)
  * [What is TDD?](#what-is-tdd)
    * [Agile Development Context](#agile-development-context)
    * [Benefits of TDD](#benefits-of-tdd)
  * [TDD Cycle: Red-Green-Refactor](#tdd-cycle-red-green-refactor)
    * [Step 1: Write a Failing Test (RED)](#step-1-write-a-failing-test-red)
    * [Step 2: Write Just Enough Code to Pass (GREEN)](#step-2-write-just-enough-code-to-pass-green)
    * [Step 3: Refactor the Code (REFACTOR)-Optional](#step-3-refactor-the-code-refactor-optional)
  * [Exercises](#exercises)
  * [What is BDD?](#what-is-bdd)
<!-- TOC -->


---

## What is TDD?

**Test-Driven Development (TDD)** is a software development approach in which **tests are written before the production code**. It is a **core practice in Agile software development**, particularly in **Extreme Programming (XP)**.

### Agile Development Context

Agile is a flexible, iterative methodology that emphasizes:

- **Incremental development:** The system is built in small, usable increments, each adding functionality.  
  *Example:*
    - Version 1: Login System
    - Version 2: User Profile
    - Version 3: Payment System

- **Iterative development:** Features are refined in cycles based on feedback.  
  *Example for Login System:*
    - Iteration 1: Basic login page
    - Iteration 2: Improved UI
    - Iteration 3: Two-Factor Authentication

TDD align closely well with Agile because it ensures **tests drive development**, improves **code quality**, and detects **bugs early**.

### Benefits of TDD

- ✔ **Tests drive development** – Code is written based on well-defined tests.
- ✔ **Code quality improves** – Continuous refactoring leads to better structure and maintainability.
- ✔ **Bugs are reduced early** – Issues are detected before deployment.

---

## TDD Cycle: Red-Green-Refactor

1. **Red:** Write a failing test because the feature does not exist yet.
2. **Green:** Write the minimal code to pass the test.
3. **Refactor:** Improve the code while keeping all tests passing.


### Step 1: Write a Failing Test (RED)

We will develop a **Billing System** using TDD approach.
 
First write a **JUnit test** for the `calculateTotal()` method.

**Expected methods:**
- Multiply `price * quantity`.
- Apply a **10% discount** if subtotal > $100.
- Apply a **20% tax** on the discounted amount.

```java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class BillingSystemTest {

    @Test
    void testCalculateTotal() {
        BillingSystem billing = new BillingSystem();
        double total = billing.calculateTotal(50, 3); // Expected: (50*3) - 10% + 20% tax
        assertEquals(162.0, total, 0.01);  // Expected total = 150 - 15 + 27 = 162
    }
}
```

Expected behavior: The test fails because BillingSystem does not exist yet. (RED Phase Completed)

### Step 2: Write Just Enough Code to Pass (GREEN)

Implement a basic version of the calculateTotal() method inside BillingSystem.java to make the test pass.


```java
public class BillingSystem {
    public double calculateTotal(double price, int quantity) {
        double subtotal = price * quantity;
        double discount = subtotal > 100 ? subtotal * 0.1 : 0; // 10% discount if subtotal > $100
        double tax = (subtotal - discount) * 0.2; // 20% tax
        return subtotal - discount + tax;
    }
}
```
Expected behavior: The test passes.(GREEN phase completed)

### Step 3: Refactor the Code (REFACTOR)-Optional

Refactor the code by extracting helper methods to improve readability and maintainability.

```java
public class BillingSystem {
    public double calculateTotal(double price, int quantity) {
        double subtotal = price * quantity;
        double discount = calculateDiscount(subtotal);
        double tax = calculateTax(subtotal - discount);
        return subtotal - discount + tax;
    }

    private double calculateDiscount(double subtotal) {
        return subtotal > 100 ? subtotal * 0.1 : 0;
    }

    private double calculateTax(double amount) {
        return amount * 0.2;
    }
}

```
Expected behavior: The code becomes more modular and readable, and tests still pass!  (REFACTOR Phase Completed)


**Apply these steps for testing exceptions** 

```java
public class BillingSystemTest {

    @Test
    void testCalculateTotal() {
        BillingSystem billing = new BillingSystem();
        double total = billing.calculateTotal(50, 3); // Expected: (50*3) - 10% + 20% tax
        assertEquals(162.0, total, 0.01);  // Expected total = 150 - 15 + 27 = 162
    }

    @Test
    void testNegativePriceThrowsException() {
        BillingSystem billing = new BillingSystem();
        assertThrows(IllegalArgumentException.class, () -> billing.calculateTotal(-50, 3));
    }

    @Test
    void testNegativeQuantityThrowsException() {
        BillingSystem billing = new BillingSystem();
        assertThrows(IllegalArgumentException.class, () -> billing.calculateTotal(50, -3));
        assertEquals("Price and quantity must be positive", exception.getMessage());
    }
}
```

## Exercises
[Exercises](exercises/exercises.md)

---

## What is BDD?

**Behavior-Driven Development (BDD)** extends TDD by focusing on **system behavior from the user’s perspective** using 
**natural language scenarios**.

**Key Points**

- **Focus:** User requirements and observable system behavior
- **Audience:** Developers, testers, and non-technical stakeholders
- **Test Format:** Uses **Given–When–Then** scenarios
- **Level:** Often applied in system or acceptance testing  

**Cucumber** is a software tool for Behavior-Driven Development (BDD) that allows you to write automated tests in a 
human-readable format.

**Example: ATM Cash Withdrawal**

Cucumber uses **Gherkin** (the Given/When/Then language) to connect human-readable requirements to technical test code.


1) Feature File (`cash_withdrawal.feature`)

This is the **Gherkin file**, written in plain English so that business owners, developers, and testers can all understand it.

**Feature:** ATM Cash Withdrawal
- **As a** bank customer
- **I want to** withdraw cash from the ATM
- **So that** I can have physical money

**Scenario:** Successful withdrawal from an account with sufficient balance
- **Given** the account balance is $100
- **When** the user requests $20
- **Then** the ATM should dispense $20
- **And** the new account balance should be $80

---

2) Step Definitions

The **Step Definitions** act as the "glue" between the plain-language feature file and the application logic.  
They map each **Given/When/Then** step to the actual operations in the system.

---

3) Application Code

This is the actual software being tested, also called the **System Under Test (SUT)**.  
It contains the logic to manage the account balance and dispense cash.

---

4) Execution & Results

When we run Cucumber:
1. The `.feature` file is parsed.
2. Cucumber finds the corresponding step definitions.
3. Each step is executed in order.

**Example Output:**

- Feature: ATM Cash Withdrawal
  - Scenario: Successful withdrawal from an account with sufficient balance
    - Given the account balance is $100 → PASSED
    - When the user requests $20 → PASSED
    - Then the ATM should dispense $20 → PASSED
    - And the new account balance should be $80 → PASSED

**Summary:**
- 1 Scenario (1 passed)
- 4 Steps (4 passed)

This demonstrates how **Cucumber connects business-readable scenarios to automated tests**, allowing both technical and non-technical stakeholders to understand and verify system behavior.

