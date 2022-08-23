const router = require("express").Router();
const userRoutes = require("./user-routes");
// const thoughtsRoutes = require("./thoughts-routes");
const thoughtRoutes = require("./thoughts-routes");

router.use("/user", userRoutes);
router.use("/thougths", thoughtRoutes);

module.exports = router;
