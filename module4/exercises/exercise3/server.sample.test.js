const request = require("supertest");
const app = require("../../../../../src/st/module4/exercises/exercise3/server");
const { accounts } = require("../../../../../src/st/module4/exercises/exercise3/server");

describe("Bank Accounts API", () => {
  const testAccount = {
    accountNumber: 12345,
    name: "Alice Doe",
    balance: 1000,
    currency: "USD",
  };

  // Reset the shared in-memory store before every test so each test
  // starts from a clean slate and cannot be affected by a previous one.
  beforeEach(() => {
    accounts.length = 0;
  });

  // ─────────────────────────────────────────────
  // GET /api/accounts
  // ─────────────────────────────────────────────
  describe("GET /api/accounts", () => {
    it("getAllAccounts_whenNoAccountsExist_returnsEmptyArray", async () => {
      const response = await request(app).get("/api/accounts");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("getAllAccounts_afterCreatingAccount_returnsArrayWithAccount", async () => {
      await request(app).post("/api/accounts").send(testAccount);

      const response = await request(app).get("/api/accounts");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toMatchObject(testAccount);
    });
  });

  
});