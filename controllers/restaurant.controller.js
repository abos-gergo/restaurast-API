const restaurantModel = require("../model/restaurant");

exports.findRestaurants = async (req, res) => {
  try {
    const data = await restaurantModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findRestaurant = async (req, res) => {
  try {
    const data = await restaurantModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRestaurant = async (req, res) => {
  const data = new restaurantModel(req.body);
  try {
    const dataToSave = await data.save();
    res.status(201).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await restaurantModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await restaurantModel.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
