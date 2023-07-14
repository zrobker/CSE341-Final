const request = require("supertest");
const app = require("../server");

describe("Server", () => {
  test("Test that the server is up", async () => {
    // Make a request to the server
    const response = await request(app).get("/test");
    expect(response.text).toBe("The server is working");
  });
});
