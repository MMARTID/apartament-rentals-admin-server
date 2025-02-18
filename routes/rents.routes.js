const router = require("express").Router();
const Rents = require("../models/Rent.model.js");

// GET => /api/rents/all   
//! OBTENER TODOS LOS RENTS 
router.get("/all", async (req, res, next) => {
  const allRents = await Rents.find()
    res.json(allRents);
});

// GET => api/rents/own/all
//!OBTENER LOS RENTS DEL USUARIO LOGUEADO (PAYLOAD)
router.get("/own/all", async (req, res, next) => {
  const { _id } = req.payload
  const allRents = await Rents.find({owner: _id})
    res.json(allRents);
});

// GET => /api/rents/user/:userId
//! OBTENER TODOS LOS RENTS DE UN USUARIO 


// GET => /api/rents/own/favorites
//! OBTENER TODOS LOS RENTS FAVORITOS DEL USUARIO LOGUEADO (PAYLOAD)


// PATCH => /api/rents/:rentId/edit
//! EDITAR UN RENT


// POST => /api/rents/create
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

// DELETE => /api/rents/:rentId/delete
//! ELIMINAR UN RENT

module.exports = router;