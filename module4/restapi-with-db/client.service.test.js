const request = require("supertest");
const app = require("../../../../src/st/module4/restapi-with-db/client-service"); // Import the Express app

describe("Client Service Integration Tests", () => {
  // Test fetching products from the main API
  it("should fetch products from the API", async () => {
    const response = await request(app).get("/products");
    //console.log(JSON.stringify(response));
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});