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
  - `createdAt` (date string)



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



## **4. Writing REST API Tests**
- Use **http client** to test all API endpoints.
- Validate that all operations behave as expected.



## **Completion Criteria**
- The API should be functional with **GET, POST, PUT, DELETE** routes.
- Deposit and withdrawal operations should correctly modify balances.
- Tests should pass successfully.



## **Additional Challenges (Optional)**
These tasks are for students to implement at home:

- Implement a **transaction history feature** (`GET /api/accounts/:accountNumber/transactions`).
- Add a **search feature** (`GET /api/accounts?currency=USD`) to filter accounts by currency.

---







# **Hands-on Exercise 3: Extending Bank Account REST API in Exercise 1**


## **Tasks**


## **1. Convert REST API to a Web App**
- Develop web interface to test all the endpoints, using JQuery.
- Add logging module for the server, using morgan and winston libraries.


## **4. Running the API as a Service with PM2**
- Install **PM2** globally.
- Run the API as **two separate services**:
  - One on **port 3000**.
  - Another on **port 4000**.
- Ensure both services restart automatically on failure.


## **5. Writing REST API Tests**
- Use **http client** to test all API endpoints.
- Validate that all operations behave as expected.
- Define environment variables for:
  - URLs (`PORT=3000` and `PORT=4000`).


## **Completion Criteria**
- The API should be functional with **GET, POST, PUT, DELETE** routes.
- Deposit and withdrawal operations should correctly modify balances.
- API should be running as **two services** on **3000 and 4000** using **PM2**.
- Environment variables should be correctly configured and used.
- Tests should pass successfully.



## **Additional Challenges (Optional)**
These tasks are for students to implement at home:

- Implement a **transaction history feature** (`GET /api/accounts/:accountNumber/transactions`).
- Add a **search feature** (`GET /api/accounts?currency=USD`) to filter accounts by currency.
