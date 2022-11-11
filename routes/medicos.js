/*
    /api/medicos
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
// const {
//   getHospitales,
//   crearHospital,
//   actualizarHospital,
//   borrarHospital
// } = require("../controllers/hospitales");

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
  } = require("../controllers/medicos");

const router = Router();

router.get("/", getMedicos);

router.post("/", [
  validarJWT,
  check("nombre", "El nombre del médico es requerido").not().isEmpty(),
  check("hospital", "El hospitalId debe de ser válido").isMongoId(),
  validarCampos
], crearMedico);

router.put(
  "/:id",
  [
   
  ],
  actualizarMedico
);

router.delete("/:id", borrarMedico);

module.exports = router;
