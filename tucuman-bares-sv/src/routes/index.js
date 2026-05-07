const { Router } = require("express");
const {
  createNewBarHandler,
  getAllBarsHandler,
  updateBarHandler,
  deleteBarHandler,
  getBarByIdHandler,
  createNewBarManualHandler
} = require("../handlers/publicHandler");

const { 
  generateDescriptionWithAI,
  checkDuplicateWithAI
} = require("../handlers/iaHandler");

const router = Router();



router.get("/sync-bars", createNewBarHandler);
router.post("/bars/create", createNewBarManualHandler);
router.get("/bars", getAllBarsHandler);

router.put("/bars/delete/:id", deleteBarHandler);
router.put("/bars/:id", updateBarHandler);

router.get("/bars/:id", getBarByIdHandler);
router.post("/generate-description", generateDescriptionWithAI);
router.post("/check-duplicate", checkDuplicateWithAI);

module.exports = router;