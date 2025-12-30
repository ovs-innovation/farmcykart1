const express = require("express");

const {
  addBrand,
  getAllBrands,
  getShowingBrands,
  getBrandById,
  updateBrand,
  updateBrandStatus,
  deleteBrand,
  deleteManyBrands,
} = require("../controller/brandController");

const router = express.Router();

router.post("/add", addBrand);
router.get("/", getAllBrands);
router.get("/show", getShowingBrands);
router.get("/:id", getBrandById);
router.put("/:id", updateBrand);
router.put("/status/:id", updateBrandStatus);
router.delete("/:id", deleteBrand);
router.patch("/delete/many", deleteManyBrands);

module.exports = router;

