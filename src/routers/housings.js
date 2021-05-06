const express = require("express");
const upload = require("../../utils/multer");

const HousingControls = require("../../controllers/HousingController");

const router = new express.Router();

router.post(
  "/housings",
  upload.array("image", 8),
  HousingControls.createHousing
);

router.get("/housings", HousingControls.getAllHousing);

router.get(
  "/housings/:city/:leasecontract/:housingtype",
  HousingControls.getHousingFilter
);

router.get("/housings/:id", HousingControls.getHousingId);

/* router.get("/housing/:id", HousingControls.getHousingIDNoClient); */

router.patch(
  "/housings/:id",
  upload.array("image", 8),
  HousingControls.patchHousing
);

router.delete("/housings/:id", HousingControls.deleteHousing);

module.exports = router;
