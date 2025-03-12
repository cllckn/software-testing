# Module 4: Testing REST APIs


## Part 1: Fundamentals Of Web Services


### Service-Oriented Architecture (SOA)

**Service-Oriented Architecture (SOA)** is a design pattern where software components (services) provide functionality to other components over a network. Each service is a discrete unit of functionality, which can be independently developed, deployed, and maintained. Services communicate with each other using well-defined interfaces and protocols, typically over HTTP or messaging queues.

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

* Service A acts as a client that sends a request to Service B.
* Service B processes the request and sends back a response to Service A.
* Communication between the services can be done using HTTP (e.g.RESTful) or a messaging queue (e.g. Apache Kafka).

#### API Communication Protocols

##### **RESTful APIs**
- Based on **REST (Representational State Transfer)** principles.
- Uses standard **HTTP methods** (GET, POST, PUT, DELETE).
- Data format: **JSON**, sometimes XML.
- Stateless, lightweight, and widely used for web applications.

##### **SOAP (Simple Object Access Protocol)**
- A **protocol** for exchanging structured information in web services.
- Uses **XML** for message format.
- Operates over multiple transport protocols (HTTP, SMTP, etc.).
- Supports **WS-Security** for enterprise-level security.

##### **XML-RPC (XML Remote Procedure Call)**
- A protocol that allows remote function execution using **XML over HTTP**.
- Simpler than SOAP but less flexible than REST.
- Mainly used for legacy systems requiring XML-based communication.

##### **gRPC (Google Remote Procedure Call)**
- A **high-performance** framework developed by Google.
- Uses **Protocol Buffers (protobufs)** for efficient, compact data serialization.
- Supports **bidirectional streaming** and **multiplexing**.
- Ideal for **microservices** and **high-speed communication** across distributed systems.



### **1. What is a RESTful API?**


A RESTful API (Representational State Transfer API) is a way to allow different software applications
to communicate with each other over the internet using standard HTTP methods.
Here are some key points about RESTful APIs:

#### Key Characteristics

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

3. **JSON or XML**: Data is typically exchanged in JSON or XML format, with JSON being more common due to its simplicity and ease of use.

4. **Stateless**: The server does not store any client context between requests.

#### Example Endpoints

- **GET /users**: Retrieve a list of users.
- **POST /users**: Add a new user.
- **GET /users/{id}**: Retrieve a specific user by ID.
- **PUT /users/{id}**: Update a specific user by ID.
- **DELETE /users/{id}**: Delete a specific user by ID.
- **GET /heating-system/status**: Retrieve the current status of the heating system.
- **POST /heating-system/on**: Turn on the heating system.
- **POST /heating-system/off**: Turn off the heating system.
- **PUT /heating-system/temperature**: Set the desired temperature of the heating system.

#### HTTP Status Codes
HTTP status codes indicate the outcome of an API request. Here are some common status codes and their meanings:

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

#### 1. **JSON (JavaScript Object Notation)**
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
```xml
<user>
  <id>1</id>
  <name>John Doe</name>
  <email>john.doe@example.com</email>
</user>
```

## Part 2: Developing RESTful Endpoints Using NodeJS

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

### Node.js & npm Installation

