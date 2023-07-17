const AddressesController = require("../controllers/addresses.controller");
const { AddressesModel } = require("../models/Addresses");

describe("Addresses controller", () => {
  test("createOne", async () => {
    const req = {
      body: {
        address: "This is a dummy address",
        createdAt: "2023-06-23T10:49:24.000Z",
        updatedAt: "2023-06-23T10:49:24.000Z",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    jest
      .spyOn(AddressesModel, "create")
      .mockResolvedValue({ _id: "address-id" });

    await AddressesController.createOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ _id: "address-id" });
  });
  test("should retrieve all Addresses and return them in the response", async () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };

    const Addresses = [{ address: "address 1" }, { address: "address 2" }];

    jest.spyOn(AddressesModel, "find").mockResolvedValue(Addresses);

    await AddressesController.getAll(req, res);

    expect(res.send).toHaveBeenCalledWith(Addresses);
  });
  test("deleteOne", async () => {
    const addressId = "123456";
    const address = { _id: addressId, name: "Test address" };
    const req = { params: { id: addressId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(AddressesModel, "findById").mockResolvedValue(address);
    jest.spyOn(AddressesModel, "deleteOne").mockResolvedValue({});

    await AddressesController.deleteOne(req, res);

    expect(AddressesModel.findById).toHaveBeenCalledWith(addressId);
    expect(AddressesModel.deleteOne).toHaveBeenCalledWith({ _id: addressId });
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({
      message: "Addresses deleted successfully",
    });
  });
});
