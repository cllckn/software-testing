# **Integration Testing**

## Part 1: Understanding Integration Testing

Integration testing verifies the interactions between different modules or services within an application.
It focuses on the problems that arise from the integration of modules.

### Why Is Integration Testing Important?
* Validates the interaction between different parts of the system (e.g., API, database, client).

* Detects issues that arise when components are combined.

* Ensures that the system behaves correctly in real-world scenarios.

### Key Characteristics of Integration Testing
* Focus on Interactions: Tests how different components interact with each other.

* Real-World Scenarios: Simulates actual usage of the system.

* End-to-End Flow: Covers the entire flow of a feature or functionality.



### Integration Testing with IntelliJ HTTP Client

* client.test() -> This function is used to define a test case

```javascript
client.test(testName, function() {
    // Test logic and assertions go here
});

```
* client.assert() -> This function is used to perform assertions
```javascript
client.assert(condition, failureMessage);
```

* test for the rest api in /module4/part2/rest-api/server.js

* test/st/module5/part1/test-for-products.http

```plain
### Get all products
GET {{hosturi}}/api/products
Accept: application/json

> {%
    // Assert response status code
    client.test("Request executed successfully", function() {
        // Check if the response status code is 200 (OK)
        client.assert(response.status === 200, "Response status is not 200");
    });

    // Assert response headers
    client.test("Response content-type is JSON", function() {
        // Check if the 'Content-Type' header is 'application/json; charset=utf-8'
        client.assert(response.headers.valueOf("Content-Type") === "application/json; charset=utf-8", "Expected 'application/json; charset=utf-8'");
    });

    // Assert response body
    client.test("Response contains products", function() {
        // Check if the response body is an array
        client.assert(Array.isArray(response.body), "Response body is not an array");
        // Check if the array is not empty
        client.assert(response.body.length > 0, "Response body is empty");
    });
%}

###

### Get a single product by ID
GET {{hosturi}}/api/products/2
Accept: application/json

> {%
    // Assert response status code
    client.test("Request executed successfully", function() {
        // Check if the response status code is 200 (OK)
        client.assert(response.status === 200, "Response status is not 200");
    });

    // Assert response headers
    client.test("Response content-type is JSON", function() {
        // Check if the 'Content-Type' header is 'application/json; charset=utf-8'
        client.assert(response.headers.valueOf("Content-Type") === "application/json; charset=utf-8", "Expected 'application/json; charset=utf-8'");
    });

    // Assert response body
    client.test("Response contains the correct product", function() {
        // Check if the product ID in the response is 2
        client.assert(response.body.id === 2, "Product ID is not 2");
        // Check if the product name is 'Phone'
        client.assert(response.body.name === "Phone", "Product name is not 'Phone'");
        // Check if the product price is 499.99
        client.assert(response.body.price === 499.99, "Product price is not 499.99");
    });
%}

###

### Add a new product
POST {{hosturi}}/api/products
Content-Type: application/json

{"name": "SSD", "price": 500}

> {%
    // Assert response status code
    client.test("Request executed successfully", function() {
        // Check if the response status code is 201 (Created)
        client.assert(response.status === 201, "Response status is not 201");
    });

    // Assert response headers
    client.test("Response content-type is JSON", function() {
        // Check if the 'Content-Type' header is 'application/json; charset=utf-8'
        client.assert(response.headers.valueOf("Content-Type") === "application/json; charset=utf-8", "Expected 'application/json; charset=utf-8'");
    });

    // Assert response body
    client.test("Response contains the new product", function() {
        // Check if the response body contains an 'id' field
        client.assert(response.body.id, "Product ID is missing");
        // Check if the product name is 'SSD'
        client.assert(response.body.name === "SSD", "Product name is not 'SSD'");
        // Check if the product price is 500
        client.assert(response.body.price === 500, "Product price is not 500");
    });
%}

###

### Update a product
PUT {{hosturi}}/api/products/3
Content-Type: application/json

{"name": "Updated Laptop", "price": 1099.99}

> {%
    // Assert response status code
    client.test("Request executed successfully", function() {
        // Check if the response status code is 200 (OK)
        client.assert(response.status === 200, "Response status is not 200");
    });

    // Assert response headers
    client.test("Response content-type is JSON", function() {
        // Check if the 'Content-Type' header is 'application/json; charset=utf-8'
        client.assert(response.headers.valueOf("Content-Type") === "application/json; charset=utf-8", "Expected 'application/json; charset=utf-8'");
    });

    // Assert response body
    client.test("Response contains the updated product", function() {
        // Check if the product ID in the response is 3
        client.assert(response.body.id === 3, "Product ID is not 3");
        // Check if the product name is 'Updated Laptop'
        client.assert(response.body.name === "Updated Laptop", "Product name is not 'Updated Laptop'");
        // Check if the product price is 1099.99
        client.assert(response.body.price === 1099.99, "Product price is not 1099.99");
    });
%}

###

### Delete a product
DELETE {{hosturi}}/api/products/3

> {%
    // Assert response status code
    client.test("Request executed successfully", function() {
        // Check if the response status code is 200 (OK)
        client.assert(response.status === 200, "Response status is not 200");
    });

    // Assert response body
    client.test("Response confirms deletion", function() {
        // Check if the response body contains a 'message' field with the value 'Product deleted'
        client.assert(response.body.message === "Product deleted", "Deletion message is incorrect");
    });
%}

###

```

