# Module 4: Integration Testing of RESTful APIs
<!-- TOC -->
* [Module 4: Integration Testing of RESTful APIs](#module-4-integration-testing-of-restful-apis)
  * [1. Integration Testing](#1-integration-testing)
  * [2. Fundamentals Of Web Services](#2-fundamentals-of-web-services)
    * [Service-Oriented Architecture (SOA)](#service-oriented-architecture-soa)
      * [Key Characteristics of SOA:](#key-characteristics-of-soa)
      * [Simple Two-Service Communication Diagram](#simple-two-service-communication-diagram)
      * [API Communication Protocols](#api-communication-protocols)
    * [What is a RESTful API?](#what-is-a-restful-api)
      * [HTTP Status Codes](#http-status-codes)
      * [Response Formats](#response-formats)
  * [3. Developing RESTful Endpoints Using NodeJS](#3-developing-restful-endpoints-using-nodejs)
    * [Node.js](#nodejs)
    * [NPM (Node Package Manager)](#npm-node-package-manager-)
    * [Route definition in Express.js](#route-definition-in-expressjs)
    * [A simple Node.js-based RESTful API](#a-simple-nodejs-based-restful-api)
    * [REST Clients - Testing REST api using cURL and HTTP Client](#rest-clients---testing-rest-api-using-curl-and-http-client)
      * [curl](#curl)
      * [HTTP Client](#http-client)
    * [Routers and Routes in Express.js](#routers-and-routes-in-expressjs)
    * [Running Node.js apps as service using pm2](#running-nodejs-apps-as-service-using-pm2)
    * [Deploy app to a server](#deploy-app-to-a-server)
  * [4. Integration Testing with IntelliJ HTTP Client](#4-integration-testing-with-intellij-http-client)
  * [**Hands-on Exercise 1**](#hands-on-exercise-1)
  * [5.Testing Web Applications with Testing Frameworks](#5testing-web-applications-with-testing-frameworks)
    * [1. Jest](#1-jest)
    * [2. Supertest](#2-supertest)
    * [3.Test Coverage](#3test-coverage)
  * [**Hands-on Exercise 2**](#hands-on-exercise-2)
  * [6. Case Study: Integration Testing of REST APIs with Database Support](#6-case-study-integration-testing-of-rest-apis-with-database-support)
    * [1. Construct Database Structures](#1-construct-database-structures)
    * [2. Develop the Application](#2-develop-the-application)
    * [3. Write and Execute Integration Tests](#3-write-and-execute-integration-tests)
    * [4. Extending the Scenario: Service-Based Testing](#4-extending-the-scenario-service-based-testing)
  * [**Hands-on Exercise 3**](#hands-on-exercise-3)
  * [7. Role of Mocking in Testing](#7-role-of-mocking-in-testing)
  * [**Hands-on Exercise 4**](#hands-on-exercise-4)
<!-- TOC -->


## 1. Integration Testing


Integration testing verifies the interactions between different modules or services within an application.
It focuses on the problems that arise from the integration of modules.

* Why Is Integration Testing Important?

  * Validates the interaction between different parts of the system (e.g., API, database, client).

  * Detects issues that arise when components are combined.

  * Ensures that the system behaves correctly in real-world scenarios. 
    * Covers the entire flow of a feature or functionality.
    * Simulates actual usage of the system.


---  

## 2. Fundamentals Of Web Services


### Service-Oriented Architecture (SOA)

**Service-Oriented Architecture (SOA)** is an architectural pattern in which software components are structured as
independent services.

Each service performs a specific business function and communicates with other services through standardized interfaces
and language-agnostic protocols, typically over HTTP or messaging queues.

For instance; in a banking system, separate services may handle account management, fund transfers, and customer notifications, all interacting through service interfaces.

#### Key Characteristics of SOA:
- **Loose Coupling**: Services are designed to be independent, minimizing dependencies.
- **Interoperability**: Services can work across different platforms and technologies.
- **Reusability**: Services can be reused in different applications.
- **Scalability**: Services can be scaled independently based on demand.

#### Simple Two-Service Communication Diagram

```plaintext
+----------------+       HTTP/Message Queue       +----------------+
|  Service A     | <----------------------------> |  Service B     |
| (Client)       |                                | (Provider)     |
+----------------+                                +----------------+
```
In this diagram:

* Service A acts as a client (consumer) that sends a request to Service B.
* Service B processes the request and sends back a response to Service A.
* Communication between web services can be achieved using HTTP-based protocols such as REST and SOAP, remote procedure
  call (RPC) frameworks like gRPC or XML-RPC, or asynchronous messaging systems such as Apache Kafka or RabbitMQ.


#### API Communication Protocols

**RESTful APIs**

- Based on **REST (Representational State Transfer)** principles.
- Uses standard **HTTP methods** (GET, POST, PUT, DELETE).
- Data format: **JSON**, sometimes XML.
- Stateless, lightweight, and widely used for web applications.

**SOAP (Simple Object Access Protocol)**

- A **protocol** for exchanging structured information in web services.
- Uses **XML** for message format.
- Operates over multiple transport protocols (HTTP, SMTP, etc.).
- Supports **WS-Security** for enterprise-level security.

**XML-RPC (XML Remote Procedure Call)**

- A protocol that allows remote function execution using **XML over HTTP**.
- Simpler than SOAP but less flexible than REST.
- Mainly used for legacy systems requiring XML-based communication.

**gRPC (Google Remote Procedure Call)**

- A **high-performance** framework developed by Google.
- Uses **Protocol Buffers (protobufs)** for efficient, compact data serialization.
- Supports **bidirectional streaming** and **multiplexing**.
- Ideal for **microservices** and **high-speed communication** across distributed systems.


---

### What is a RESTful API?


REST (Representational State Transfer) is an architectural style (or a set of principles) for designing networked applications.

RESTful refers to web services that adhere to the principles of REST (Representational State Transfer).

RESTful is an approach for building scalable, stateless web APIs that use standard HTTP methods and principles.


**Key Characteristics**

1. **HTTP Methods**: RESTful APIs use standard HTTP methods to perform operations on resources:

   | **HTTP Method** | **Usage** |
      |---------------|---------|
   | `GET`        | Retrieve resource (Read) |
   | `POST`       | Add new resource (Insert) |
   | `PUT`        | Update existing resource (Replace) |
   | `PATCH`      | Update a specific part of resource (Modify) |
   | `DELETE`     | Remove resource |

2. **Resource-Based**: RESTful APIs use resources, which are identified by URLs.
   A resource could be a user, a product, or a function to control a heating system.

3. **JSON or XML**: Data is typically exchanged in JSON or XML format, with JSON being more common due to its
   simplicity and ease of use.

4. **Stateless**: The server does not store any client context between requests.

**Example Endpoints**

- **GET /users**: Retrieve a list of users.
- **POST /users**: Add a new user.
- **GET /users/{id}**: Retrieve a specific user by ID.
- **PUT /users/{id}**: Replaces (or fully updates) the user representation.
- **DELETE /users/{id}**: Delete a specific user by ID.
- **GET /heating-system/state**: Retrieve the current status of the heating system.
- **PUT /heating-system/state {"power":"on", "temperature":"22"}** : Full state replacement
- **PATCH /heating-system/state {"power":"off"}**: Partially update

>***In RESTful APIs, a URI (path) must identify a resource, while the HTTP method defines the action performed on that resource.***

---

#### HTTP Status Codes
HTTP Status Codes are 3-digit numbers returned by web servers to indicate the status of a requested HTTP operation
(successful, failed, not found, etc.).

Here are some common status codes and their meanings:

| **Status Code**       | **Meaning**                          |
|------------------------|--------------------------------------|
| **200 OK**             | The request was successful.          |
| **201 Created**        | The resource was created successfully.|
| **400 Bad Request**    | The client sent an invalid request.  |
| **401 Unauthorized**   | Authentication is required.          |
| **403 Forbidden**      | Access to the resource is denied.    |
| **404 Not Found**      | The requested resource does not exist.|
| **500 Internal Server Error** | A server-side error occurred.     |

---

#### Response Formats
APIs typically return data in one of the following formats:

**JSON (JavaScript Object Notation)**

- **Description**: A lightweight, human-readable, and easy-to-parse format.
- **Usage**: Commonly used in modern APIs.
- **Example**:
```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
```

**XML**

```xml
<user>
  <id>1</id>
  <name>John Doe</name>
  <email>john.doe@example.com</email>
</user>
```

---

## 3. Developing RESTful Endpoints Using NodeJS

### Node.js

Node.js is an open-source, cross-platform runtime environment that allows you to run JavaScript code on the server side. 
It uses the V8 JavaScript engine, which is also used by Google Chrome, to execute code outside of a web browser.

Key Features of Node.js:

    Asynchronous and Event-Driven: Node.js uses an event-driven, non-blocking I/O model, making it efficient and suitable for real-time applications.
    Single-Threaded: Despite being single-threaded, Node.js can handle many connections concurrently thanks to its event loop.
    NPM (Node Package Manager): Node.js comes with NPM, which is the largest ecosystem of open-source libraries in the world.
    Scalability: Node.js is designed to build scalable network applications.


Use Cases:

    Web Servers: Building fast and scalable web servers.
    APIs: Creating RESTful APIs for web and mobile applications.
    Real-Time Applications: Developing chat applications, online gaming, and collaborative tools.

**For the details of Node.js, refer to https://www.w3schools.com/nodejs/**

---

### NPM (Node Package Manager) 
it is a package manager for JavaScript, and it is the default package manager for Node.js. 
It allows developers to install, share, and manage dependencies (libraries and tools) for their projects.

* Key Features of NPM:
  - Package Management: Easily install and manage third-party libraries and tools. 
  - Version Control: Keep track of different versions of packages to ensure compatibility.
  - Dependency Management: Automatically handle dependencies required by installed packages.
  - Script Running: Define and run scripts for various tasks, such as building, testing, and deploying applications.
* Basic Commands:
  - npm init: Initialize a new Node.js project. 
  - npm install <package>: Install a package and add it to the project's dependencies. 
  - npm update: Update all installed packages to their latest versions. 
  - npm run: Run a script defined in the package.json file.


[Node.js & npm Installation](https://github.com/cllckn/software-testing/tree/main/module1#2-nodejs-for-web-development)

---

### Route definition in Express.js

A **route** in Express.js defines an endpoint where clients send requests to interact with the service.

Each route consists of:

1. **An HTTP method** (GET, POST, etc.)
2. **A URL pattern** (e.g., `/api/customers/:id`)
3. **A callback function / route handler ** to handle the request

Example of a simple route in Express.js:

**Code Example**

```javascript
app.get("/api/customers", (req, res) => {
    res.json({ message: "List of customers" });
});
```

---

### A simple Node.js-based RESTful API

**Code Example: simple-restful/server.js**

```javascript
// ───────────────────────────────────────────────────────────────
// Import Required Modules
// ───────────────────────────────────────────────────────────────
const express = require("express"); // Import the Express.js framework

// ───────────────────────────────────────────────────────────────
// Configuration & Constants
// ───────────────────────────────────────────────────────────────
const app = express(); // Initialize an Express application
const PORT = 3000; // Define the port number where the server will listen

// ───────────────────────────────────────────────────────────────
// Middleware: JSON Parser
// ───────────────────────────────────────────────────────────────
// Middleware to parse JSON request bodies
app.use(express.json());


// ───────────────────────────────────────────────────────────────
// In-memory database: JSON array for products
// ───────────────────────────────────────────────────────────────
let products = [
  { id: 1, name: "SSD", price: 999.99 },
  { id: 2, name: "RAM", price: 499.99 },
];

// ───────────────────────────────────────────────────────────────
// Define Routes
// ───────────────────────────────────────────────────────────────
// Routes are the connection points (end points - addresses) in a web service where clients send requests to interact with the service.
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
  res.status(201).json(newProduct); // Respond with the added product
});


// PUT - Replace a Product Record (full replacement)
app.put("/api/products/:id", (req, res) => {
  // 1. Destructure and extract all fields from the request body.
  // Assuming 'name', 'price' are the mutable fields.
  const { name, price } = req.body;

  // 2. Validate the Request Body (Required for PUT)
  // Check if all required fields are present.
  // Note: Unlike the original code, we do NOT use '|| product.name'
  // because PUT must overwrite all fields, or fail.
  if (!name || price == null ) {
    return res.status(400).json({
      error: "PUT /products requires ALL mutable fields (name, price) for full replacement."
    });
  }

  // 3. Find the Product
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // 4. Update/Replace: Directly assign ALL new values.
  product.name = name;
  product.price = price;

  // 5. Respond with the fully updated product
  res.json(product);
});

// PATCH - Modify a product (partial or full replacement)
app.patch("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id)); // Find the product by ID
  if (!product) return res.status(404).json({ error: "Product not found" }); // If not found, respond with 404

  const { name, price } = req.body; // Extract name and price from the request body
  product.name = name || product.name; // Update the product name if provided
  product.price = price || product.price; // Update the product price if provided
  res.json(product); // Respond with the updated product
});

// DELETE - Remove a product
app.delete("/api/products/:id", (req, res) => {
  const productIdToDelete = parseInt(req.params.id);

  // 1. Store the initial count of products
  const initialLength = products.length;

  // 2. Filter the array, creating a new array without the specified product ID
  products = products.filter((p) => p.id !== productIdToDelete);

  // 3. Store the final count of products
  const finalLength = products.length;

  if (finalLength < initialLength) {
    // The product was found and successfully deleted (the array length decreased).

    // REST Best Practice: 204 No Content for a successful DELETE with no response body.
    res.status(204).end();
  } else {
    // The product was NOT found (the array length remained the same).

    // REST Best Practice: 404 Not Found indicates the resource doesn't exist.
    res.status(404).json({
      error: `Product with ID ${productIdToDelete} not found.`
    });
  }
});

// ───────────────────────────────────────────────────────────────
// Start Express HTTP Server
// ───────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

```

**Endpoints (Routes) of the developed API**

        GET http://localhost:3000/api/products

        GET http://localhost:3000/api/products/1

        POST http://localhost:3000/api/products
        Content-Type: application/json
        {
        "name": "HDD",
        "price": 299.99
        }

        PUT http://localhost:3000/api/products/2
        Content-Type: application/json
        {
        "name": "SSD",
        "price": 550.00
        }
    
        DELETE http://localhost:3000/api/products/1


---

### REST Clients - Testing REST api using cURL and HTTP Client


#### curl
    curl --version
    if not installed -> Download cURL from: https://curl.se/windows/


```sh
# Retrieves a list of all products from the database.

curl -X GET http://localhost:3000/api/products

# -i - Include response headers
# -X - Specify HTTP method
# -H - Add headers
# -d - Send data (POST/PUT)
# -u - Basic authentication
# -v - Verbose(detailed) output

---

# Fetches details of a specific product using its ID.

curl -iX GET http://localhost:3000/api/products/1

---

# Adds a new product to the database. The request body must contain name and price in JSON format.

curl -iX POST http://localhost:3000/api/products \
     -H "Content-Type: application/json" \
     -d '{"name": "HDMI Cable", "price": 50.05}'


---

# Updates the details of an existing product using its ID.

curl -X PUT http://localhost:3000/api/products/1 \
     -H "Content-Type: application/json" \
     -d '{"name": "Updated Product", "price": 1099.99}'


---

# Updates the details of an existing product using its ID. Any missing fields will retain their previous values.

curl -X PATCH http://localhost:3000/api/products/1 \
     -H "Content-Type: application/json" \
     -d '{"price": 1099.99}'
---

# Deletes a product from the database by specifying its ID.

curl -X DELETE http://localhost:3000/api/products/1


```

---

#### HTTP Client

**Code Example: ./simple-restful/restful-api-test.http**

```http request
###Retrieve all products
GET http://localhost:3000/api/products


### Find product by id
# curl -X GET http://localhost:3000/api/products
GET http://localhost:3000/api/products/2


### Find products by name
GET http://localhost:3000/api/products?name=SSD


###
POST http://localhost:3000/api/products
Content-Type: application/json

{"name": "SSD", "price": 500}

###
PUT http://localhost:3000/api/products/1
Content-Type: application/json

{"name": "Updated SSD", "price": 1099.99}


###
PATCH http://localhost:3000/api/products/1
Content-Type: application/json

{"price": 200}

###


# curl -X DELETE http://localhost:3000/api/products/1
DELETE http://localhost:3000/api/products/1


```

---

### Routers and Routes in Express.js

An **Express Router** helps organize routes by grouping them into separate files. 
This makes the code modular, manageable, and scalable.

Benefits of Using a Router

* Code organization – Keeps the project clean and structured.
* Reusability – Routes can be modular and reusable across different parts of the application.
* Easier maintenance – Adding new routes does not clutter the main server file.

**Code Example: ./router/server.js**

**Code Example: ./router/routes/product.js**



---

### Running Node.js apps as service using pm2
PM2 is a popular, open-source, production-grade process manager for Node.js applications. It helps you manage and keep your 
Node.js applications running in the background, even after system reboots or crashes.
```shell
npm install pm2@latest -g

pm2 start web-app-server.js

pm2 status

pm2 monit

pm2 restart id/name

pm2 stop id/name

pm2 delete id/name

pm2 save # Freeze a process list on reboot via

pm2 startup  #This command will generate a script that you can copy and paste into your terminal to enable PM2 to start on boot.
 

pm2 unstartup systemd  # Remove init script
```

**Starting the same node app as two separate instances with different ports using PM2.**

**Code Example: ./pm2/server.js**


```javascript
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

app.get("/", (req, res) => {
    res.send(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

```

```shell
# for linux/mac
PORT=5000 pm2 start web-app-server.js --name "my-server5" -f
PORT=4000 pm2 start web-app-server.js --name "my-server4" -f

# for windows
$env:PORT=5000; pm2 start web-app-server.js --name "my-server5" -f
$env:PORT=4000; pm2 start web-app-server.js --name "my-server4" -f

pm2 status
```

**Define env variable for rest api to switch between testing environments**

* ./pm2/http-client.env.json

```json
{
  "dev": {
    "hosturi": "http://localhost:3000"
  },
  "test-server": {
    "hosturi": "http://localhost:4000"
  }
}
```

**To Test: ./simple-restful/restful-api-test.http**


---

### Deploy app to a server

    Intellij -> Tools -> Deployment -> Configuration 
    Provide protocol -> sftp, socket address -> 192.2.2.1:22, credentials ->username:password
    Right Click -> Deploy

---

## 4. Integration Testing with IntelliJ HTTP Client

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

**Write tests for the Rest API: ./simple-restful/server.js**



* ./http-client-test/http-client.env.json

```json
{
  "local": {
    "hosturi": "http://localhost:3000"
  }
}
```

* ./http-client-test/rest-api-test.http

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

**Key Explanations**

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

**Why These Assertions Are Important**

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



## 5.Testing Web Applications with Testing Frameworks


### 1. Jest
[Jest](https://jestjs.io/) is a JavaScript testing framework developed by Facebook.
It is widely used for testing **Node.js, React, and other JavaScript applications**.

**Key Features**
- **Fast and isolated tests** – Each test runs independently.
- **Built-in assertions** – No need for additional assertion libraries.
- **Mocking capabilities** – Can mock functions, modules, and timers.
- **Code coverage** – Generates reports to track untested code.


---

### 2. Supertest
[Supertest](https://www.npmjs.com/package/supertest) is a library for testing HTTP servers.
It works **on top of Jest** (or Mocha, Chai, etc.) and is used to test REST APIs.

**Key Features**
- Sends HTTP requests to your Express app **without actually starting the server**.
- Supports **GET, POST, PUT, DELETE, PATCH** requests.
- Works seamlessly with Jest.
- Allows testing response **status codes, headers, and JSON data**.

**Setting up the environment**

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

**Naming Conventions for Test Files**

Use .test.js or .spec.js suffixes.

Jest automatically detects test files with these suffixes:
server.test.js
product.spec.js

**Example**

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

* /test/module5/part1/first-jest-test/server.test.js

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

**Key Points Explained in Comments**
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

---

### 3.Test Coverage

Test coverage is a metric that measures how much of your source code is executed when your automated tests are run.

Maintaining a good level of code coverage is important as it helps identify untested parts of the code, reduces the risk of bugs, and improves overall software reliability.
However, achieving 100% coverage can be expensive in terms of time, effort, and resources. Instead, focusing on critical functionalities is often more practical.

It's typically expressed as a percentage. Different types of coverage measurements exist, including:

* Statement Coverage – Percentage of code statements executed.

* Branch Coverage – Percentage of decision branches (e.g., if-else, switch) tested.

* Function Coverage – Percentage of functions/methods called in tests.

* Line Coverage – Percentage of lines of code executed.

**Why is Code Coverage Important?**

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

**The Coverage Report**

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




**Example**

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




## 6. Case Study: Integration Testing of REST APIs with Database Support

**Using a test database for testing helps protect the main database from unintended modifications and accidental data corruption.**


Integration testing for `server.js` (./part2/server.js, see below) involves the following:

- Testing the interaction between the API and the database.
- Testing the API endpoints to ensure they return the correct responses.
- Simulating real-world scenarios where a client application interacts with the API.

---

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

---

### 2. Develop the Application

* ./restapi-with-db/server.js

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
app.get("/api/customers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ GET a single product by ID ------------------------
app.get("/api/customers/:id", async (req, res) => {
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
app.post("/api/customers", async (req, res) => {
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
app.put("/api/customers/:id", async (req, res) => {
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
app.delete("/api/customers/:id", async (req, res) => {
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

---

### 3. Write and Execute Integration Tests
To test the provided REST API:
1. **Start the Express server** with a test database connection.
2. **Use SuperTest** to make HTTP requests to API endpoints.
3. **Check database changes** after performing operations.
4. **Validate HTTP responses** and error handling.

**Required Dependencies**

- **Jest**: Test framework.
- **SuperTest**: Makes HTTP requests to test API endpoints.
- **PostgreSQL Test Database (dsstestdb)**: Ensures tests do not modify production data.

**Test File Structure**
- `./restapi-with-db/server.js` → Main Express server with PostgreSQL connection.
- `./restapi-with-db/server.test.js` → Integration tests for API endpoints.

**API Endpoints to Test**
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


**Install Dependencies**
Run the following command to install the required packages:

    npm install --save-dev jest supertest pg

**Implement Integration Tests**

* ./restapi-with-db/server.test.js

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
    const response = await request(app).post("/api/customers")
      .send({ name: "Laptop", price: 999.99 });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Laptop");
    expect(Number(response.body.price)).toBe(999.99);

    productId = response.body.id;
  });

  // Test GET /api/products - Fetch all products
  it("should retrieve all products", async () => {
    const response = await request(app).get("/api/customers");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test GET /api/products/:id - Fetch a single product
  it("should retrieve a product by ID", async () => {
    const response = await request(app).get(`/api/customers/${productId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(productId);
    expect(response.body.name).toBe("Laptop");
  });

  // Test PUT /api/products/:id - Update a product
  it("should update a product", async () => {
    const response = await request(app)
      .put(`/api/customers/${productId}`)
      .send({ name: "Gaming Laptop", price: 4000 });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Gaming Laptop");
    expect(Number(response.body.price)).toBe(4000);
  });

  // Test DELETE /api/products/:id - Remove a product
  it("should delete a product", async () => {
    const response = await request(app).delete(`/api/customers/${productId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Product deleted" });
  });
});

```

* Execute the tests using:

>npm run test:coverage



### 4. Extending the Scenario: Service-Based Testing

To apply real-world integration testing:

1. Initialize a new project including a separate service
  - A simple **frontend application** (or another microservice) consumes the REST API.
  - This service retrieves products and allows modifications.

* ./restapi-with-db/client-service.js

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

* ./restapi-with-db/client.service.test.js

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





## 7. Role of Mocking in Testing


**What is Mocking?**

Mocking is the process of simulating fake implementations of modules,
functions, or dependencies to test components in isolation.
- **Avoid dependency on external systems** (e.g., databases, APIs).
- **Increase test speed and reliability** by replacing slow operations.
- **Control test scenarios** by returning predefined responses.

**Why Mock a Database?**

When testing a Node.js module that interacts with a database:
- A real database connection may introduce **instability** due to network issues.
- The database may **not always have the expected test data**.
- Setting up and tearing down a test database can be **time-consuming**.

**By mocking the database, business logic is tested independently of the database.**

---

**Jest Mock Example for PostgreSQL Pool**

* /mocking/server.js

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
app.get("/api/customers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ------------------------ GET a single product by ID ------------------------
app.get("/api/customers/:id", async (req, res) => {
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
app.post("/api/customers", async (req, res) => {
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
app.put("/api/customers/:id", async (req, res) => {
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
app.delete("/api/customers/:id", async (req, res) => {
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
app.get("/api/customers/validated-price/:id", async (req, res) => {
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
module.exports = { app };

```


* ./mocking/server.test.js
  
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
    jest.clearAllMocks(); // Resets all mock calls before each test. Ensures that old mock calls do not interfere with new ones.
  });

  afterAll(async () => {
    await mockPoolInstance.end(); // Ensure mock pool is closed
  });

  let productId = 1;

  // ------------------------ GET all products ------------------------
  // 🟢 Test: Retrieve all products
  it("should retrieve all products", async () => {
    mockPoolInstance.query.mockResolvedValueOnce({
      // mockPoolInstance.query: simulates the query method  of a database connection (mockPoolInstance) (runs fake query)
      // mockResolvedValueOnce: identifies (determines) the returning value of the fake query
      rows: [{ id: 1, name: "Laptop", price: 999.99 }],
    });

    const response = await request(app).get("/api/customers");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);

    // Check if the mock query was called correctly
    // Ensures the SQL syntax is correct
    // Validates that the correct parameters are used
    // Helps catch unexpected behavior in the database interaction
    expect(mockPoolInstance.query).toHaveBeenCalledWith(
      "SELECT * FROM products ORDER BY id ASC"
    );
  });

  // ------------------------ GET a single product by ID ------------------------
  // 🟢 Test: Retrieve a product by ID
  it("should retrieve a product by ID", async () => {
    const mockProduct = { id: 1, name: "Laptop", price: 999.99 };

    mockPoolInstance.query.mockResolvedValueOnce({ rows: [mockProduct] });

    const response = await request(app).get(`/api/customers/${productId}`);

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
      .post("/api/customers")
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

    const response = await request(app).delete(`/api/customers/${productId}`);

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

    const response = await request(app).get(`/api/customers/validated-price/${productId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ validatedPrice: "1152.00" }); // (1200 - 20%) + 20%
    expect(mockPoolInstance.query).toHaveBeenCalledWith(
      "SELECT price FROM products WHERE id = $1",
      [productId]
    );
  });


});

```


---
## **Hands-on Exercise 4**

Extend Exercise 3 to include PostgreSQL mocking in tests.

---











