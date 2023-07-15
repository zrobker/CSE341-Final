const EventsController = require("../controllers/events.controller");
const { EventModel } = require("../models/Event");

describe("Events controller", () => {
  test("getOne", async () => {
    const eventId = "123456";
    const event = { _id: eventId, name: "Test Event" };
    const req = { params: { id: eventId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(EventModel, "findById").mockResolvedValue(event);

    await EventsController.getOne(req, res);

    expect(EventModel.findById).toHaveBeenCalledWith(eventId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(event);
  });
  test("createOne", async () => {
    const req = {
      body: {
        name: "Church Basketball",
        local: "Church",
        createdBy: "6487c6cdfac6d6f908771e7f",
        createdAt: "2023-06-23T10:49:24.000Z",
        updatedAt: "2023-06-23T10:49:24.000Z",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    jest.spyOn(EventModel, "create").mockResolvedValue({ _id: "event-id" });

    await EventsController.createOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ _id: "event-id" });
  });
  test("should retrieve all events and return them in the response", async () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };

    const events = [
      { name: "Event 1", local: "Location 1" },
      { name: "Event 2", local: "Location 2" },
    ];

    jest.spyOn(EventModel, "find").mockResolvedValue(events);

    await EventsController.getAll(req, res);

    expect(res.send).toHaveBeenCalledWith(events);
  });
  test("deleteOne", async () => {
    const eventId = "123456";
    const event = { _id: eventId, name: "Test Event" };
    const req = { params: { id: eventId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(EventModel, "findById").mockResolvedValue(event);
    jest.spyOn(EventModel, "deleteOne").mockResolvedValue({});

    await EventsController.deleteOne(req, res);

    expect(EventModel.findById).toHaveBeenCalledWith(eventId);
    expect(EventModel.deleteOne).toHaveBeenCalledWith({ _id: eventId });
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({
      message: "Event deleted successfully",
    });
  });
  test("updateEvent", async () => {
    const eventId = "event1";
    const updatedEvent = {
      _id: eventId,
      name: "Updated Event",
      local: "Updated Location",
      confirmed: true,
      invites: ["user1", "user2"],
      updatedAt: new Date(),
    };
    const req = { params: { id: eventId }, body: updatedEvent };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    EventModel.findById = jest.fn().mockResolvedValue(updatedEvent);
    updatedEvent.save = jest.fn().mockResolvedValue();

    await EventsController.updateEvent(req, res);

    expect(EventModel.findById).toHaveBeenCalledWith(eventId);
    expect(updatedEvent.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(updatedEvent);
  });
  test("getCreatedBy", async () => {
    const userId = "123456";
    const events = [
      { _id: "event1", name: "Event 1", createdBy: userId },
      { _id: "event2", name: "Event 2", createdBy: userId },
    ];
    const req = { params: { id: userId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(EventModel, "find").mockResolvedValue(events);

    await EventsController.getCreatedBy(req, res);

    expect(EventModel.find).toHaveBeenCalledWith({ createdBy: userId });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(events);
  });
});