#### Key Explanations
client.test:

    Defines a test case. The first argument is the test name, and the second argument is a function containing assertions.

client.assert:

    Used to assert conditions. If the condition is false, the test fails, and the provided error message is displayed.

response.status:

    Represents the HTTP status code returned by the server. For example:

        200 for successful GET requests.

        201 for successful POST requests.

        400 for bad requests.

response.headers.valueOf:

    Retrieves the value of a specific response header. For example:

        Content-Type: application/json; charset=utf-8 ensures the response is in JSON format.

response.body:

    Represents the parsed response body (usually JSON). You can access specific fields like id, name, and price.

        Array.isArray(response.body):

            Checks if the response body is an array. Useful for endpoints that return lists of items.

        response.body.length > 0:

            Ensures the array in the response body is not empty.

response.body.message:

    Used to check the message returned by the server, such as confirmation of deletion.

### Why These Assertions Are Important

Status Codes:

    Ensure the server responds with the correct HTTP status code (e.g., 200 for success, 201 for creation, 400 for errors).

Headers:

    Verify that the response is in the expected format (e.g., JSON).

Response Body:

    Validate the structure and content of the response to ensure the API behaves as expected.

Error Handling:

    Ensures the API handles invalid requests or missing data correctly.


---
## **Hands-on Exercise 1**

---



### Testing Node.js Applications with Testing Frameworks

#### **Jest and Supertest Overview**

