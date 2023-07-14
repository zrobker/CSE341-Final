const request = require("supertest");
const { app } = require("../server");
const UserModel = require("../models/User").UserModel;
const {
  getAll,
  createOne,
  updateUser,
  getOne,
  deleteOne,
} = require("./users.controller");

describe("Users Controller", () => {
  // Mock UserModel.find method
  UserModel.find = jest.fn().mockResolvedValue(["user1", "user2"]);

  test("getAll should return all users", async () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };

    await getAll(req, res);

    expect(UserModel.find).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(["user1", "user2"]);
  });

  test("createOne should create a new user", async () => {
    const req = {
      body: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
        phone_number: "1234567890",
      },
    };
    const res = {
      send: jest.fn(),
    };

    UserModel.create = jest.fn().mockResolvedValue({
      _id: "user123",
      ...req.body,
      createdAt: new Date(),
    });

    await createOne(req, res);

    expect(UserModel.create).toHaveBeenCalledTimes(1);
    expect(UserModel.create).toHaveBeenCalledWith(req.body);
    expect(res.send).toHaveBeenCalled();
  });

  test("updateUser should update an existing user", async () => {
    const userId = "user123";
    const req = {
      params: { id: userId },
      body: { name: "Updated Name" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    UserModel.findById = jest.fn().mockResolvedValue({
      _id: userId,
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      phone_number: "1234567890",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    UserModel.prototype.save = jest.fn().mockResolvedValue();

    await updateUser(req, res);

    expect(UserModel.findById).toHaveBeenCalledTimes(1);
    expect(UserModel.findById).toHaveBeenCalledWith(userId);
    expect(UserModel.prototype.save).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalled();
  });

  test("getOne should return a specific user", async () => {
    const userId = "user123";
    const req = {
      params: { id: userId },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    UserModel.findById = jest.fn().mockResolvedValue({
      _id: userId,
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      phone_number: "1234567890",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await getOne(req, res);

    expect(UserModel.findById).toHaveBeenCalledTimes(1);
    expect(UserModel.findById).toHaveBeenCalledWith(userId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test("deleteOne should delete a specific user", async () => {
    const userId = "user123";
    const req = {
      params: { id: userId },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    UserModel.findById = jest.fn().mockResolvedValue({
      _id: userId,
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      phone_number: "1234567890",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    UserModel.deleteOne = jest.fn().mockResolvedValue();

    await deleteOne(req, res);

    expect(UserModel.findById).toHaveBeenCalledTimes(1);
    expect(UserModel.findById).toHaveBeenCalledWith(userId);
    expect(UserModel.deleteOne).toHaveBeenCalledTimes(1);
    expect(UserModel.deleteOne).toHaveBeenCalledWith({ _id: userId });
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalled();
  });
});
