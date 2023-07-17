const RegistrationsController = require("../controllers/registrations.controller");
const { RegistrationsModel } = require("../models/Registrations");

describe("Regristrations controller", () => {
  test("createOne", async () => {
    const req = {
      body: {
        event: "64b2ea81b84a9b37f4358cfe",
        user: "64b2ea5bb84a9b37f4358cfb",
        createdAt: "2023-06-23T10:49:24.000Z",
        updatedAt: "2023-06-23T10:49:24.000Z",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    jest
      .spyOn(RegistrationsModel, "create")
      .mockResolvedValue({ _id: "registration-id" });

    await RegistrationsController.createOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ _id: "registration-id" });
  });
  test("should retrieve all Regristrations and return them in the response", async () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };

    const Regristrations = [
      { registration: "registration 1" },
      { registration: "registration 2" },
    ];

    jest.spyOn(RegistrationsModel, "find").mockResolvedValue(Regristrations);

    await RegistrationsController.getAll(req, res);

    expect(res.send).toHaveBeenCalledWith(Regristrations);
  });
  test("deleteOne", async () => {
    const registrationId = "123456";
    const registration = { _id: registrationId, name: "Test registration" };
    const req = { params: { id: registrationId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(RegistrationsModel, "findById").mockResolvedValue(registration);
    jest.spyOn(RegistrationsModel, "deleteOne").mockResolvedValue({});

    await RegistrationsController.deleteOne(req, res);

    expect(RegistrationsModel.findById).toHaveBeenCalledWith(registrationId);
    expect(RegistrationsModel.deleteOne).toHaveBeenCalledWith({
      _id: registrationId,
    });
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({
      message: "Registration deleted successfully",
    });
  });
});
