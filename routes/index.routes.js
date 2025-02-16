const router = require("express").Router();

// GET => api/
router.get("/", (req, res, next) => {
  res.json("All good in here");
});


const rentsRoutes = require("./rents.routes");
router.use("/rents", rentsRoutes);
const usersRoutes = require("./users.routes");
router.use("/users", usersRoutes);

module.exports = router;
