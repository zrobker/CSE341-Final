const request = require("supertest");
const app = require("../server");
const DB = require("../models/db_connection");
var userId = "";
var eventId = "";
var addressId = "";
var activityId = "";

beforeAll(() => {
  DB.initDb(() => {
    console.log("⚡️[server]: Server is running at http://localhost:3000");
  });
});
afterAll(() => {
  DB.closeDb();
});
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
  const newAddress = {
    address: "This is a new address",
    createdAt: "2023-06-23T10:49:24.000Z",
    updatedAt: "2023-06-23T10:49:24.000Z",
  };
  const newActivity = {
    name: "Basketball",
    min: "10",
    max: "30",
  };

  test("Test POST localhost:3000/users", async () => {
    const response = await request(app).post("/users").send(newUser);
    userId = response.body._id;
    expect(response.statusCode).toBe(200);
  });
  test("Test POST localhost:3000/events", async () => {
    const response = await request(app).post("/events").send(newEvent);
    eventId = response.body._id;
    expect(response.statusCode).toBe(200);
  });
  test("Test POST localhost:3000/addresses", async () => {
    const response = await request(app).post("/addresses").send(newAddress);
    addressId = response.body._id;
    expect(response.statusCode).toBe(200);
  });
  test("Test POST localhost:3000/activities", async () => {
    const response = await request(app).post("/activities").send(newActivity);
    activityId = response.body._id;
    expect(response.statusCode).toBe(200);
  });
});

describe("GET", () => {
  test("Test GET localhost:3000/users", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
  });
  test("Test GET localhost:3000/events", async () => {
    const response = await request(app).get("/events");
    expect(response.statusCode).toBe(200);
  });
  test("Test GET localhost:3000/events/:id", async () => {
    const response = await request(app).get(`/events/${eventId}`);
    expect(response.statusCode).toBe(200);
  });
  test("Test GET localhost:3000/users/:id", async () => {
    const response = await request(app).get(`/users/${userId}`);
    expect(response.statusCode).toBe(200);
  });
  test("Test GET localhost:3000/events/createdBy/:id", async () => {
    const response = await request(app).get(`/events/createdBy/${userId}`);
    expect(response.statusCode).toBe(200);
  });
  test("Test GET localhost:3000/addresses", async () => {
    const response = await request(app).get(`/addresses`);
    expect(response.statusCode).toBe(200);
  });
  test("Test GET localhost:3000/registrations", async () => {
    const response = await request(app).get(`/activities`);
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
    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updateUser);
    expect(response.statusCode).toBe(200);
  });
  test("Test PUT http://localhost:3000/events/:id", async () => {
    const response = await request(app)
      .put(`/events/${eventId}`)
      .send(updateEvent);
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE", () => {
  test("Test DELETE http://localhost:3000/users/:id", async () => {
    const response = await request(app).delete(`/users/${userId}`);
    expect(response.statusCode).toBe(202);
  });
  test("Test DELETE http://localhost:3000/events/:id", async () => {
    const response = await request(app).delete(`/events/${eventId}`);
    expect(response.statusCode).toBe(202);
  });
  test("Test DELETE http://localhost:3000/addresses/:id", async () => {
    const response = await request(app).delete(`/addresses/${addressId}`);
    expect(response.statusCode).toBe(202);
  });
  test("Test DELETE http://localhost:3000/activities/:id", async () => {
    const response = await request(app).delete(`/activities/${activityId}`);
    expect(response.statusCode).toBe(202);
  });
});
