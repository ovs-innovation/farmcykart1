const router = require("express").Router();

const { getTaxes, addTax, deleteTax } = require("../controller/taxController");

router.get("/", getTaxes);
router.post("/add", addTax);
router.delete("/:id", deleteTax);

module.exports = router;
