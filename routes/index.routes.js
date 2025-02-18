const router = require("express").Router();

// GET => api/
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const rentsRoutes = require("./rents.routes");
router.use("/rents", rentsRoutes);

const usersRoutes = require("./users.routes");
router.use("/users", usersRoutes);


const { verifyToken } = require("../middlewares/auth.middlewares")

// EJEMPLO DE RUTA PRIVADA
router.get("/private-route-example", verifyToken, async (req, res) => {

  console.log(req.headers)

  // EL BACKEND NECESITA SABER QUIEN ES EL USUARIO
  console.log(req.payload)

  res.send("envio de información privada o acción privada jeje")

})

module.exports = router;
