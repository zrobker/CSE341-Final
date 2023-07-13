const request = require("supertest");
const baseURL = "http://localhost:3000";
var userId = "";
var eventId = "";

describe("POST", () => {
  const newUser = {
    name: "John Doe",
    password: "123456ABC",
    email: "jonh1234@gmail.com",
    phone_number: "1234556789",
    createdAt: "2023-06-23T10:49:24.000Z",
    updatedAt: "2023-06-23T10:49:24.000Z",
    thumbnail: "1.png",
  };
  const newEvent = {
    name: "Church Basketball",
    local: "Church",
    createdBy: "6487c6cdfac6d6f908771e7f",
    createdAt: "2023-06-23T10:49:24.000Z",
    updatedAt: "2023-06-23T10:49:24.000Z",
  };
  test("Test POST localhost:3000/users", async () => {
    const response = await request(baseURL).post("/users").send(newUser);
    userId = response.body._id;
    expect(response.statusCode).toBe(200);
  });
  test("Test POST localhost:3000/events", async () => {
    const response = await request(baseURL).post("/events").send(newEvent);
    eventId = response.body._id;
    expect(response.statusCode).toBe(200);
  });
});

describe("GET", () => {
  test("Test GET localhost:3000/users", async () => {
    const response = await request(baseURL).get("/users");

    expect(response.statusCode).toBe(200);
  });
  test("Test GET localhost:3000/events", async () => {
    const response = await request(baseURL).get("/events");

    expect(response.statusCode).toBe(200);
  });
  test("Test GET localhost:3000/events/:id", async () => {
    const response = await request(baseURL).get(`/events/${eventId}`);

    expect(response.statusCode).toBe(200);
  });
  test("Test GET localhost:3000/users/:id", async () => {
    const response = await request(baseURL).get(`/users/${userId}`);

    expect(response.statusCode).toBe(200);
  });
  test("Test GET localhost:3000/events/createdBy/:id", async () => {
    const response = await request(baseURL).get(`/events/createdBy/${userId}`);

    expect(response.statusCode).toBe(200);
  });
});

describe("PUT", () => {
  const updateUser = {
    name: "Jane Doe",
  };
  const updateEvent = {
    name: "New Event",
  };
  test("Test PUT http://localhost:3000/users/:id", async () => {
    const response = await request(baseURL)
      .put(`/users/${userId}`)
      .send(updateUser);
    expect(response.statusCode).toBe(204);
  });
  test("Test PUT http://localhost:3000/events/:id", async () => {
    const response = await request(baseURL)
      .put(`/events/${eventId}`)
      .send(updateEvent);
    expect(response.statusCode).toBe(204);
  });
});

describe("DELETE", () => {
  test("Test DELETE http://localhost:3000/users/:id", async () => {
    const response = await request(baseURL).delete(`/users/${userId}`);
    expect(response.statusCode).toBe(202);
  });
  test("Test DELETE http://localhost:3000/events/:id", async () => {
    const response = await request(baseURL).delete(`/events/${eventId}`);
    expect(response.statusCode).toBe(202);
  });
});
