# Exercises
## Hands-on Exercise1: Extending the Product Class and Writing Unit Tests
### Objective
In this exercise, you will extend the **[existing Product class](../../module2/README.md#writing-your-first-unit-test-with-junit)** to add a new method that increases the stock. 
You will also write unit tests in the **[existing ProductTest class](../../module2/README.md#writing-your-first-unit-test-with-junit)** to validate the functionality of this method, ensuring that it works correctly under 
different conditions.

### Task 1: Extend the Product Class

1. Implement a new method  increaseStock(int quantity) in the [existing Product class](../../module2/README.md#writing-your-first-unit-test-with-junit) that:
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

---


## Hands-on Exercise2: Implementing an Order Class and Writing Unit Tests
### Objective:
In this exercise, you will design a new Order class for an e-commerce system and implement a method to apply a discount while ensuring proper validation. You will then write JUnit test cases to verify the correctness of your implementation.


### Task 1: Implement the Order Class
1. Define the Order class with the following attributes:
   * orderId (a unique identifier for the order).
   * totalAmount (total price of the order).
2. Implement a constructor to initialize these attributes.
3. Implement a method applyDiscount(double discount) that:
   * Accepts a discount amount.
   * Ensures the discount is not negative.
   * Ensures the discount does not exceed the total order amount.
   * If valid, applies the discount by reducing totalAmount.

### Task 2: Write JUnit Test Cases
1. Write a test case (testApplyValidDiscount) to verify a valid discount is applied correctly.
2. Write a test case to ensure an exception is thrown when applying a negative discount.
3. Write a test case to ensure an exception is thrown when the discount exceeds the total order amount.

### Task 3: Run and Analyze Your Tests

1. Run the test cases in your IDE.
2. Ensure all test cases pass and verify expected behavior.
3. Modify the `applyDiscount` method to **intentionally introduce a faulty calculation**.
4. Re-run all the test cases to observe the failure(**test failed**).

### Additional Challenges (Optional)

1. Extend the class to include a method to apply tax to the total amount.
2. Implement a method to add multiple items to an order and update the total price accordingly.
3. Implement validation to ensure the order is valid before applying any discounts or taxes (e.g., check if the totalAmount is positive).

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

---

# **Hands-on Exercise4: Implementing a Student Grading System with JUnit**

## **Objective**
This exercise will help you:
- Design a **Student Grading System** with multiple classes.
- Implement **unit tests** and **parameterized tests** in JUnit.
- Organize tests into a **test suite**.
- Modify source code to introduce a bug and analyze test failures.
- Generate a test report.


## **Task 1: Implement the Student Class**
Construct a `Student` class with the following:
1. A **name** attribute.
2. A **grade** attribute (between 0 and 100).
3. A method `getLetterGrade()` that returns:
    - `"A"` for grades 90-100.
    - `"B"` for grades 80-89.
    - `"C"` for grades 70-79.
    - `"D"` for grades 60-69.
    - `"F"` for grades below 60.
4. Ensure grade validation (throw an exception for invalid values).


## **Task 2: Implement the GradingSystem Class**
Construct a `GradingSystem` class with:
1. A method `evaluateStudent(Student student)` that returns the student's letter grade.


## **Task 3: Write Unit Tests**
1. Write test cases to check:
    - Correct letter grade assignment.
    - Exception handling for invalid grades.
2. Run the tests and analyze results.


## **Task 4: Implement Parameterized Tests**
1. Convert the letter grade test to a **parameterized test**.
2. Use `@ParameterizedTest` with `@CsvSource` to test multiple grade values.


## **Task 5: Design a Test Suite**
1. Form a **test suite** to run all test classes together.
2. Ensure all tests are executed when running the suite.


## **Task 6: Modify Code to Introduce a Bug and Generate Test Report**
1. **Introduce a bug** in `getLetterGrade()` (e.g., return `"B"` for all grades).
2. Run tests and analyze failures.
3. Fix the bug and rerun tests.
4. Generate a test report.

