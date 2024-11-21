const restaurantModel = require("../../model/restaurant");
const httpMocks = require("node-mocks-http");
const newRestaurant = require("../mock-data/new-restaurant.json");
const restaurantController = require("../../controllers/restaurant.controller");

restaurantModel.findByIdAndDelete = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("RestaurantController.deleteRestaurant", () => {
  beforeEach(() => {
    req.params.id = 0;
  });

  it("should have a deleteRestaurant function", () => {
    expect(typeof restaurantController.deleteRestaurant).toBe("function");
  });

  it("should call restaurantModel.findByIdAndDelete", async () => {
    await restaurantController.deleteRestaurant(req, res, next);
    expect(restaurantModel.findByIdAndDelete).toHaveBeenCalled();
  });

  it("should return 200", async () => {
    restaurantModel.findByIdAndDelete.mockReturnValue(newRestaurant[0]);
    await restaurantController.deleteRestaurant(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return delete message", async () => {
    restaurantModel.findByIdAndDelete.mockReturnValue(newRestaurant[0]);
    await restaurantController.deleteRestaurant(req, res, next);
    expect(res._getData()).toStrictEqual(
      `Document with ${newRestaurant[0].name} has been deleted..`
    );
  });

  it("should return 400 on error", async () => {
    const errorMessage = { message: "Error deleting restaurant" };
    const rejectedPromise = Promise.reject(errorMessage);
    restaurantModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await restaurantController.deleteRestaurant(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toStrictEqual({
      message: "Error deleting restaurant",
    });
  });
});