#### **1. Jest**
[Jest](https://jestjs.io/) is a JavaScript testing framework developed by Facebook. It is widely used for testing **Node.js,
React, and other JavaScript applications**.

#####  **Key Features**
- **Fast and isolated tests** – Each test runs independently.
- **Built-in assertions** – No need for additional assertion libraries.
- **Mocking capabilities** – Can mock functions, modules, and timers.
- **Code coverage** – Generates reports to track untested code.



#### **2. Supertest**
[Supertest](https://www.npmjs.com/package/supertest) is a library for testing HTTP servers.
It works **on top of Jest** (or Mocha, Chai, etc.) and is used to test REST APIs.

##### 🔹 **Key Features**
- Sends HTTP requests to your Express app **without actually starting the server**.
- Supports **GET, POST, PUT, DELETE, PATCH** requests.
- Works seamlessly with Jest.
- Allows testing response **status codes, headers, and JSON data**.

#### Setting up the environment

* Installation
```shell
# Since jest and supertest are testing tools, they are only required during 
# development and should not be included in the final production build.
npm install --save-dev jest supertest 
```
* Update package.json to include a test script
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

* Run the tests
```shell
npm test
```


#### **Example**

* /part1/first-jest-test/server.js

```javascript
const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Simple GET endpoint for the root route
app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
});

// POST endpoint to greet a user by name
app.post("/greet", (req, res) => {
    const { name } = req.body; // Extract 'name' from the request body
    if (!name) {
        // If 'name' is missing, return a 400 error with a message
        return res.status(400).json({ error: "Name is required" });
    }
    // If 'name' is provided, return a greeting
    res.json({ message: `Hello, ${name}!` });
});

// Export the app for testing
module.exports = app;
```

* /test/module5/part1/first-jest-test/server.test.js

```javascript
// Import supertest for making HTTP requests and the Express app
const request = require("supertest");
const app = require("../../../../../src/st/module5/part1/first-jest-test/server");

// Describe a test suite for the GET / endpoint
describe("GET request for /", () => {
  // Test case: Check if the root endpoint returns the correct response
  it("should return a welcome message", async () => {
    // Make a GET request to the root endpoint. request(app) initialize a test instance of your Express app.
    // This allows you to simulate HTTP requests.
    const response = await request(app).get("/");

    // Assert that the status code is 200 (OK)
    expect(response.statusCode).toBe(200);

    // Assert that the response body matches the expected JSON
    expect(response.body).toEqual({ message: "Hello, world!" });
  });
});

// Describe a test suite for the POST /greet endpoint
describe("POST request for /greet", () => {
  // Test case: Check if the endpoint greets the user with their name
  it("should greet the user with their name", async () => {
    // Make a POST request to the /greet endpoint with a JSON body
    const response = await request(app)
      .post("/greet")
      .send({ name: "John" }); // Send 'name' in the request body

    // Assert that the status code is 200 (OK)
    expect(response.statusCode).toBe(200);

    // Assert that the response body matches the expected greeting
    expect(response.body).toEqual({ message: "Hello, John!" });
  });

  // Test case: Check if the endpoint returns an error when 'name' is missing
  it("should return an error if name is missing", async () => {
    // Make a POST request to the /greet endpoint without a 'name'
    const response = await request(app)
      .post("/greet")
      .send({}); // Send an empty object

    // Assert that the status code is 400 (Bad Request)
    expect(response.statusCode).toBe(400);

    // Assert that the response body contains the expected error message
    expect(response.body).toEqual({ error: "Name is required" });
  });
});
```

##### Key Points Explained in Comments
describe:

    Groups related test cases together. For example, all tests for the GET / endpoint are grouped under one describe block.

it:

    Defines an individual test case. Each it block tests a specific functionality.

request(app):

    Initialize a test instance of your Express app. This allows you to simulate HTTP requests.

expect:

    Used to assert the expected outcome of a test. For example:

        expect(response.statusCode).toBe(200) checks if the status code is 200.

        expect(response.body).toEqual({ message: "Hello, world!" }) checks if the response body matches the expected JSON.

send:

    Used to send a JSON payload in POST requests.

Error Handling:

    The second test case for POST /greet checks how the app handles invalid input (missing name).


#### Test Coverage

To generate a coverage report, you need to configure Jest to collect coverage information.
Add the following lines into the package.json.

```json
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "collectCoverage": true,
    "coverageReporters": ["text", "html"],
    "coveragePathIgnorePatterns": ["/node_modules/"]
  }
}
```
run:
```shell
npm run test:coverage
```

Text report is generated in the terminal and in the coverage/index.html file.

##### The Coverage Report

% Stmts (Statements):

    The percentage of executable statements that were executed during the tests.

% Branch:

    The percentage of branches (e.g., if statements) that were executed.

% Funcs (Functions):

    The percentage of functions that were called during the tests.

% Lines:

    The percentage of lines of code that were executed.

Uncovered Line #s:

    Lists the line numbers of code that were not executed during the tests.

* to exclude certain files (e.g., configuration files) from the coverage report,
  add  ("coveragePathIgnorePatterns": ["/node_modules/", "/config/"]) into the package.json



---
## **Hands-on Exercise 2**

* Automated Testing With The Jest and SuperTest for the Bank Account REST API Developed in Module 4 Exercise 1**

* After adding each test case, check the generated coverage report.

---









## Part 2: Case Study: Integration Testing of REST APIs with Database Support

Integration testing for [this API](./part2/server.js) would involve:

- Testing the interaction between the API and the database.
- Testing the API endpoints to ensure they return the correct responses.
- Simulating real-world scenarios where a client application interacts with the API.

* /part2/server.js
```javascript
// Import necessary modules
const express = require("express");
const { Pool } = require("pg"); // PostgreSQL client

const app = express();

// Initialize a new PostgreSQL connection pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dss',
  password: 'LecturePassword',
  port: 5432,
});

/*const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: process.env.NODE_ENV === 'test' ? 'dss_test' : 'dss', // Use test DB for testing
    password: 'LecturePassword',
    port: 5432,
});*/

// Middleware to parse JSON request bodies
app.use(express.json());

// ------------------------ GET all products ------------------------
app.get("/api/products", async (req, res) => {
  try {
    // Fetch all products from the database
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");

    // Respond with JSON data
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" }); // Handle errors
  }
});

// ------------------------ GET a single product by ID ------------------------
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract product ID from URL

    // Query database for the given product ID
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Product not found" });

    // Respond with the found product
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ POST - Add a new product ------------------------
app.post("/api/products", async (req, res) => {
  try {
    const { name, price } = req.body; // Extract product details from request body

    // Validate input (ensure name and price are provided)
    if (!name || !price)
      return res.status(400).json({ error: "Invalid input" });

    // Insert new product into the database
    const result = await pool.query(         //executes the query asynchronously using the PostgreSQL connection pool.
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *", //$1, $2 are placeholders for parameterized queries, preventing SQL injection. // RETURNING * makes PostgreSQL return the newly inserted row.
      [name, price] //name, price] is an array of values that replaces $1 and $2 in the query.
    );

    // Respond with the newly added product
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ PUT - Update a product ------------------------
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    // Update the product in the database if it exists
    const result = await pool.query(
      "UPDATE products SET name = COALESCE($1, name), price = COALESCE($2, price) WHERE id = $3 RETURNING *",
      [name, price, id]   //COALESCE($1, name) ensures that if $1 (the provided value for name) is NULL or not given, the existing name value in the database remains unchanged.
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Product not found" });

    // Respond with the updated product
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ DELETE - Remove a product ------------------------
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the product from the database
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Product not found" });

    // Respond with a success message
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ Start server ------------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Export the app for testing
module.exports = app;
```


Unlike **unit tests**, which isolate individual functions, integration tests check how various modules integrate and function as a whole.

### **2. Integration Testing Approach**
To test the provided REST API, we will:
1. **Start the Express server** with a test database connection.
2. **Use SuperTest** to make HTTP requests to API endpoints.
3. **Check database changes** after performing operations.
4. **Validate HTTP responses** and error handling.

### **3. Test Setup**
#### **Required Dependencies**
We will use:
- **Jest**: Test framework.
- **SuperTest**: Makes HTTP requests to test API endpoints.
- **PostgreSQL Test Database**: Ensures tests do not modify production data.

#### **Test File Structure**
- `part2/server.js` → Main Express server with PostgreSQL connection.
- `part2/tests/api.testv1.js` → Integration tests for API endpoints.

#### **4. Testing API Endpoints**
The tests will verify:
- **GET /api/products** → Fetch all products.
- **GET /api/products/:id** → Fetch a single product.
- **POST /api/products** → Add a new product.
- **PUT /api/products/:id** → Update an existing product.
- **DELETE /api/products/:id** → Remove a product.

Each test should:

* Simulate an API request using supertest.
* Validate the response status code and data.
* Clean up the database after each test to ensure isolation.


#### Install Dependencies
Run the following command to install the required packages:
    
    npm install --save-dev jest supertest pg

* /test/module5/part2/api.test.js

```javascript
const request = require("supertest"); // Import SuperTest for making HTTP requests
const app = require("../../../../src/st/module5/part2/server"); // Import the Express app
const { Pool } = require("pg"); // PostgreSQL connection

// Create a separate test database connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dss",  // Use a test database
  //database: "test_db",  // Use a test database
  password: "LecturePassword",
  port: 5432,
});

// Before running tests, clear the products table
/*beforeAll(async () => {
    await pool.query("DELETE FROM products");
});*/

// Close DB connection after tests
afterAll(async () => {
  await pool.end();
});

describe("Product API Integration Tests", () => {
  let productId;

  // Test POST /api/products - Create a new product
  it("should create a new product", async () => {
    const response = await request(app).post("/api/products")
      .send({ name: "Laptop", price: 999.99 });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Laptop");
    //expect(response.body.price).toBe(999.99);

    productId = response.body.id;
  });

  // Test GET /api/products - Fetch all products
  it("should retrieve all products", async () => {
    const response = await request(app).get("/api/products");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test GET /api/products/:id - Fetch a single product
  it("should retrieve a product by ID", async () => {
    const response = await request(app).get(`/api/products/${productId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(productId);
    expect(response.body.name).toBe("Laptop");
  });

  // Test PUT /api/products/:id - Update a product
  /*  it("should update a product", async () => {
        const response = await request(app)
            .put(`/api/products/${productId}`)
            .send({ name: "Gaming Laptop", price: 1299.99 });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Gaming Laptop");
        expect(response.body.price).toBe(1299.99);
    });

    // Test DELETE /api/products/:id - Remove a product
    it("should delete a product", async () => {
        const response = await request(app).delete(`/api/products/${productId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Product deleted" });
    });*/
});

