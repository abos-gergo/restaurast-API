const express = require("express");
const router = express.Router();
const restaurantModel = require("../model/restaurant");
const restaurantController = require("../controllers/restaurant.controller");

router.get("/", restaurantController.findRestaurants);
router.get("/:id", restaurantController.findRestaurant);
router.post("/", restaurantController.createRestaurant);
router.patch("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
