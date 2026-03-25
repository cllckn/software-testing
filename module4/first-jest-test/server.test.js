// Import supertest for making HTTP requests and the Express app
const request = require("supertest");
const app = require("../../../../src/st/module4/first-jest-test/server");

// Test suite for the GET / endpoint
describe("GET / endpoint", () => {

    // Behavior: when the root endpoint is requested, it should return a welcome message
    it("getRootEndpoint_whenRequested_returnsWelcomeMessage", async () => {

        // Send GET request to the root endpoint
        const response = await request(app).get("/");

        // Verify status code
        expect(response.statusCode).toBe(200);

        // Verify response body
        expect(response.body).toEqual({ message: "Hello, world!" });
    });

});


// Test suite for the POST /greet endpoint
describe("POST /greet endpoint", () => {

    // Behavior: when a valid name is provided, the API should return a greeting
    it("greetEndpoint_whenValidNameProvided_returnsGreetingMessage", async () => {

        const response = await request(app)
          .post("/greet")
          .send({ name: "John" });

        // Verify success response
        expect(response.statusCode).toBe(201);

        // Verify greeting message
        expect(response.body).toEqual({ message: "Hello, John!" });
    });


    // Behavior: when the name is missing, the API should return a validation error
    it("greetEndpoint_whenNameMissing_returnsBadRequestError", async () => {

        const response = await request(app)
          .post("/greet")
          .send({});

        // Verify 400 Bad Request status
        expect(response.statusCode).toBe(400);

        // Verify error message
        expect(response.body).toEqual({ error: "Name is required" });
    });

});