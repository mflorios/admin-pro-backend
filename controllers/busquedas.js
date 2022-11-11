//getTodo

const { response } = require("express");

const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getTodo = async (req, res = response) => {
  const todo = req.params.todo;
  const regex = new RegExp(todo, "i");

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  return res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentosColeccion = async (req, res = response) => {
  const todo = req.params.todo;
  const tabla = req.params.tabla;
  const regex = new RegExp(todo, "i");
  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
                         .populate('usuario', 'nombre img')
                         .populate('hospital', 'nombre img');
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regex })
                            .populate('usuario', 'nombre img');
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regex });

      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "la tabla tiene que ser usuarios, médicos o hospitales",
      });
  }

  res.json({
    ok: true,
    tabla,
    resultados: data,
  });



  
};

module.exports = { getTodo, getDocumentosColeccion };
