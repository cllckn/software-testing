# Assignment 1: Unit Testing a Bank Account System

## Objective

In this assignment, you will design a simple **Bank Account System** and validate its behavior using **JUnit unit tests, 
parameterized tests, and test suites**.  

The goal is to practice **behavior-oriented testing**, **default detection**, and **regression awareness** by 
intentionally introducing logical defects and identifying them through automated tests.

This assignment aligns with the **hands-on exercises** you completed earlier and reinforces:
- Unit testing
- Boundary and edge case analysis
- Parameterized testing
- Maven-based test execution and reporting

---

## Task 1: Define the BankAccount and Bank Classes Using Java

### 1.1 BankAccount Class

Define a class named `BankAccount` with the following attributes:

- `accountId` — unique identifier of the account
- `ownerName` — account holder’s name
- `balance` — current account balance

#### Constructor
- Initialize all attributes
- Validate that the initial balance is **not negative**

#### Methods
- `deposit(double amount)`
   - Adds money to the balance
   - Rejects zero or negative values

- `withdraw(double amount)`
   - Deducts money from the balance
   - Rejects:
      - Negative or zero amounts
      - Withdrawals exceeding the current balance

- `getBalance()`
   - Returns the current balance

---

### 1.2 Bank Class

Define a class named `Bank` that manages multiple bank accounts.

#### Attributes
- A collection of `BankAccount` objects

#### Methods
- `addAccount(BankAccount account)`
- `getTotalAssets()`
   - Returns the sum of balances of all accounts
- `transfer(BankAccount from, BankAccount to, double amount)`
   - Transfers funds between two accounts
   - Enforces validation rules

---

## Task 2: Write Unit and Integration Test Cases

### 2.1 BankAccount Tests (Unit Tests)

Write test cases to verify:

#### Constructor
- Valid initial balance initializes correctly
- Negative initial balance throws exception

#### Deposit
- Normal deposit increases balance
- Zero deposit throws exception
- Negative deposit throws exception

#### Withdraw
- Normal withdrawal reduces balance
- Withdrawal equal to balance succeeds
- Withdrawal exceeding balance throws exception
- Zero or negative withdrawal throws exception

---

### 2.2 Bank Tests (Integration-Oriented Tests)

Write test cases to verify:

- Accounts are added correctly
- Total assets are calculated correctly
- Transfers:
   - Succeed for valid amounts
   - Fail for insufficient balance
   - Do not change balances on failure

> These tests integrate multiple objects and help detect **regression errors**.

---

## Task 3: Implement a Test Suite

Define a JUnit test suite that runs **all tests related to the bank system**:

- `BankAccountTest`
- `BankTest`
- Parameterized tests

The suite should execute all tests in a single run.

---

## Task 4: Implement Parameterized Tests

Use **JUnit parameterized tests** to validate multiple scenarios efficiently.

### 4.1 Parameterized Tests for `deposit()` and `withdraw()`

Test **normal, boundary, and edge cases**.

#### Example Values

| Category  | Values |
|---------|--------|
| Normal   | `50.0`, `100.0`, `250.75` |
| Boundary | `0.01`, `balance`, `balance - 0.01` |
| Edge    | `0.0`, `-1.0`, `-100.5` |

Use:
- `@CsvSource` for amount → expected balance
- `@ValueSource` for invalid values

---

### 4.2 Parameterized Tests for Transfers

Test combinations of:
- Transfer amounts
- Source balances
- Expected outcomes (success or exception)

#### Example Transfer Cases

| From Balance | Transfer Amount | Expected Result |
|-------------|-----------------|-----------------|
| 500.0 | 100.0 | Success |
| 500.0 | 500.0 | Success |
| 500.0 | 500.01 | Exception |
| 500.0 | -50.0 | Exception |

---

## Task 5: Run, Analyze, Reflect, and Report

1. Run all tests and ensure they pass
2. Introduce **logical mistakes intentionally** into each method (one at a time), such as:
   - Adding instead of subtracting during withdrawal
   - Skipping validation checks
   - Incorrect transfer logic
3. Re-run the tests and:
   - Observe which test fails
   - Identify the exact failure location
   - Understand why the failure occurred
4. Fix the defect and re-run all tests
5. Confirm all tests pass again
6. Run all tests using maven
7. Generate an **HTML test report** using Maven Surefire


***

## Evaluation Criteria
***
The assignment will be evaluated based on two primary components:

1) Project Implementation: The quality and effectiveness of the project you implement.

2) Oral Exam Performance: Your performance during the oral exam, which will take place during your lab class in Week 7( the week starting March 2, 2026 ).

- **Correctness** (Does the application meet the requirements?).
- **Code Quality** (Readable, well-structured, meaningful names).
- **Documentation** (Completeness and clarity).
- **Oral Defense** (Understanding and ability to explain code).

---

## Oral Exam Requirement

The oral exam is **mandatory** as part of the evaluation process. Students will be assessed 
based on their understanding of the material presented in their **reports** and **source code**.

### **During the Oral Exam:**
- Reports must be **open** and accessible.
- Source code must be **ready to show** in the IDE.
- Application must be **ready to run** for demonstration.

---

## Group Work
Students must complete the assignment **individually**.  

---

## Report Structure
While there is no standard template for the report, it must include the following essential components:

### 1. Cover Page
Student Information: Include your full name, student ID, course name, and date of submission.

Title of the Report: Clearly state the title of your study or project.

### 2. Study Explanation
The report must provide the explanation of your study, including:

- Objective: Clearly outline the purpose and goals of your study.
- Design and Implementation notes
- The Git repository address or the source code as an annex to the report.
- Conclusion: Summarize the key points and findings of your study.

### 3. Additional Recommendations

Ensure that your report is well-organized and free of grammatical errors.

Use clear headings and subheadings to enhance readability.

---

## Email Submission

Students are required to attach their report as a PDF file and submit it via **email (cceken@ku.edu.kz)** before the 
oral examination.

* Email Subject: Use the following format for the subject line of your email:
    - st-assignment1-StudentFullName
* File Naming: Ensure that the report file is named appropriately, using the following format:
    - StudentFullName-report.pdf
---


## Late Submission and Oral Exam Policy
Students must submit their **reports and source code** before the **oral exam** (during their lab class in **Week 7**), 
as the oral exam time is crucial for evaluation.

If students are unable to attend the scheduled oral exam, they will be allowed to defend their project one week 
later during lab class hours.

However, this late defense of the oral exam will result in a 20% penalty on the total grade.

**Please note that there will not be another opportunity to defend the project beyond this timeframe.**

---

### By adhering to these guidelines and policies, you will ensure that your submission is complete and meets the evaluation criteria. 

***Good luck with your projects and oral exams!***
