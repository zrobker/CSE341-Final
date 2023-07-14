const request = require("supertest");
const app = require("../server");

describe("Server", () => {
  it("should return 'Logged out' when not authenticated", async () => {
    // Make a request to the server
    const response = await request(app).get("/");

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.text).toBe("Logged out");
  });
});

test("Testing Login", async () => {
  // Some Convince this thing I have logged in?
  //
  // Make a request to the server
  const response = await request(app).get("/");

  // Assert the response
  expect(response.status).toBe(200);
  expect(response.text).toBe("Logged out");
});
