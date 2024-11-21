const restaurantModel = require("../../model/restaurant");
const httpMocks = require("node-mocks-http");
const newRestaurant = require("../mock-data/new-restaurant.json");
const restaurantController = require("../../controllers/restaurant.controller");

restaurantModel.find = jest.fn();
restaurantModel.findById = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("RestaurantController.findRestaurants", () => {
  it("should have a findRestaurants function", () => {
    expect(typeof restaurantController.findRestaurants).toBe("function");
  });

  it("should call restaurantModel.find", async () => {
    await restaurantController.findRestaurants(req, res, next);
    expect(restaurantModel.find).toHaveBeenCalled();
  });

  it("should return with code 200", async () => {
    restaurantModel.find.mockReturnValue(newRestaurant);
    await restaurantController.findRestaurants(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json equal to mock data", async () => {
    restaurantModel.find.mockReturnValue(newRestaurant);
    await restaurantController.findRestaurants(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newRestaurant);
  });

  it("should return 500 on error", async () => {
    const errorMessage = { message: "Error getting restaurant" };
    const rejectedPromise = Promise.reject(errorMessage);
    restaurantModel.find.mockReturnValue(rejectedPromise);
    await restaurantController.findRestaurants(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      message: "Error getting restaurant",
    });
  });
});

describe("RestaurantController.findRestaurant", () => {
  beforeEach(() => {
    req.params.id = 0;
  });

  it("should have a findRestaurant function", () => {
    expect(typeof restaurantController.findRestaurant).toBe("function");
  });

  it("should call restaurantModel.findById", async () => {
    await restaurantController.findRestaurant(req, res, next);
    expect(restaurantModel.findById).toHaveBeenCalled();
  });
  it("should return 200", async () => {
    restaurantModel.findById.mockReturnValue(newRestaurant[req.params.id]);
    await restaurantController.findRestaurant(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json", async () => {
    restaurantModel.findById.mockReturnValue(newRestaurant[req.params.id]);
    await restaurantController.findRestaurant(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newRestaurant[req.params.id]);
  });

  it("should return 500 on error", async () => {
    const errorMessage = { message: "Error getting restaurant" };
    const rejectedPromise = Promise.reject(errorMessage);
    restaurantModel.findById.mockReturnValue(rejectedPromise);
    await restaurantController.findRestaurant(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({
      message: "Error getting restaurant",
    });
  });
});
