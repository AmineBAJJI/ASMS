const express = require("express");
const router = express.Router();
const absenceController = require("../controllers/absenceController");

router.get("/absences", absenceController.getAllAbsences);

router.get(
  "/absences/student_id/:student_id",
  absenceController.getAbsenceByStudentId
);

router.post("/absences/add", absenceController.addAbsences);

router.put("/absences/:absenceId", absenceController.updateAbsence);

router.get("/absences/class/:class", absenceController.getAbsenceByClass);

module.exports = router;
