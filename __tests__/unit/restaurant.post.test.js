const restaurantModel = require('../../model/restaurant');
const httpMocks = require('node-mocks-http');
const newRestaurant = require('../mock-data/new-restaurant.json');
const restaurantController = require('../../controllers/todo.controller'); 

restaurantModel.prototype.save = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe('RestaurantController.createRestaurant', () => {
    beforeEach(() => {
        req.body = newRestaurant;
    });

    it('should have a createRestaurant function', () => {
        expect(typeof restaurantController.createRestaurant).toBe('function');
    });

    it('should call restaurantModel.save', async () => {
        await restaurantController.createRestaurant(req, res, next);
        expect(restaurantModel.prototype.save).toHaveBeenCalled();
    });

    it('should return 201', async () => {
        restaurantModel.prototype.save.mockReturnValue(newRestaurant);
        await restaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json', async () => {
        restaurantModel.prototype.save.mockReturnValue(newRestaurant);
        await restaurantController.createRestaurant(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });

    it('should return error on error', async () => {
        const errorMessage = { message: 'Error saving restaurant' };
        const rejectedPromise = Promise.reject(errorMessage);
        restaurantModel.prototype.save.mockReturnValue(rejectedPromise);
        await restaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toStrictEqual({ message: 'Error saving restaurant' });
    });
});
