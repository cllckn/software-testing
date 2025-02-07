# Exercises
## Hands-on Exercise1: Extending the Product Class and Writing Unit Tests
### Objective
In this exercise, you will extend the existing Product class to add a new method that increases the stock. 
You will also write unit tests to validate the functionality of this method, ensuring that it works correctly under different conditions.

### Task 1: Extend the Product Class

Implement a new method  increaseStock(int amount) in the existing Product class that:

Increases the stock of the product by a given amount.

If the increased stock exceeds 100, an exception should be thrown.

If the amount is negative, an exception should be thrown.

The stock should be updated accordingly if the amount is valid.

### Task 2: Write JUnit Test Cases
Write a test case to verify that the stock is increased correctly when a valid amount is provided.

Write a test case to ensure an exception is thrown if the stock exceeds 100.

Write a test case to ensure an exception is thrown if a negative amount is provided.
### Task 3: Run and Analyze Your Tests
Run the test cases in your IDE. 

Ensure all test cases pass and verify expected behavior.

### Additional Challenges (Optional)
These tasks are for students to implement at home:

Implement a method to apply a discount to the product’s price (a percentage or fixed amount) and update the price accordingly.

Implement validation to ensure the product has a valid price (e.g., it should not be negative).

---

## Hands-on Exercise2: Implementing an Order Class and Writing Unit Tests
### Objective:
In this exercise, you will design a new Order class for an e-commerce system and implement a method to apply a discount while ensuring proper validation. You will then write JUnit test cases to verify the correctness of your implementation.


### Task 1: Implement the Order Class
Define the Order class with the following attributes:

    orderId (a unique identifier for the order).
    totalAmount (total price of the order).
Implement a constructor to initialize these attributes.

Implement a method applyDiscount(double discount) that:

    Accepts a discount amount.
    Ensures the discount is not negative.
    Ensures the discount does not exceed the total order amount.
    If valid, applies the discount by reducing totalAmount.
    If invalid, throws an exception.
### Task 2: Write JUnit Test Cases
Write a test case to verify a valid discount is applied correctly.

Write a test case to ensure an exception is thrown when applying a negative discount.

Write a test case to ensure an exception is thrown when the discount exceeds the total order amount.
### Task 3: Run and Analyze Your Tests
Run the test cases in your IDE.
Ensure all test cases pass and verify expected behavior.
### Additional Challenges (Optional)

These tasks are for students to implement at home:

    Extend the class to include a method to apply tax to the total amount.
    Implement a method to add multiple items to an order and update the total price accordingly.
    Implement validation to ensure the order is valid before applying any discounts or taxes (e.g., check if the totalAmount is positive).



---


# **Hands-on Exercise3: Implementing Parameterized Tests in JUnit**

## **Objective**
This exercise will help you:
- Implement **parameterized tests** using JUnit.
- Modify the source code to introduce a bug and observe how it affects test results.



## **Task 1: Convert a Test to Use Parameterized Tests**
Modify the existing `testApplyValidDiscount` method to use **JUnit parameterized tests**.

1. Use `@ParameterizedTest` and `@CsvSource` to test multiple discount scenarios.
2. Ensure the test checks if valid discounts correctly reduce the total amount.


## **Task 2: Modify the `Order` Class to Introduce a Bug**
Modify the `applyDiscount` method to **intentionally introduce a faulty calculation**.

1. Change the discount application logic so that it does **not correctly deduct** the full discount.


## **Task 3: Fix the Bug and Re-run the Tests**
1. Correct the bug in the `applyDiscount` method.
2. Re-run the parameterized test.
3. Ensure all test cases pass.


### Additional Challenges (Optional)

These tasks are for students to implement at home:


Extend the parameterized test to include **boundary values**, such as:
- A discount equal to the total amount.
- A discount of `0` (no reduction).
- A discount slightly greater than the total amount.