```

* Execute the tests using:
        
        npx jest 


## **5. Extending the Scenario: Service-Based Testing**
To apply real-world integration testing:
1. **Create a Separate Service**
    - A simple **frontend application** (or another microservice) consumes the REST API.
    - This service retrieves products and allows modifications.

* /part2/client-service.js

```javascript
const express = require("express");
const axios = require("axios"); // For making API requests

const app = express();
const API_URL = "http://localhost:3000/api/products"; // URL of the main REST API

app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Client service running on http://localhost:${PORT}`));

module.exports = app;

```

2. **Test API Consumption**
    - Instead of direct API tests, the frontend (or another service) interacts with the REST API.
    - Integration tests will validate that the **client correctly consumes API responses**.

* /part2/test/client.service.test.js

```javascript
const request = require("supertest");
const app = require("../../../../src/st/module5/part2/client-service"); // Import the Express app

describe("Client Service Integration Tests", () => {
  // Test fetching products from the main API
  it("should fetch products from the API", async () => {
    const response = await request(app).get("/products");

    expect(response.statusCode).toBe(200);
    //expect(Array.isArray(response.body)).toBe(true);
  });
});

```



---
## **Hands-on Exercise 3**



---


## Part 3: The Role of Mocking in Testing


### **What is Mocking?**
Mocking is the process of creating fake implementations of modules, functions, or dependencies to test components in isolation. It helps to:
- **Avoid dependency on external systems** (e.g., databases, APIs).
- **Increase test speed and reliability** by replacing slow operations.
- **Control test scenarios** by returning predefined responses.

### **Why Mock a Database?**
When testing a Node.js REST API that interacts with a database:
- A real database connection may introduce **flakiness** due to network issues.
- The database may **not always have the expected test data**.
- Setting up and tearing down a test database can be **time-consuming**.

By mocking the database:
- The API logic is tested **independently of the database**.
- **Consistent** responses can be returned for predictable test results.
- **Error handling** can be verified without manipulating a real database.



### **Jest Mock Example for PostgreSQL Pool**
#### **File: `__mocks__/pg.js`**
This file mocks the PostgreSQL `pg` module to return predefined query results.


```javascript
const { Pool } = jest.createMockFromModule("pg");

