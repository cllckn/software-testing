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



## **4. Writing REST API Tests**
- Use **http client** to test all API endpoints.
- Validate that all operations behave as expected.



## **Completion Criteria**
- The API should be functional with **GET, POST, PUT, DELETE** routes.
- Deposit and withdrawal operations should correctly modify balances.
- Tests should pass successfully.



---


# **Hands-on Exercise 2: Automated Testing for the Bank Account REST API Developed in Module 4 Exercise 1**

## **Objective**
In this exercise, you will write **automated tests** for a **Bank Account REST API** using the **IntelliJ HTTP Client**.
Your goal is to validate the following aspects for each endpoint:

- **Response Status Code** (e.g., `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`).
- **Response Headers** (e.g., `Content-Type: application/json`).
- **Response Body** (e.g., verifying JSON structure and expected values).

By the end of this exercise, you will have a fully automated API test suite.


### Test Cases to Implement

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

#### **Test 6: Deposit/Withdraw Money (`PATCH /api/accounts/:accountNumber`)**
- Ensure depositing/withdrawing money returns a **200 OK**.
- Verify that the account balance increases/decreases correctly.
- Handle cases where the account does not exist (`404 Not Found`).
- Ensure the deposit amount must be **greater than 0** (`400 Bad Request` for negative values).
- Ensure withdrawal is **not allowed** if the amount exceeds the balance (`400 Bad Request` for overdrafts).


### Running the API as a Service with PM2
- Install **PM2** globally.
- Run the API as **two separate services**:
  - One on **port 3000**.
  - Another on **port 4000**.


## **Running REST API Tests for Both Servers**
- Use **http client** to test all API endpoints.
- Define environment variables for:
  - URLs (`PORT=3000` and `PORT=4000`).
- Validate that all operations behave as expected in both services.

