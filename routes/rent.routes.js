const router = require("express").Router();
const Rents = require("../models/Rent.model.js");


router.get("/", async (req, res, next) => {
    res.json("en la carpeta de rents");
});
router.post("/create", async (req, res, next) => {
  try {
    const {
      name
      
    } = req.body;
    const newRent = await Rents.create({
      name,
      
    });
    res.status(201).json(newRent);
  } catch (e) {
    next(e);
  }
});
module.exports = router;