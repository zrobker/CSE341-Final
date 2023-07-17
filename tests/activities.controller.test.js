const ActivitiesController = require("../controllers/activities.controller");
const { ActivitiesModel } = require("../models/Activities");

describe("Activities controller", () => {
  test("createOne", async () => {
    const req = {
      body: {
        name: "Basketball",
        min: "10",
        max: "30",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    jest
      .spyOn(ActivitiesModel, "create")
      .mockResolvedValue({ _id: "activity-id" });

    await ActivitiesController.createOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ _id: "activity-id" });
  });
  test("should retrieve all Activities and return them in the response", async () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };

    const Activities = [{ activity: "activity 1" }, { activity: "activity 2" }];

    jest.spyOn(ActivitiesModel, "find").mockResolvedValue(Activities);

    await ActivitiesController.getAll(req, res);

    expect(res.send).toHaveBeenCalledWith(Activities);
  });
  test("deleteOne", async () => {
    const activityId = "123456";
    const activity = { _id: activityId, name: "Test activity" };
    const req = { params: { id: activityId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(ActivitiesModel, "findById").mockResolvedValue(activity);
    jest.spyOn(ActivitiesModel, "deleteOne").mockResolvedValue({});

    await ActivitiesController.deleteOne(req, res);

    expect(ActivitiesModel.findById).toHaveBeenCalledWith(activityId);
    expect(ActivitiesModel.deleteOne).toHaveBeenCalledWith({
      _id: activityId,
    });
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({
      message: "Activity deleted successfully",
    });
  });
});
