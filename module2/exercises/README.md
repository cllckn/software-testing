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



