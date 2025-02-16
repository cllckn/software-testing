# Module 3: Test-Driven Development (TDD)

## **What is TDD?**

Test-Driven Development (TDD) is a software development approach and a **core practice** in Agile software development, particularly in **Extreme Programming (XP)**.

**Agile development methodology** is a flexible and fast way to develop software in small, frequent updates, focusing on customer feedback and continuous improvement.

Agile uses both incremental & iterative approaches with customer collaboration.

**Incremental:** The system is built and delivered in parts (increments), with each part adding 
functionality to the previous one. Adds new features in steps.

The system is developed in small, independent parts (increments). Each increment adds new functionality to the existing system. Every increment is potentially usable and can be delivered to users. 

For example:

    Version 1: Login System
    Version 2: User Profile
    Version 3: Payment System
    Version 4: Order Tracking

**Iterative:** The system is developed in cycles, where each cycle refines and improves the previous version based on feedback.
It improves the same features over time.

The system is built in cycles (iterations), refining and improving the same features each time. 
Each iteration reworks and enhances the previous version based on feedback. The product gets better 
with each cycle instead of delivering full features upfront. 

For example: 

    For Login System
    ---
    Iteration 1: Basic Login Page
    Iteration 2: Improved UI for Login
    Iteration 3: Added Two-Factor Authentication
    Iteration 4: Biometric Login


TDD ensures:

✔ **Tests drive development** – Code is written based on well-defined tests.  
✔ **Code quality improves** – Continuous refactoring leads to better structure and maintainability.  
✔ **Bugs are reduced early** – Issues are detected before deployment.


TDD follows a **Red-Green-Refactor** cycle. 
The steps are:
1. **Red**: Write a failing test (because the feature doesn’t exist yet).
2. **Green**: Write the minimal code to pass the test.
3. **Refactor**: Improve the code while keeping all tests passing.


## Step 1: Write a Failing Test (RED)

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

## Step 2: Write Just Enough Code to Pass (GREEN)
we implement a basic version of the calculateTotal() method inside BillingSystem.java.

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
when we run the test, it passes! (GREEN Phase Completed)

## Step 3: Refactor the Code (REFACTOR)-Optional
we refactor the code by extracting helper methods to improve readability and maintainability.

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
The code is more modular and readable, and tests still pass!  (REFACTOR Phase Completed)


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


## **Summary**
By following the **TDD cycle**, we ensured that:  
✔ **Tests drive development** (we only wrote code that was needed).  
✔ **Code quality improves** through refactoring.  
✔ **Changes remain safe** because tests verify correctness.

**TDD helps write better, cleaner, and well-tested software!**

## Exercises
[Exercises](exercises/exercises.md)
