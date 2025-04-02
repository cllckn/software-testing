# Module 5: Integration Testing

<!-- TOC -->
* [Module 5: Integration Testing](#module-5-integration-testing)
  * [Part 1: Understanding Integration Testing](#part-1-understanding-integration-testing)
      * [Why Is Integration Testing Important?](#why-is-integration-testing-important)
      * [Key Characteristics of Integration Testing](#key-characteristics-of-integration-testing)
    * [1.1.Integration Testing with IntelliJ HTTP Client](#11integration-testing-with-intellij-http-client)
      * [Write tests for the following Rest API.](#write-tests-for-the-following-rest-api)
      * [Key Explanations](#key-explanations)
      * [Why These Assertions Are Important](#why-these-assertions-are-important)
  * [**Hands-on Exercise 1**](#hands-on-exercise-1)
    * [1.2.Testing Node.js Applications with Testing Frameworks](#12testing-nodejs-applications-with-testing-frameworks)
      * [**1. Jest**](#1-jest)
        * [**Key Features**](#key-features)
      * [**2. Supertest**](#2-supertest)
        * [🔹 **Key Features**](#-key-features)
      * [Setting up the environment](#setting-up-the-environment)
      * [Naming Conventions for Test Files](#naming-conventions-for-test-files)
      * [**Example**](#example)
        * [Key Points Explained in Comments](#key-points-explained-in-comments)
    * [1.3.Test Coverage](#13test-coverage)
        * [Why is Code Coverage Important?](#why-is-code-coverage-important)
        * [The Coverage Report](#the-coverage-report)
      * [**Example**](#example-1)
  * [**Hands-on Exercise 2**](#hands-on-exercise-2)
  * [Part 2: Case Study: Integration Testing of REST APIs with Database Support](#part-2-case-study-integration-testing-of-rest-apis-with-database-support)
    * [1. Construct Database Structures](#1-construct-database-structures)
    * [2. Develop the Application](#2-develop-the-application)
    * [3. Write and Execute Integration Tests](#3-write-and-execute-integration-tests)
      * [**Required Dependencies**](#required-dependencies)
      * [**Test File Structure**](#test-file-structure)
      * [**API Endpoints to Test**](#api-endpoints-to-test)
      * [Install Dependencies](#install-dependencies)
      * [Implement Integration Tests](#implement-integration-tests)
    * [4. Extending the Scenario: Service-Based Testing](#4-extending-the-scenario-service-based-testing)
  * [**Hands-on Exercise 3**](#hands-on-exercise-3)
  * [Part 3: The Role of Mocking in Testing](#part-3-the-role-of-mocking-in-testing)
    * [**What is Mocking?**](#what-is-mocking)
    * [**Why Mock a Database?**](#why-mock-a-database)
    * [**Jest Mock Example for PostgreSQL Pool**](#jest-mock-example-for-postgresql-pool)
  * [**Hands-on Exercise 4**](#hands-on-exercise-4)
<!-- TOC -->

## Part 1: Understanding Integration Testing

Integration testing verifies the interactions between different modules or services within an application.
It focuses on the problems that arise from the integration of modules.

##### Why Is Integration Testing Important?
* Validates the interaction between different parts of the system (e.g., API, database, client).

* Detects issues that arise when components are combined.

* Ensures that the system behaves correctly in real-world scenarios.

##### Key Characteristics of Integration Testing
* Focus on Interactions: Tests how different components interact with each other.

* Real-World Scenarios: Simulates actual usage of the system.

* End-to-End Flow: Covers the entire flow of a feature or functionality.



### 1.1.Integration Testing with IntelliJ HTTP Client

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

#### Write tests for the following Rest API.

* /part1/rest-api/server.js

```javascript
const express = require("express");
const app = express();

app.use(express.json()); // Parse JSON requests

// In-memory database: JSON array for products
let products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Phone", price: 499.99 },
  { id: 3, name: "Phone", price: 499.99 },
];

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products); // Respond with the list of all products
});

// GET a single product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id)); // Find the product by ID
  if (!product) return res.status(404).json({ error: "Product not found" }); // If not found, respond with 404
  res.json(product); // Respond with the found product
});

// POST - Add a new product
app.post("/api/products", (req, res) => {
  const { name, price } = req.body; // Extract name and price from the request body
  if (!name || !price) return res.status(400).json({ error: "Invalid input" }); // Validate input

  const newProduct = { id: products.length + 1, name, price }; // Add a new product with a unique ID
  products.push(newProduct); // Add the new product to the list
  res.status(200).json(newProduct); // Respond with the added product
});

// PUT - Update a product
app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id)); // Find the product by ID
  if (!product) return res.status(404).json({ error: "Product not found" }); // If not found, respond with 404

  const { name, price } = req.body; // Extract name and price from the request body
  product.name = name || product.name; // Update the product name if provided
  product.price = price || product.price; // Update the product price if provided
  res.json(product); // Respond with the updated product
});

// DELETE - Remove a product
app.delete("/api/products/:id", (req, res) => {
  products = products.filter((p) => p.id !== parseInt(req.params.id)); // Remove the product by ID
  res.json({ message: "Product deleted" }); // Respond with a deletion message
});

// Start server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // the server on port 3000
```




* test/st/module5/part1/rest-api/http-client.env.json

```json
{
  "local": {
    "hosturi": "http://localhost:3000"
  }
}
```

* test/st/module5/part1/rest-api/rest-api-test.http

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

#### Why These Assertions Are Important

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



### 1.2.Testing Node.js Applications with Testing Frameworks


#### **1. Jest**
[Jest](https://jestjs.io/) is a JavaScript testing framework developed by Facebook. 
It is widely used for testing **Node.js, React, and other JavaScript applications**.

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

#### Naming Conventions for Test Files
Use .test.js or .spec.js suffixes.

Jest automatically detects test files with these suffixes:
    server.test.solution.js
    product.spec.js

#### **Example**

* /part1/first-jest-test/server.js

```javascript
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Export the app for testing
module.exports = app;
```

* /test/module5/part1/first-jest-test/server.test.solution.js

```javascript
// Import supertest for making HTTP requests and the Express app
const request = require("supertest");
const app = require("../../../../../src/st/module5/part2/first-jest-test/server");

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


### 1.3.Test Coverage

Test coverage is a metric that measures how much of your source code is executed when your automated tests are run.

Maintaining a good level of code coverage is important as it helps identify untested parts of the code, reduces the risk of bugs, and improves overall software reliability. 
However, achieving 100% coverage can be expensive in terms of time, effort, and resources. Instead, focusing on critical functionalities is often more practical.

It's typically expressed as a percentage. Different types of coverage measurements exist, including:

* Statement Coverage – Percentage of code statements executed.

* Branch Coverage – Percentage of decision branches (e.g., if-else, switch) tested.

* Function Coverage – Percentage of functions/methods called in tests.

* Line Coverage – Percentage of lines of code executed.

##### Why is Code Coverage Important?

* Ensures Code Reliability – Higher code coverage indicates that more parts of the application are tested, reducing the risk of undetected bugs.
* Identifies Uncovered Code – It highlights parts of the code that have not been tested, helping developers focus on untested areas.
* Improves Test Quality – Encourages writing meaningful tests that cover all logical paths in the application.
* Enhances Maintainability – Well-tested code is easier to refactor and maintain, as unintended changes can be detected early.
* Prevents Regression Issues – With good coverage, future updates are less likely to introduce bugs in untested parts of the application.


Achieving 100% coverage can be expensive in terms of time, effort, and resources. 
Instead, focusing on critical functionalities is often more practical.

* Prioritize Critical Code – Focus on business logic, edge cases, error handling, and high-risk areas.
* Avoid Redundant Tests – Testing trivial code (e.g., getters/setters) adds little value.



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




#### **Example**

* modify the previous example /part1/first-jest-test/server.js to generate a coverage report.
  * generate the code coverage report
  * add a new endpoint (/hello)
  * regenerate the code coverage report
  * add test case for this endpoint
  * regenerate the code coverage report



---
## **Hands-on Exercise 2**

* Automated Testing With The Jest and SuperTest for the Bank Account REST API Developed in Module 4 Exercise 1**

* After adding each test case, check the generated coverage report.

---






## Part 2: Case Study: Integration Testing of REST APIs with Database Support

Integration testing for `server.js` (./part2/server.js, see below) involves the following:

- Testing the interaction between the API and the database.
- Testing the API endpoints to ensure they return the correct responses.
- Simulating real-world scenarios where a client application interacts with the API.

### 1. Construct Database Structures

* Define two new databases named `dss` and `dsstestdb`
* Construct new tables named `products` in these databases:
```sql
create table public.products
(
    id    serial primary key,
    name  text           not null,
    price numeric(10, 2) not null
);


insert into products (name, price)
values ('SSD',600),
       ('RAM',400);

```

### 2. Develop the Application

* /part2/server.js
```javascript
// Import necessary modules
const express = require("express");
const { Pool } = require("pg"); // PostgreSQL client

const app = express();

// Initialize a PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: process.env.NODE_ENV === "test" ? "dsstestdb" : "dss", // Use test DB in testing
  password: "LecturePassword",
  port: 5432,
});

// Middleware to parse JSON request bodies
app.use(express.json());

// ------------------------ GET all products ------------------------
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ GET a single product by ID ------------------------
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Product not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ POST - Add a new product ------------------------
app.post("/api/products", async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) return res.status(400).json({ error: "Invalid input" });

    const result = await pool.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    );

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

    const result = await pool.query(
      "UPDATE products SET name = COALESCE($1, name), price = COALESCE($2, price) WHERE id = $3 RETURNING *",
      [name, price, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Product not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ DELETE - Remove a product ------------------------
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ Start server (only when not in test mode) ------------------------
// If NODE_ENV is set to "test", the server does not start separately.Instead, Supertest 
// handles requests internally, preventing conflicts and unnecessary resource consumption.
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export the app and pool for testing
module.exports = { app, pool };


```

### 3. Write and Execute Integration Tests
To test the provided REST API:
1. **Start the Express server** with a test database connection.
2. **Use SuperTest** to make HTTP requests to API endpoints.
3. **Check database changes** after performing operations.
4. **Validate HTTP responses** and error handling.

#### **Required Dependencies**

- **Jest**: Test framework.
- **SuperTest**: Makes HTTP requests to test API endpoints.
- **PostgreSQL Test Database (dsstestdb)**: Ensures tests do not modify production data.

#### **Test File Structure**
- `part2/server.js` → Main Express server with PostgreSQL connection.
- `/test/module5/part2/server.test.js` → Integration tests for API endpoints.

#### **API Endpoints to Test**
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

#### Implement Integration Tests
* /test/module5/part2/server.test.js


```javascript
const request = require("supertest");
const { app, pool } = require("../../../../src/st/module5/part2/server"); // Import pool separately

// Clear test database before running tests. Runs once per test file.
// beforeEach(async () => { ... }) runs before each individual test case.
beforeAll(async () => {
  await pool.query("DELETE FROM products"); // Clean up test data
});

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
    expect(Number(response.body.price)).toBe(999.99);

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
  it("should update a product", async () => {
    const response = await request(app)
            .put(`/api/products/${productId}`)
            .send({ name: "Gaming Laptop", price: 4000 });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Gaming Laptop");
    expect(Number(response.body.price)).toBe(4000);
  });

  // Test DELETE /api/products/:id - Remove a product
  it("should delete a product", async () => {
    const response = await request(app).delete(`/api/products/${productId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Product deleted" });
  });
});

```

* Execute the tests using:
    
        npm run test:coverage



### 4. Extending the Scenario: Service-Based Testing
To apply real-world integration testing:
1. Initialize a new project including a separate service
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

// ------------------------ Start server (only when not in test mode) ------------------------
// If NODE_ENV is set to "test", the server does not start separately.Instead, Supertest
// handles requests internally, preventing conflicts and unnecessary resource consumption.
const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export the app for testing
module.exports = app;

```

2. **Test API Consumption**
    - Instead of direct API tests, the frontend (or another service) interacts with the REST API.
    - Integration tests will validate that the **client correctly consumes API responses**.

* /test/module5/part2/client.service.test.js

```javascript
const request = require("supertest");
const app = require("../../../../src/st/module5/part2/client-service"); // Import the Express app

describe("Client Service Integration Tests", () => {
  // Test fetching products from the main API
  it("should fetch products from the API", async () => {
    const response = await request(app).get("/products");
    //console.log(JSON.stringify(response));
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

```



## **Hands-on Exercise 3**

* Add PostgreSQL support for the application developed in Module 5 Exercise 2.

* Develop a new web application that sends requests to this application.

* Write related tests.

---





## Part 3: The Role of Mocking in Testing


### **What is Mocking?**
Mocking is the process of simulating fake implementations of modules, 
functions, or dependencies to test components in isolation.
- **Avoid dependency on external systems** (e.g., databases, APIs).
- **Increase test speed and reliability** by replacing slow operations.
- **Control test scenarios** by returning predefined responses.

### **Why Mock a Database?**
When testing a Node.js REST API that interacts with a database:
- A real database connection may introduce **instability** due to network issues.
- The database may **not always have the expected test data**.
- Setting up and tearing down a test database can be **time-consuming**.

By mocking the database:
- The API logic is tested **independently of the database**.
- **Consistent** responses can be returned for predictable test results.
- **Error handling** can be verified without manipulating a real database.



### **Jest Mock Example for PostgreSQL Pool**

* /part3/web-app-server.js

```javascript
// Import necessary modules
const express = require("express");
const { Pool } = require("pg"); // PostgreSQL client

const app = express();

// Initialize a PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: process.env.NODE_ENV === "test" ? "dsstestdb" : "dss", // Use test DB in testing
  password: "LecturePassword",
  port: 5432,
});

// Middleware to parse JSON request bodies
app.use(express.json());

// ------------------------ GET all products ------------------------
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ GET a single product by ID ------------------------
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id); // Convert id to an integer (base 10)
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [productId]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Product not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ POST - Add a new product ------------------------
app.post("/api/products", async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) return res.status(400).json({ error: "Invalid input" });

    const result = await pool.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ PUT - Update a product ------------------------
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id); // Convert id to an integer (base 10)
    const { name, price } = req.body;

    const result = await pool.query(
      "UPDATE products SET name = COALESCE($1, name), price = COALESCE($2, price) WHERE id = $3 RETURNING *",
      [name, price, productId]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Product not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ DELETE - Remove a product ------------------------
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id); // Convert id to an integer (base 10)
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [productId]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});


// ------------------------ GET validated price for a product ------------------------
app.get("/api/products/validated-price/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id, 10); // Convert id to an integer (base 10)

    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Fetch product price
    const result = await pool.query("SELECT price FROM products WHERE id = $1", [productId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    let { price } = result.rows[0]; // Extract the price

    // Apply discount rules
    if (price >= 500 && price <= 1000) {
      price *= 0.90; // 10% discount
    } else if (price > 1000) {
      price *= 0.80; // 20% discount
    }

    // Apply 20% tax
    const validatedPrice = price * 1.20;

    res.json({ validatedPrice: validatedPrice.toFixed(2) }); // Return final validated price
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});


// ------------------------ Start server (only when not in test mode) ------------------------
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export the app and pool for testing
module.exports = { app, pool };

```


* /test/module5/part3/server.test.js
  * Break the price validation logic to see a fail in test.

```javascript
const request = require("supertest");
const { app } = require("../../../../src/st/module5/part3/server");

// 🟢 Mock `pg` module
jest.mock("pg", () => { // Replaces the actual pg module
  // Create a mock object with `query` and `end` methods
  const mClient = {
    query: jest.fn(), // Mock query execution- mClient.query is a fake function that simulates database queries.

    end: jest.fn(),   // Mock closing the connection
  };
  return { Pool: jest.fn(() => mClient) }; // Mock `Pool` constructor. Every time new Pool() is called, it returns mClient.
});

// Import the mocked `Pool` class
const { Pool } = require("pg");
const mockPoolInstance = new Pool(); // Every time new Pool() is called, mClient is returned.

describe("Product API Integration Tests", () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Reset all mock calls before each test. Ensures that old mock calls do not interfere with new ones.
  });

  afterAll(async () => {
    await mockPoolInstance.end(); // Ensure mock pool is closed
  });

  let productId=1;

  // ------------------------ GET all products ------------------------
  // 🟢 Test: Retrieve all products
  it("should retrieve all products", async () => {
    mockPoolInstance.query.mockResolvedValueOnce({
      rows: [{ id: 1, name: "Laptop", price: 999.99 }],
    });

    const response = await request(app).get("/api/products");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(mockPoolInstance.query).toHaveBeenCalledWith(
      "SELECT * FROM products ORDER BY id ASC"
    );
  });

  // ------------------------ GET a single product by ID ------------------------
  // 🟢 Test: Retrieve a product by ID
  it("should retrieve a product by ID", async () => {
    const mockProduct = { id: 1, name: "Laptop", price: 999.99 };

    mockPoolInstance.query.mockResolvedValueOnce({ rows: [mockProduct] });

    const response = await request(app).get(`/api/products/${productId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockProduct);
    expect(mockPoolInstance.query).toHaveBeenCalledWith(
      "SELECT * FROM products WHERE id = $1",
      [productId]
    );
  });


// ------------------------Test :  POST -Add a new product ------------------------
  it("should create a new product", async () => {
    const mockProduct = { id: 1, name: "Laptop", price: 999.99 };

    // Simulate the database returning a newly inserted product
    mockPoolInstance.query.mockResolvedValueOnce({ rows: [mockProduct] });

    const response = await request(app)
      .post("/api/products")
      .send({ name: "Laptop", price: 999.99 });

    // Assertions
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(mockProduct);

    // Check if the mock query was called correctly
    // Ensures the SQL syntax is correct
    // Validates that the correct parameters are used
    // Helps catch unexpected behavior in the database interaction
    expect(mockPoolInstance.query).toHaveBeenCalledWith(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      ["Laptop", 999.99]
    );

    productId = response.body.id;
  });


  // 🟢 Test: Delete a product
  it("should delete a product", async () => {
    mockPoolInstance.query.mockResolvedValueOnce({
      rows: [{ id: productId, name: "Laptop", price: 999.99 }],
    });

    const response = await request(app).delete(`/api/products/${productId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Product deleted" });
    expect(mockPoolInstance.query).toHaveBeenCalledWith(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [productId]
    );
  });


  // ------------------------ GET validated price ------------------------
  it("should return the validated price for a product", async () => {
    const mockProduct = { id: 1, name: "Laptop", price: 1200 };

    // Mock database query to return the full product object
    mockPoolInstance.query.mockResolvedValueOnce({ rows: [mockProduct] });

    const response = await request(app).get(`/api/products/validated-price/${productId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ validatedPrice: "1152.00" }); // (1200 - 20%) + 20%
    expect(mockPoolInstance.query).toHaveBeenCalledWith(
      "SELECT price FROM products WHERE id = $1",
      [productId]
    );
  });


});

```


## **Hands-on Exercise 4**

Extend Exercise 3 to include PostgreSQL mocking in tests.

---

