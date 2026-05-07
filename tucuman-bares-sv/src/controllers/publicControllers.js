const { Bar } = require("../db");
const { Op } = require("sequelize");

/* Crear nuevo bar */
const createNewBar = async (
  nombre,
  categoria,
  ubicacion,
  descripcion,
  image,
  fuente,
  scraped_at
) => {
  const [bar] = await Bar.findOrCreate({
    where: { nombre },
    defaults: {
      categoria,
      ubicacion,
      descripcion,
      image,
      fuente,
      scraped_at,
    },
  });

  return bar;
};

const createNewBarManual = async (
  nombre,
  categoria,
  ubicacion,
  descripcion,
  image,
  fuente,

) => {
  const [bar] = await Bar.findOrCreate({
    where: { nombre },
    defaults: {
      categoria,
      ubicacion,
      descripcion,
      image,
      fuente,

    },
  });

  return bar;
};

const getAllBars = async () => {
  const bars = await Bar.findAll({
    where: {
      is_active: true, // Solo traigo los bares que están activos
    },
    order: [["id", "ASC"]],
  });

  return bars;
};
const getBarbyId = async (id) => {
  const bar = await Bar.findByPk(id);

  if (!bar) {
    throw new Error("El bar no fue encontrado en la base de datos");
  }

  return bar;
};


const updateBar = async (
  id,
  nombre,
  categoria,
  ubicacion,
  descripcion,
  image,
  fuente,
  scraped_at
) => {

  if (nombre) {
    const existeBar = await Bar.findOne({
      where: {
        nombre: nombre,
        id: { [Op.ne]: id }, 
      },
    });
    if (existeBar) {
      throw new Error("Ya existe otro establecimiento registrado con este nombre.");
    }
  }


  const bar = await Bar.findByPk(id);

  if (!bar) {
    throw new Error("El bar no fue encontrado en la base de datos");
  }

  await bar.update({
    nombre,
    categoria,
    ubicacion,
    descripcion,
    image,
    fuente,
    scraped_at,
  });

  return bar;
};

// borrado logico: se marca el bar como inactivo en lugar de eliminarlo físicamente de la base de datos

const deleteBar = async (id) => {
  const bar = await Bar.findByPk(id);

  if (!bar) {
    throw new Error("El bar no fue encontrado en la base de datos");
  }

   await bar.update({
    is_active: false,
  });
  return { message: "Bar eliminado correctamente" };
};

module.exports = {
  createNewBar,
  getAllBars,
  getBarbyId,
  updateBar,
  deleteBar,
  createNewBarManual
};
