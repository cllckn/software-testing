## Hands-on Exercise1: In-Memory REST API Development in Node.js

##  Objective
In this exercise, students will develop a **RESTful API** in **Node.js** using **Express.js** and an 
**in-memory database** for managing customer data.

## Tasks

### **Setup a Basic Express Server**
- Initialize a new **Node.js project**.
- Install **Express.js**.
- Set up a basic Express server.

### **Define an In-Memory Database**
- Instead of using a database, store customer data in a **JSON array**. Add random customers into the array for testing. 
- Each customer should have:
    - `id` (integer)
    - `name` (string)
    - `email` (string)
    - `phone` (string)
    - `city` (string)

### **Implement API Endpoints**
Develop the following RESTful routes:

#### **GET /api/customers**
- Return the list of all customers.

#### **GET /api/customers/:id**
- Retrieve a specific customer by ID.
- If the ID is not found, return a **404 error**.

#### **POST /api/customers**
- Accept a **JSON request body** with customer details.
- Add the new customer to the in-memory array.
- Respond with the added customer.

#### **PUT /api/customers/:id**
- Update an existing customer by ID.
- Only modify the provided fields.
- If the ID is not found, return a **404 error**.

#### **DELETE /api/customers/:id**
- Remove a customer by ID.
- Respond with a success message.

### **Test API Using cURL and  http client**
- Use **cURL commands** and **http client** to test each endpoint.
- Verify that customer data updates correctly.

## **Completion Criteria**
- The API should be functional with **GET, POST, PUT, and DELETE** routes.
- The in-memory database should correctly store and modify customer data.
- API should handle errors properly.


### **Additional Challenges (Optional)**
These tasks are for students to implement at home:

- Add validation for **email format** and **phone number** before adding a customer.
- Implement a **search feature** (`GET /api/customers?city=Astana`) to filter customers by city.