[Take a look at this web address](https://github.com/cllckn/software-testing/blob/main/module1/setting-up-the-development-environment.md) -> NodeJS

* Initialize a new Node.js project

[Take a look at this web address](https://github.com/cllckn/software-testing/blob/main/module1/setting-up-the-development-environment.md) -> NodeJS



### Developing RESTful APIs

* /part2/rest-api/server.js

```javascript
const express = require("express");
const app = express();

app.use(express.json()); // Parse JSON requests

// In-memory database: JSON array for products
let products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Phone", price: 499.99 },
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
  res.status(201).json(newProduct); // Respond with the added product
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server on port 3000
```

### Endpoints of the developed API

        GET http://localhost:3000/api/products

        GET http://localhost:3000/api/products/1

        POST http://localhost:3000/api/products
        Content-Type: application/json
        {
        "name": "Tablet",
        "price": 299.99
        }

        PUT http://localhost:3000/api/products/2
        Content-Type: application/json
        {
        "name": "Smartphone",
        "price": 550.00
        }
    
        DELETE http://localhost:3000/api/products/1


### Manual Testing of REST APIs using cURL and IntelliJ HTTP Client

#### cURL

    curl --version
    if not installed -> Download cURL from: https://curl.se/windows/


```sh
# Retrieves a list of all products from the database.

curl -X GET http://localhost:3000/api/products

---

# Fetches details of a specific product using its ID.

curl -X GET http://localhost:3000/api/products/1

---

# Adds a new product to the database. The request body must contain name and price in JSON format.

curl -X POST http://localhost:3000/api/products \
     -H "Content-Type: application/json" \
     -d '{"name": "Tablet", "price": 299.99}'


---

# Updates the details of an existing product using its ID. Any missing fields will retain their previous values.

curl -X PUT http://localhost:3000/api/products/1 \
     -H "Content-Type: application/json" \
     -d '{"name": "Updated Laptop", "price": 1099.99}'

---

# Deletes a product from the database by specifying its ID.

curl -X DELETE http://localhost:3000/api/products/1

```

#### Intellij HTTP Client 

* /test/module4/part2/rest-api/rest-api-for-products-v1.http
```shell
# curl -X GET http://localhost:3000/api/products
GET http://localhost:3000/api/products

###

# curl -X GET http://localhost:3000/api/products
GET http://localhost:3000/api/products/1

###
# curl -X POST http://localhost:3000/api/products
#     -H "Content-Type: application/json"
#     -d '{"name": "Tablet", "price": 299.99}'
POST http://localhost:3000/api/products
Content-Type: application/json

{"name": "SSD", "price": 500}

###
# curl -X PUT http://localhost:3000/api/products/1
#     -H "Content-Type: application/json"
#     -d '{"name": "Updated Laptop", "price": 1099.99}'
PUT http://localhost:3000/api/products/1
Content-Type: application/json

{"name": "Updated Laptop", "price": 1099.99}

###

# curl -X DELETE http://localhost:3000/api/products/1
DELETE http://localhost:3000/api/products/1
```





---
## **Hands-on Exercise1**

---







### Convert REST API to web app

* /part2/web-app/server.js

```javascript
app.use(express.static(path.join(__dirname, 'public'))); // Middleware to serve static files (HTML, CSS, JS) from the 'public' folder

```

### Integrate JQuery - list all products

* /part2/web-app/public/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Management</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; }
        table { width: 50%; margin: auto; border-collapse: collapse; }
        th, td { border: 1px solid black; padding: 10px; }
        .error { color: red; display: none; }
    </style>
</head>
<body>
    <h2>Product List</h2>
    <!-- Table to display products -->
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="product-list"></tbody> <!-- Products will be dynamically inserted here -->
    </table>

    <h2>Add Product</h2>
    <!-- Form to add a new product -->
    <form id="add-product-form">
        <input type="text" id="name" placeholder="Product Name" required>
        <input type="number" id="price" placeholder="Price" required>
        <button type="submit">Add Product</button>
    </form>
    <p class="error" id="error-msg">Invalid input</p> <!-- Error message for validation -->

    <script>
        $(document).ready(function(){
            // Function to load products asynchronously using AJAX (GET request)
            function loadProducts() {
                $.get("/api/products", function(products){
                    $("#product-list").empty(); // Clear the existing list
                    products.forEach(product => {
                        $("#product-list").append(`
                            <tr>
                                <td>${product.id}</td>
                                <td>${product.name}</td>
                                <td>${product.price}</td>
                                <td>
                                    <button class="delete-btn" data-id="${product.id}">Delete</button>
                                </td>
                            </tr>
                        `);
                    });
                });
            }

            // Handle form submission to add a new product (AJAX POST request)
            $("#add-product-form").submit(function(event){
                event.preventDefault(); // Prevent default form submission
                var name = $("#name").val().trim(); // Get product name
                var price = parseFloat($("#price").val().trim()); // Get product price

                // Validate input: Ensure name is not empty and price is valid
                if (!name || isNaN(price) || price <= 0) {
                    $("#error-msg").fadeIn().delay(5000).fadeOut();
                    return;
                }

                // Asynchronous request to add a product
                $.post({
                    url: "/api/products",
                    contentType: "application/json", // Ensure JSON is sent correctly
                    data: JSON.stringify({ name, price }),
                    success: function(response) {
                        loadProducts(); // Refresh product list after adding
                        console.log("Product added:", response);
                        $("#name").val(""); // Clear input fields
                        $("#price").val("");
                    },
                    error: function(xhr) {
                        console.error("Error:", xhr.responseText);
                    }
                });
            });

            // Handle product deletion (AJAX DELETE request)
            $("#product-list").on("click", ".delete-btn", function() {
                var id = $(this).data("id");
                // Perform the deletion logic here
                $.ajax({
                    url: `/api/products/${id}`,
                    type: "DELETE",
                    success: function() {
                        loadProducts();
                    }
                });
            });

            loadProducts(); // Initial load of products (asynchronous)
        });
    </script>
</body>
</html>

```


### Add logging module for the server, using morgan and winston libraries

```javascript
const morgan = require('morgan');
const winston = require('winston');


// Log requests in Apache-style format
const logger = winston.createLogger({
    transports: [new winston.transports.File({ filename: 'logs/requests.log' })]
});

app.use(morgan('combined', { stream: { write: message => logger.info(message) } }));

```




### Routers and Routes in Express.js

A **route** in Express.js defines an endpoint that a client can access via **HTTP methods**
(GET, POST, PUT, DELETE, etc.). Each route consists of:

1. **A URL pattern** (e.g., `/api/customers/:id`)
2. **An HTTP method** (GET, POST, etc.)
3. **A callback function** to handle the request

Example of a simple route in Express.js:
```javascript
app.get("/api/customers", (req, res) => {
    res.json({ message: "List of customers" });
});
```
An **Express Router** helps organize routes by grouping them into separate files. 
This makes the code modular, manageable, and scalable.

Benefits of Using a Router
* Code organization – Keeps server.js clean and structured.
* Reusability – Routes can be modular and reusable across different parts of the application.
* Easier maintenance – Adding new routes does not clutter the main server file.

* /part2/router/server.js
```javascript
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products"); // Import product routes

const app = express();

app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for cross-origin requests

// Use product routes
app.use("/api/products", productRoutes);

// Start server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

```

* /part2/router/router/product.js

```javascript
const express = require("express");
const router = express.Router();

// In-memory database: Array to store product data
let products = [
    { id: 1, name: "Laptop", price: 999.99 },
    { id: 2, name: "Phone", price: 499.99 },
];

// GET all products
router.get("/", (req, res) => {
    res.json(products);
});

// GET a single product by ID
router.get("/:id", (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
});

// POST - Add a new product
router.post("/", (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) return res.status(400).json({ error: "Invalid input" });

    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT - Update a product
router.put("/:id", (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: "Product not found" });

    const { name, price } = req.body;
    product.name = name || product.name;
    product.price = price || product.price;
    res.json(product);
});

