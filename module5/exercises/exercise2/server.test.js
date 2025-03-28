const request = require("supertest");
const app = require("./server"); // Adjust the path based on your project structure

describe("Bank Accounts API", () => {
  let testAccount = {
    accountNumber: "12345",
    name: "Alice Doe",
    balance: 1000,
    currency: "USD"
  };

  // -------------------- Test GET all accounts --------------------
  it("should retrieve all accounts (empty at first)", async () => {
    const response = await request(app).get("/api/accounts");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // -------------------- Test POST - Create a new account --------------------
  it("should create a new account", async () => {
    const response = await request(app)
      .post("/api/accounts")
      .send(testAccount)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(testAccount);
    expect(response.body).toHaveProperty("createdAt");
  });

  it("should return 400 when required fields are missing", async () => {
    const response = await request(app)
      .post("/api/accounts")
      .send({ name: "Test User" }) // Missing required fields
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid input" });
  });

  // -------------------- Test GET account by accountNumber --------------------
  it("should retrieve an account by accountNumber", async () => {
    await request(app).post("/api/accounts").send(testAccount);

    const response = await request(app).get(`/api/accounts/${testAccount.accountNumber}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(testAccount);
  });

  it("should return 404 if account does not exist", async () => {
    const response = await request(app).get("/api/accounts/99999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Account not found" });
  });

  // -------------------- Test PUT - Update an account --------------------
  it("should update an existing account", async () => {
    await request(app).post("/api/accounts").send(testAccount);

    const updatedData = { name: "Alice Smith", balance: 1500 };
    const response = await request(app).put(`/api/accounts/${testAccount.accountNumber}`).send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.balance).toBe(updatedData.balance);
  });

  it("should return 404 when updating a non-existing account", async () => {
    const response = await request(app).put("/api/accounts/99999").send({ name: "New Name" });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Account not found" });
  });

  // -------------------- Test DELETE - Remove an account --------------------
  it("should delete an existing account", async () => {
    await request(app).post("/api/accounts").send(testAccount);

    const response = await request(app).delete(`/api/accounts/${testAccount.accountNumber}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Account deleted" });
  });

  it("should return 404 when deleting a non-existing account", async () => {
    const response = await request(app).delete("/api/accounts/99999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Account not found" });
  });

  // -------------------- Test POST - Deposit money --------------------
  it("should deposit money into an account", async () => {
    await request(app).post("/api/accounts").send(testAccount);

    const response = await request(app)
      .post(`/api/accounts/${testAccount.accountNumber}/deposit`)
      .send({ amount: 500 });

    expect(response.status).toBe(200);
    expect(response.body.balance).toBe(1500);
  });

  it("should return 400 for invalid deposit amount", async () => {
    await request(app).post("/api/accounts").send(testAccount);

    const response = await request(app)
      .post(`/api/accounts/${testAccount.accountNumber}/deposit`)
      .send({ amount: -100 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid deposit amount" });
  });

  // -------------------- Test POST - Withdraw money --------------------
  it("should withdraw money from an account", async () => {
    await request(app).post("/api/accounts").send(testAccount);

    const response = await request(app)
      .post(`/api/accounts/${testAccount.accountNumber}/withdraw`)
      .send({ amount: 500 });

    expect(response.status).toBe(200);
    //expect(response.body.balance).toBe(500);
  });

  it("should return 400 for insufficient funds", async () => {
    await request(app).post("/api/accounts").send(testAccount);

    const response = await request(app)
      .post(`/api/accounts/${testAccount.accountNumber}/withdraw`)
      .send({ amount: 5000 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Insufficient funds" });
  });

  it("should return 400 for invalid withdrawal amount", async () => {
    await request(app).post("/api/accounts").send(testAccount);

    const response = await request(app)
      .post(`/api/accounts/${testAccount.accountNumber}/withdraw`)
      .send({ amount: -50 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid withdrawal amount" });
  });

});
