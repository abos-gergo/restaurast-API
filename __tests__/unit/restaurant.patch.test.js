const restaurantModel = require("../../model/restaurant");
const httpMocks = require("node-mocks-http");
const newRestaurant = require("../mock-data/new-restaurant.json");
const restaurantController = require("../../controllers/restaurant.controller");

restaurantModel.findByIdAndUpdate = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("RestaurantController.updateRestaurant", () => {
  beforeEach(() => {
    req.params.id = 0;
    req.body = newRestaurant[0];
  });

  it("should have a updateRestaurant function", () => {
    expect(typeof restaurantController.updateRestaurant).toBe("function");
  });

  it("should call restaurantModel.findByIdAndUpdate", async () => {
    await restaurantController.updateRestaurant(req, res, next);
    expect(restaurantModel.findByIdAndUpdate).toHaveBeenCalled();
  });

  it("should return 200", async () => {
    restaurantModel.findByIdAndUpdate.mockReturnValue(newRestaurant[0]);
    await restaurantController.updateRestaurant(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json", async () => {
    restaurantModel.findByIdAndUpdate.mockReturnValue(newRestaurant[0]);
    await restaurantController.updateRestaurant(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newRestaurant[0]);
  });

  it("should return 400 on error", async () => {
    const errorMessage = { message: "Error updating restaurant" };
    const rejectedPromise = Promise.reject(errorMessage);
    restaurantModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await restaurantController.updateRestaurant(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toStrictEqual({
      message: "Error updating restaurant",
    });
  });
});
