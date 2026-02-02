# Exercises
## Hands-on Exercise1: Extending the Product Class and Writing Unit Tests
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

---



## Hands-on Exercise 2: Implementing an Order Class and Comprehensive Unit Testing

### Objective
In this exercise, you will extend an existing e-commerce domain model by implementing an `Order` class and thoroughly testing its behavior using JUnit.  
You will practice **test-driven thinking**, **fault detection**, and **full functional coverage** by intentionally introducing logical errors and identifying them through unit tests.

---

## Task 1: Pre-requisite Step

### Step 0: Reuse and Verify Exercise 1 Solution

1. **Copy the complete solution code from Exercise 1** (e.g., `Product`, stock-related methods, and their tests).
2. Run all existing tests and ensure:
   - All tests pass
   - The baseline behavior is correct
   - Comprehend the logic behind them 

---

### Intentional Fault Injection (Learning Step)

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

- `applyTax(double taxRate)`
- `addItem(double price)` - increases totalAmount
- `removeItem(double price)` - decreases totalAmount

Each method must:
- Follow proper validation rules
- Modify `totalAmount` correctly
- Enforce business constraints

---

## Task 2: Write JUnit Test Cases

Write **separate test methods** to achieve **full functional coverage**.

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




