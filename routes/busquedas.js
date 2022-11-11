const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {getTodo, getDocumentosColeccion} = require("../controllers/busquedas");


const router = Router();

router.get("/:todo",validarJWT, getTodo);
router.get("/coleccion/:tabla/:todo",validarJWT, getDocumentosColeccion);


module.exports = router;

