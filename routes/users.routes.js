const router = require("express").Router();
const User = require("../models/User.model.js");
//rutas de usuario
// GET => /api/users/all
//! OBTEER TODOS LOS USUARIOS 
router.get("/all", async (req, res, next) => {
  try {
    const allUsers = await User.find()
    res.json(allUsers);
  } catch (e) {
    
  }
});

// GET => /api/users/:userId
//! OBTENER UN USUARIO POR SU ID
router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId)
    res.json(user);
  } catch (e) {
    next(e);
  }
  
});

// PATCH => /api/users/own/:userId/edit
//! EDITAR USUARIO (PAYLOAD)
router.patch("/own/:userId/edit", async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { name, email, password });
    res.json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;