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
