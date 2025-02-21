# Exercises
## **Hands-On Exercise 1: Implementing a Calculator Using Test-Driven Development (TDD)**

### **Objective**
This exercise will help you:
- Understand and apply **Test-Driven Development (TDD)**.
- Write unit tests before implementing the actual logic.
- Use **JUnit** for testing in Java.
- Handle **edge cases** and **exceptions** effectively.


### **Scenario**
You are required to develop a **basic calculator** that supports the following operations:
1. **Addition** `(a + b)`
2. **Subtraction** `(a - b)`
3. **Multiplication** `(a * b)`
4. **Division** `(a / b)` with exception handling for **division by zero**

You must follow the **TDD approach**, implementing tests **before** writing the actual calculator logic.


#### **Task 1: Write Failing Test Cases (RED)**
1. **Project Setup:**
   - Define **proper packages** for both the **main** and **test** folders in your project.
   - Organize your source files and test files within these packages.
2. **Project Setup:**
3. Define **proper packages** for both the **main** and **test** folders in your project.
4. Organize your source files and test files within these packages.. Construct a test class named **`CalculatorTest`**.
5. Write individual test cases for:
    - Addition of two numbers.
    - Subtraction of two numbers.
    - Multiplication of two numbers.
    - Division of two numbers.
    - Handling division by zero (should throw an exception).
6. Run the tests and confirm that they fail (since the calculator logic is not yet implemented).


#### **Task 2: Implement the Calculator Class (GREEN)**
1. Construct a class named **`Calculator`**.
2. Implement methods to perform **addition, subtraction, multiplication, and division**.
3. Ensure that the **division method throws an exception** if the denominator is zero.
4. Run the tests again and confirm they pass.


#### **Task 3: Refactor the Code (REFACTOR)**
1. Improve code readability and structure (e.g., extract validation into a separate method).
2. Ensure that all test cases still pass after refactoring.


### Additional Challenges (Optional)
These tasks are for students to implement at home:

1. Extend the calculator to **support modulus operation** `(a % b)`.
2. Write a parameterized test using `@ParameterizedTest` and `@CsvSource` for multiple test cases.
3. Implement exception handling for invalid inputs (e.g., non-numeric values).



---


## **Hands-On Exercise 2: Using TDD for a Student Grading System**

### **Objective**
This exercise will help you:
- Understand and apply **Test-Driven Development (TDD)** in a real-world scenario.
- Implement **unit testing** in Java using **JUnit**.
- Handle **exceptions** for invalid input values.


### **Scenario**
You are required to develop a **Student Grading System** that assigns letter grades based on numerical scores. The system should work as follows:

1. **Grades Range:**
    - `"A"` for scores **90-100**.
    - `"B"` for scores **80-89**.
    - `"C"` for scores **70-79**.
    - `"D"` for scores **60-69**.
    - `"F"` for scores **below 60**.
2. If an invalid grade (negative or above 100) is provided, the system should **throw an exception**.

You must follow the **TDD approach**, implementing tests **before** writing the actual grading logic.


#### **Task 1: Write Failing Test Cases (RED)**
1. **Project Setup:**
   - Define **proper packages** for both the **main** and **test** folders in your project.
   - Organize your source files and test files within these packages.
2. Construct a test class named **`StudentTest`**.
3. Write test cases to verify:
    - Letter grade assignment for valid scores.
    - Handling of invalid scores (negative or above 100 should throw an exception).
4. Run the tests and confirm that they fail (since the grading logic is not yet implemented).

#### **Task 2: Implement the Student Class (GREEN)**
1. Construct a class named **`Student`**.
2. Implement a method `getLetterGrade()` that assigns a letter grade based on the given numeric score.
3. Ensure that the method **throws an exception** for invalid scores.
4. Run the tests again and confirm they pass.

#### **Task 3: Refactor the Code (REFACTOR)**
1. Improve code readability and structure (e.g., extract validation into a separate method).
2. Ensure that all test cases still pass after refactoring.

### **Additional Challenges (Optional)**
These tasks are for students to implement at home:

1. Extend the system to store **multiple subjects** and calculate the **GPA**.
2. Implement a **grading curve** feature where the highest score is adjusted to 100 and others scale accordingly.
3. Write **parameterized tests** to verify multiple grades at once.

---

# **Hands-On Exercise 3: Implementing a Bank Account System Using Test-Driven Development (TDD)**

### **Objective**
This exercise will help you:
- Understand and apply **Test-Driven Development (TDD)**.
- Implement a **Bank Account** system with deposit, withdrawal, and balance checking.
- Use **JUnit** for unit testing.
- Handle **edge cases** such as insufficient funds and negative deposits.



### **Scenario**
You are required to develop a **Bank Account System** that allows users to:
1. **Deposit** money into their account.
2. **Withdraw** money from their account (with a check for sufficient balance).
3. **Check** their current balance.

The system should enforce the following **business rules**:
- A deposit amount must be **greater than zero**, otherwise an **exception should be thrown**.
- A withdrawal cannot exceed the **available balance**, otherwise an **exception should be thrown**.
- The system should correctly update the **account balance** after each transaction.

You must follow the **TDD approach**, implementing tests **before** writing the actual banking logic.


### **Tasks**

#### **Task 1: Write Failing Test Cases (RED)**
1. **Project Setup:**
   - Define **proper packages** for both the **main** and **test** folders in your project.
   - Organize your source files and test files within these packages.

2. **Writing Test Cases:**
   - Construct a test class named **`BankAccountTest`**.
   - Use @BeforeEach to initialize a new BankAccount object before each test case to avoid redundant 
   initialization code and ensure a fresh instance for every test execution.
   - Write individual test cases for:
      - Depositing a valid amount increases the balance.
      - Depositing a negative amount throws an exception.
      - Withdrawing a valid amount decreases the balance.
      - Withdrawing more than the available balance throws an exception.
      - Checking the account balance returns the correct amount.
   - Run the tests and confirm that they fail (since the banking logic is not yet implemented).

#### **Task 2: Implement the BankAccount Class (GREEN)**
1. Construct a class named **`BankAccount`**.
2. Implement methods to:
   - **Deposit** an amount into the account.
   - **Withdraw** an amount from the account (ensuring sufficient balance).
   - **Check** the current balance.
3. Ensure that invalid deposits and withdrawals **throw exceptions**.
4. Run the tests again and confirm they pass.


#### **Task 3: Refactor the Code (REFACTOR)**
1. Improve code readability and structure (e.g., extract validation into a separate method).
2. Ensure that all test cases still pass after refactoring.

#### **Task 4: Test Suite and Test Execution**

   - Write **parameterized tests** for multiple deposit and withdrawal cases.
   - Define a **test suite** to group and execute all test cases.
   - Use the **Maven command** to run all tests:
     ```sh
     mvn test
     ```
   - Generate a test report using Maven's **Surefire Plugin**:
     ```sh
     mvn surefire-report:report
     ```

### **Additional Challenges (Optional)**
These tasks are for students to implement at home:

1. Extend the system to **support multiple accounts** with unique account numbers.
2. Implement a **transaction history** feature that logs all deposits and withdrawals.


