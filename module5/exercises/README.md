# **Hands-on Exercise 1: Automated Testing for the Bank Account REST API Developed in Module 4 Exercise 1**

## **Objective**
In this exercise, you will write **automated tests** for a **Bank Account REST API** using the **IntelliJ HTTP Client**.
Your goal is to validate the following aspects for each endpoint:

- **Response Status Code** (e.g., `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`).
- **Response Headers** (e.g., `Content-Type: application/json`).
- **Response Body** (e.g., verifying JSON structure and expected values).

By the end of this exercise, you will have a fully automated API test suite.


## **Instructions**

### **1. API Endpoints**
Write automated tests for the following **Bank Account API** endpoints:

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

#### **POST /api/accounts/:accountNumber/deposit**
- Accept a **JSON request body** with an amount.
- Increase the account balance.
- If not found, return a **404 error**.
- Add validation to accept only **positive numbers**.

#### **POST /api/accounts/:accountNumber/withdraw**
- Accept a **JSON request body** with an amount.
- Decrease the account balance, ensuring no overdrafts.
- If not found or insufficient funds, return an appropriate error.
- Add validation to accept only **positive numbers**.

---

### **2. Task Requirements**
For each API endpoint, write a **test case** using the **IntelliJ HTTP Client** that verifies:
- The **response status code** (e.g., `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`).
- The **response headers**, ensuring the correct `Content-Type`.
- The **response body**, checking expected JSON structure and values.

Your tests should be saved in a **`.http` file** and should run automatically in IntelliJ.


### **3. Test Cases to Implement**

#### **Test 1: Get All Accounts (`GET /api/accounts`)**
- Verify that the request returns a **200 OK**.
- Ensure the response is in **JSON format**.
- Validate that the response contains an **array of accounts**.

#### **Test 2: Get Account by Account Number (`GET /api/accounts/:accountNumber`)**
- Verify that a valid account number returns a **200 OK**.
- Check if the response contains the correct **account details**.
- Handle cases where an **invalid account number** returns a **404 Not Found**.

#### **Test 3: Add a New Account (`POST /api/accounts`)**
- Ensure that adding a new account returns a **201 Created**.
- Verify that the response contains the **newly added account details**.
- Add a test case for **invalid input** (e.g., missing `name` or `balance` should return **400 Bad Request**).

#### **Test 4: Update an Account (`PUT /api/accounts/:accountNumber`)**
- Verify that updating an existing account returns a **200 OK**.
- Check if the response contains the **updated account details**.
- Handle cases where an **invalid account number** returns a **404 Not Found**.

#### **Test 5: Delete an Account (`DELETE /api/accounts/:accountNumber`)**
- Ensure that deleting an existing account returns a **200 OK**.
- Verify that the response contains a **success message**.
- Handle cases where an **invalid account number** returns a **404 Not Found**.

#### **Test 6: Deposit Money (`POST /api/accounts/:accountNumber/deposit`)**
- Ensure depositing money returns a **200 OK**.
- Verify that the account balance increases correctly.
- Handle cases where the account does not exist (`404 Not Found`).
- Ensure the deposit amount must be **greater than 0** (`400 Bad Request` for negative values).

#### **Test 7: Withdraw Money (`POST /api/accounts/:accountNumber/withdraw`)**
- Ensure withdrawing money returns a **200 OK**.
- Verify that the account balance decreases correctly.
- Handle cases where the account does not exist (`404 Not Found`).
- Ensure withdrawal is **not allowed** if the amount exceeds the balance (`400 Bad Request` for overdrafts).
- Ensure the withdrawal amount must be **greater than 0** (`400 Bad Request` for negative values).

### **4. Running the Tests**
1. Save your test cases in a file named **`bank-account-test.http`**.
2. Run the test file using **IntelliJ HTTP Client**.
3. Verify that all tests pass successfully.


### **Additional Challenges (Optional)**
- Test error handling for **invalid inputs** (e.g., adding an account without a name or balance).
- Verify that retrieving a **non-existent account** returns **404 Not Found**.
- Check if deleting an **already deleted account** returns an appropriate error.



### **Completion Criteria**
- All endpoints are tested.
- Correct assertions for status codes, headers, and response bodies.
- Negative test cases for error handling.
- Tests run successfully without errors.

---


# **Hands-on Exercise 2: Automated Testing With The Jest and SuperTest for the Bank Account REST API Developed in Module 4 Exercise 1**
