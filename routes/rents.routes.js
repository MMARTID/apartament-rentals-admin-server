const router = require("express").Router();
const Rents = require("../models/Rent.model.js");

// GET => /api/rents/all    
router.get("/all", async (req, res, next) => {
  const allRents = await Rents.find()
    res.json(allRents);
});
// GET => /api/rents 
//! AÑADIR PARAMTRO DINAMICO CON EL ID DEL USUARIO QUE VA A CREAR EL RENT
//! COMPARARLO CON EL ID DEL USUARIO QUE ESTA LOGUEADO
router.post("/create", async (req, res, next) => {
  try {
    const {
      owner,
      location,
      spaces,
      description,
      images_URL,
      pricePerNight,
      rules,
      amenities,
      rent_type
    } = req.body;
    const newRent = await Rents.create({
      owner,
      location,
      spaces,
      description,
      images_URL,
      pricePerNight,
      rules,
      amenities,
      rent_type
      
    });
    res.status(201).json(newRent);
  } catch (e) {
    next(e);
  }
});
module.exports = router;