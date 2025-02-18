const router = require("express").Router();
const User = require("../models/User.model.js");
//rutas de usuario

//! OBTEER TODOS LOS USUARIOS 

//! EDITAR USUARIO

//! crear usuario (provisional, tiene que ir en auth.routes)
// GET => /api/users/create
router.post("/create", async (req, res, next) => {
    const {
      name,
      email,
      password,
      rents,
      role,
      friends
    } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
      rents,
      role,
      friends
    });
    res.status(201).json(newUser);
  } catch (e) {
    next(e);
    res.status(500).json({ message: "Error creating user" });

  }
})
module.exports = router;