const mockQuery = jest.fn(); 

Pool.prototype.query = mockQuery; 
Pool.prototype.connect = jest.fn(() => ({
    query: mockQuery,
    release: jest.fn(),
}));

module.exports = { Pool };

```


#### **File: `server.test.js`**
- Mocks the database interaction.
- Uses `supertest` to test API endpoints.
- Verifies if responses match expectations.

```javascript
const request = require("supertest");
const app = require("../server");
const { Pool } = require("pg");

jest.mock("pg");

const mockQuery = Pool.prototype.query;

describe("Product API", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    test("GET /api/products should return a list of products", async () => {
        mockQuery.mockResolvedValueOnce({ rows: [{ id: 1, name: "Laptop", price: 999 }] });

        const response = await request(app).get("/api/products");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ id: 1, name: "Laptop", price: 999 }]);
    });

    test("POST /api/products should add a new product", async () => {
        mockQuery.mockResolvedValueOnce({ rows: [{ id: 2, name: "Phone", price: 599 }] });

        const response = await request(app)
            .post("/api/products")
            .send({ name: "Phone", price: 599 });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ id: 2, name: "Phone", price: 599 });
    });

    test("DELETE /api/products/:id should remove a product", async () => {
        mockQuery.mockResolvedValueOnce({ rows: [{ id: 1, name: "Laptop", price: 999 }] });

        const response = await request(app).delete("/api/products/1");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Product deleted" });
    });
});

```

### **Key Takeaways**
- Mocking helps test API logic **without a real database**.
- Improves **test reliability and execution speed**.
- Enables testing **error scenarios** that are hard to reproduce in real environments.