// DELETE - Remove a product
router.delete("/:id", (req, res) => {
    products = products.filter((p) => p.id !== parseInt(req.params.id));
    res.json({ message: "Product deleted" });
});

module.exports = router;
```

#### Hands-on Exercise 2: Extend the server by defining routers.

* Integrate the customer REST API from [Hands-on Exercise 6](https://github.com/cllckn/decision-support-systems/blob/main/module3/exercises/exercise6/server.js)
  into [this app](https://github.com/cllckn/decision-support-systems/tree/main/module3/part5), and form separate router files for customer and product routes.
* Once completed, test all API endpoints (both products and customers) using IntelliJ HTTP client to verify their functionality.
* [At Home] Try using Postman for testing APIs, as it provides an intuitive interface for making HTTP requests and analyzing responses.



### Deploy app to a server

    Intellij -> Tools -> Deployment -> Configuration 
    Provide protocol -> sftp, socket address -> 192.2.2.1:22, credentials ->username:password
    Right Click -> Deploy

### Running Node.js apps as service using pm2
PM2 is a popular, open-source, production-grade process manager for Node.js applications. It helps you manage and keep your 
Node.js applications running in the background, even after system reboots or crashes.
```shell
npm install pm2@latest -g

pm2 start server.js

pm2 status

pm2 monit

pm2 restart id/name

pm2 stop id/name

pm2 delete id/name

pm2 save # Freeze a process list on reboot via

pm2 startup  #This command will generate a script that you can copy and paste into your terminal to enable PM2 to start on boot.
 

pm2 unstartup systemd  # Remove init script
```

#### Starting the same node app as two separate instances with different ports using PM2.


* /part2/pm2/server.js

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
PORT=5000 pm2 start server.js --name "my-server5" -f
PORT=4000 pm2 start server.js --name "my-server4" -f

# for windows
$env:PORT=5000; pm2 start server.js --name "my-server5" -f
$env:PORT=4000; pm2 start server.js --name "my-server4" -f

pm2 status
```


### Define env variable for rest api to switch between testing environments

* /test/module4/part2/pm2/http-client.env.json

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
* /test/module4/part2/pm2/rest-api-v1.http

```shell
# curl -X GET http://localhost:3000/api/products
GET http://localhost:3000
```

* /test/module4/part2/pm2/rest-api-v2.http

```shell
GET {{hosturi}}/
```



####

---
## **Hands-on Exercise3**

---
