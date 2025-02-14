const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


const rentsRoutes = require("./rent.routes");
router.use("/rents", rentsRoutes);

module.exports = router;
