<!-- TOC -->
* [**Hands-on Exercise 1: Developing Bank Account REST API Using Node.js**](#hands-on-exercise-1-developing-bank-account-rest-api-using-nodejs)
  * [**Objective**](#objective)
  * [**Tasks**](#tasks)
    * [**1. Setup a Basic Express Server**](#1-setup-a-basic-express-server)
    * [**2. Define an In-Memory Database**](#2-define-an-in-memory-database)
    * [**3. Implement API Endpoints**](#3-implement-api-endpoints)
      * [**GET /api/accounts**](#get-apiaccounts)
      * [**GET /api/accounts/:accountNumber**](#get-apiaccountsaccountnumber)
      * [**POST /api/accounts**](#post-apiaccounts)
      * [**PUT /api/accounts/:accountNumber**](#put-apiaccountsaccountnumber)
      * [**DELETE /api/accounts/:accountNumber**](#delete-apiaccountsaccountnumber)
      * [**PATCH /api/accounts/:accountNumber**](#patch-apiaccountsaccountnumber)
    * [**4. Writing REST API Tests**](#4-writing-rest-api-tests)
* [**Hands-on Exercise 2: Automated Testing for the Bank Account REST API Developed in Module 4 Exercise 1**](#hands-on-exercise-2-automated-testing-for-the-bank-account-rest-api-developed-in-module-4-exercise-1)
  * [**Objective**](#objective-1)
  * [Test Cases to Implement](#test-cases-to-implement)
  * [Running the API as a Service with PM2](#running-the-api-as-a-service-with-pm2)
  * [**Running REST API Tests for Both Servers**](#running-rest-api-tests-for-both-servers)
* [**Hands-on Exercise 3: Automated Testing With The Jest and SuperTest for the Bank Account REST API Developed in Module 4 Exercise 1**](#hands-on-exercise-3-automated-testing-with-the-jest-and-supertest-for-the-bank-account-rest-api-developed-in-module-4-exercise-1)
  * [Overview](#overview)
  * [Step 1 — Export the In-Memory Store From the Server](#step-1--export-the-in-memory-store-from-the-server)
  * [Step 2 — Understand the Test Isolation Strategy](#step-2--understand-the-test-isolation-strategy)
    * [The Problem](#the-problem)
    * [The Solution: `beforeEach` + `accounts.length = 0`](#the-solution-beforeeach--accountslength--0)
  * [Step 3 — Behaviour-Oriented Test Naming](#step-3--behaviour-oriented-test-naming)
  * [Step 4 — Write the Test Suite](#step-4--write-the-test-suite)
    * [4.1 — File Setup](#41--file-setup)
    * [4.2 — GET /api/accounts](#42--get-apiaccounts)
    * [4.3 — GET /api/accounts/:accountNumber](#43--get-apiaccountsaccountnumber)
    * [4.4 — POST /api/accounts](#44--post-apiaccounts)
    * [4.5 — PUT /api/accounts/:accountNumber](#45--put-apiaccountsaccountnumber)
    * [4.6 — DELETE /api/accounts/:accountNumber](#46--delete-apiaccountsaccountnumber)
    * [4.7 — PATCH /api/accounts/:accountNumber](#47--patch-apiaccountsaccountnumber)
* [**Hands-on Exercise 4: Implement the application in module 4 section 6**](#hands-on-exercise-4-implement-the-application-in-module-4-section-6)
* [**Hands-on Exercise 5: Implement the application in module 4 section 5**](#hands-on-exercise-5-implement-the-application-in-module-4-section-5)
<!-- TOC -->


# **Hands-on Exercise 1: Developing Bank Account REST API Using Node.js**

## **Objective**
In this exercise, students will build a **RESTful API** for managing bank accounts using **Node.js**, **Express.js**, and an **in-memory database**. 
The API will support basic bank operations.



## **Tasks**

### **1. Setup a Basic Express Server**
- Initialize a new **Node.js project**.
- Install **Express.js**.
- Set up an Express server.



### **2. Define an In-Memory Database**
- Store bank account data in a **JSON array**.
- Each account should have:
  - `accountNumber` (integer)
  - `name` (string)
  - `balance` (float)
  - `currency` (string, e.g., "USD", "EUR")

```json
{
  "accountNumber": 1001,
  "name": "John Doe",
  "balance": 1500.75,
  "currency": "USD"
}
```



### **3. Implement API Endpoints**
Develop the following RESTful routes:

#### **GET /api/accounts**
- Return the list of all bank accounts.

#### **GET /api/accounts/:accountNumber**
- Retrieve a specific account by `accountNumber`.
- If not found, return a **404 error**.

#### **POST /api/accounts**
- Accept a **JSON request body** with account details.
- Add the new account to the in-memory array.
- Respond with the added account.

#### **PUT /api/accounts/:accountNumber**
- Update an existing account by `accountNumber`.
- Modify only the provided fields.
- If not found, return a **404 error**.

#### **DELETE /api/accounts/:accountNumber**
- Remove an account by `accountNumber`.
- Respond with a success message.

#### **PATCH /api/accounts/:accountNumber**
- Accept a **JSON request body** with an amount.
- Increase/decrease the account balance.
- If not found, return a **404 error**.



### **4. Writing REST API Tests**
- Use **http client** to test all API endpoints.
- Validate that all operations behave as expected.



***




# **Hands-on Exercise 2: Automated Testing for the Bank Account REST API Developed in Module 4 Exercise 1**

## **Objective**
In this exercise, you will write **automated tests** for a **Bank Account REST API** using the **IntelliJ HTTP Client**.
Your goal is to validate the following aspects for each endpoint:

- **Response Status Code** (e.g., `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`).
- **Response Headers** (e.g., `Content-Type: application/json`).
- **Response Body** (e.g., verifying JSON structure and expected values).

By the end of this exercise, you will have a fully automated API test suite.


## Test Cases to Implement

**Test 1: Get All Accounts (`GET /api/accounts`)**
- Verify that the request returns a **200 OK**.
- Ensure the response is in **JSON format**.
- Validate that the response contains an **array of accounts**.

**Test 2: Get Account by Account Number (`GET /api/accounts/:accountNumber`)**
- Verify that a valid account number returns a **200 OK**.
- Check if the response contains the correct **account details**.
- Handle cases where an **invalid account number** returns a **404 Not Found**.

**Test 3: Add a New Account (`POST /api/accounts`)**
- Ensure that adding a new account returns a **201 Created**.
- Verify that the response contains the **newly added account details**.
- Add a test case for **invalid input** (e.g., missing `name` or `balance` should return **400 Bad Request**).

**Test 4: Update an Account (`PUT /api/accounts/:accountNumber`)**
- Verify that updating an existing account returns a **200 OK**.
- Check if the response contains the **updated account details**.
- Handle cases where an **invalid account number** returns a **404 Not Found**.

**Test 5: Delete an Account (`DELETE /api/accounts/:accountNumber`)**
- Ensure that deleting an existing account returns a **200 OK**.
- Verify that the response contains a **success message**.
- Handle cases where an **invalid account number** returns a **404 Not Found**.

**Test 6: Deposit/Withdraw Money (`PATCH /api/accounts/:accountNumber`)**
- Ensure depositing/withdrawing money returns a **200 OK**.
- Verify that the account balance increases/decreases correctly.
- Handle cases where the account does not exist (`404 Not Found`).
- Ensure the deposit amount must be **greater than 0** (`400 Bad Request` for negative values).
- Ensure withdrawal is **not allowed** if the amount exceeds the balance (`400 Bad Request` for overdrafts).


## Running the API as a Service with PM2
- Install **PM2** globally.
- Run the API as **two separate services**:
  - One on **port 3000**.
  - Another on **port 4000**.


## **Running REST API Tests for Both Servers**
- Use **http client** to test all API endpoints.
- Define environment variables for:
  - URLs (`PORT=3000` and `PORT=4000`).
- Validate that all operations behave as expected in both services.






***





# **Hands-on Exercise 3: Automated Testing With The Jest and SuperTest for the Bank Account REST API Developed in Module 4 Exercise 1**

## Overview

In this exercise you will write a full automated test suite for the Bank Account REST API using **Jest** as the test runner and **SuperTest** as the HTTP assertion library. You will also learn how to properly isolate tests by resetting shared in-memory state before each test.


---

## Step 1 — Export the In-Memory Store From the Server

Copy server.js file into the exercise3 folder. Because the `accounts` array lives inside the server module, tests need access to it so they can **reset it before each test**. Add the following lines to the bottom of `server.js`:

```js
module.exports = app;
module.exports.accounts = accounts;
```

---

## Step 2 — Understand the Test Isolation Strategy

### The Problem

Every test that calls `POST /api/accounts` with the same `accountNumber` will fail on subsequent runs because the server returns `409 Conflict` when the number already exists. Without isolation, tests become **order-dependent** and flaky.

### The Solution: `beforeEach` + `accounts.length = 0`

```js
const { accounts } = require("./server");
 
beforeEach(() => {
  accounts.length = 0; // Mutates the original array — server sees the reset
});
```

---

## Step 3 — Behaviour-Oriented Test Naming

Test names follow the pattern:

```
methodOrAction_givenContext_expectedOutcome
```

**Examples:**

```
getAllAccounts_whenNoAccountsExist_returnsEmptyArray
createAccount_whenRequiredFieldsAreMissing_returns400WithErrorMessage
adjustBalance_whenAmountExceedsBalance_returns400InsufficientFunds
```


---

## Step 4 — Write the Test Suite

Create a new file `server.test.js` alongside `server.js` and build the suite in the sections below. Each section maps to one `describe` block grouping all tests for that endpoint.

### 4.1 — File Setup

At the top of `server.test.js`:

- Import `supertest` and assign it to a variable called `request`
- Import `app` from `server.js`
- Import the `accounts` array from `server.js` using destructuring
- Open a top-level `describe("Bank Accounts API", ...)` block that will contain all sections below
- Inside that block, declare a `testAccount` constant object with the fields `accountNumber`, `name`, `balance`, and `currency`
- Add a `beforeEach` hook that resets `accounts.length` to `0` so every test starts with an empty store

---

### 4.2 — GET /api/accounts

Add a nested `describe` block for this endpoint and write two tests:

| Test name | Setup | Action | Assert |
|-----------|-------|--------|--------|
| `getAllAccounts_whenNoAccountsExist_returnsEmptyArray` | None | `GET /api/accounts` | Status `200`, body is `[]` |
| `getAllAccounts_afterCreatingAccount_returnsArrayWithAccount` | `POST` the `testAccount` first | `GET /api/accounts` | Status `200`, array has 1 item that matches `testAccount` |
 


---

### 4.3 — GET /api/accounts/:accountNumber

Add a nested `describe` block and write two tests:

| Test name | Setup | Action | Assert |
|-----------|-------|--------|--------|
| `getAccountByNumber_whenAccountExists_returnsAccount` | `POST` the `testAccount` first | `GET /api/accounts/12345` | Status `200`, body matches `testAccount` |
| `getAccountByNumber_whenAccountDoesNotExist_returns404WithErrorMessage` | None | `GET /api/accounts/99999` | Status `404`, body is `{ error: "Account 99999 not found" }` |
 


---


### 4.4 — POST /api/accounts

Add a nested `describe` block and write three tests:

| Test name | Setup | Action | Assert |
|-----------|-------|--------|--------|
| `createAccount_whenValidDataProvided_returnsCreatedAccount` | None | `POST /api/accounts` with full `testAccount` body | Status `201`, body matches `testAccount` |
| `createAccount_whenRequiredFieldsAreMissing_returns400WithErrorMessage` | None | `POST /api/accounts` with only `{ name: "Test User" }` | Status `400`, body is `{ error: "accountNumber, name, balance, and currency are required" }` |
| `createAccount_whenAccountNumberAlreadyExists_returns409WithErrorMessage` | `POST` the `testAccount` first | `POST /api/accounts` with the same `testAccount` again | Status `409`, body is `{ error: "Account 12345 already exists" }` |
 


---



### 4.5 — PUT /api/accounts/:accountNumber

Add a nested `describe` block and write two tests:

| Test name | Setup | Action | Assert |
|-----------|-------|--------|--------|
| `updateAccount_whenAccountExists_returnsUpdatedAccount` | `POST` the `testAccount` first | `PUT /api/accounts/12345` with `{ name: "Alice Smith", balance: 1500 }` | Status `200`, response `name` and `balance` match the sent values |
| `updateAccount_whenAccountDoesNotExist_returns404WithErrorMessage` | None | `PUT /api/accounts/99999` with any body | Status `404`, body is `{ error: "Account 99999 not found" }` |
 


---



### 4.6 — DELETE /api/accounts/:accountNumber

Add a nested `describe` block and write two tests:

| Test name | Setup | Action | Assert |
|-----------|-------|--------|--------|
| `deleteAccount_whenAccountExists_returnsSuccessMessage` | `POST` the `testAccount` first | `DELETE /api/accounts/12345` | Status `200`, body is `{ message: "Account 12345 deleted successfully" }` |
| `deleteAccount_whenAccountDoesNotExist_returns404WithErrorMessage` | None | `DELETE /api/accounts/99999` | Status `404`, body is `{ error: "Account 99999 not found" }` |
 

---


### 4.7 — PATCH /api/accounts/:accountNumber

The `PATCH` endpoint handles both deposits (positive `amount`) and withdrawals (negative `amount`). Add a nested `describe` block and write five tests:

| Test name | Setup | Action | Assert |
|-----------|-------|--------|--------|
| `adjustBalance_whenPositiveAmountProvided_returnsDepositSuccessAndUpdatedBalance` | `POST` the `testAccount` first | `PATCH /api/accounts/12345` with `{ amount: 500 }` | Status `200`, `message` is `"Deposit successful"`, `account.balance` is `1500` |
| `adjustBalance_whenNegativeAmountWithinFunds_returnsWithdrawalSuccessAndUpdatedBalance` | `POST` the `testAccount` first | `PATCH /api/accounts/12345` with `{ amount: -500 }` | Status `200`, `message` is `"Withdrawal successful"`, `account.balance` is `500` |
| `adjustBalance_whenAmountExceedsBalance_returns400InsufficientFunds` | `POST` the `testAccount` first | `PATCH /api/accounts/12345` with `{ amount: -5000 }` | Status `400`, `error` is `"Insufficient funds"` |
| `adjustBalance_whenAmountFieldIsMissing_returns400WithErrorMessage` | `POST` the `testAccount` first | `PATCH /api/accounts/12345` with empty body `{}` | Status `400`, body is `{ error: "A numeric 'amount' field is required" }` |
| `adjustBalance_whenAccountDoesNotExist_returns404WithErrorMessage` | None | `PATCH /api/accounts/99999` with `{ amount: 100 }` | Status `404`, body is `{ error: "Account 99999 not found" }` |
 




***

# **Hands-on Exercise 4: Implement the application in module 4 section 6**









***

# **Hands-on Exercise 5: Implement the application in module 4 section 5**








