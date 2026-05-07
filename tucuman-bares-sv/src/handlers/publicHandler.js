const {
  createNewBar,
  getAllBars,
  updateBar,
  getBarbyId,
  deleteBar,
  createNewBarManual
} = require("../controllers/publicControllers");
const scrapeBars = require("../scraper/barScrapers");

const createNewBarHandler = async (req, res) => {
  try {
    const bars = await scrapeBars();

    if (!bars || bars.length === 0) {
      return res.status(404).json({ message: "No se encontraron bares para sincronizar" });
    }

    const createdBars = [];
    for (const bar of bars) {
      const {
        nombre,
        categoria,
        ubicacion,
        descripcion,
        image,
        fuente,
        fecha_obtencion,
      } = bar;

      const newBar = await createNewBar(
        nombre,
        categoria,
        ubicacion,
        descripcion,
        image,
        fuente,
        fecha_obtencion
      );
      createdBars.push(newBar);
    }

    res.status(201).json({
      message: "Sincronizacion de bares finalizada exitosamente",
      count: createdBars.length,
      data: createdBars,
    });
  } catch (error) {
    console.error("Error al sincronizar los bares:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const createNewBarManualHandler = async (req, res) => {
  try {

    const {
      nombre,
      categoria,
      ubicacion,
      descripcion,
      image,
      fuente,

    } = req.body;

  
    console.log("Datos recibidos:", req.body);



    const newBar = await createNewBarManual(
      nombre,
      categoria ,
      ubicacion,
      descripcion ,
      image ,
      fuente
    );

    return res.status(201).json(newBar);
  } catch (error) {
    console.error("Error en DB:", error.message);
    return res.status(500).json({ error: error.message });
  }
};




const getAllBarsHandler = async (_req, res) => {
  try {
    const bars = await getAllBars();
    res.status(200).json(bars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBarByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const bar = await getBarbyId(id);

    if (!bar) {
      return res.status(404).json({ message: "Bar no encontrado" });
    }

    res.status(200).json(bar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBarHandler = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    categoria,
    ubicacion,
    descripcion,
    image,
    fuente,
    scraped_at,
  } = req.body;

  try {
    const updatedBar = await updateBar(
      id,
      nombre,
      categoria,
      ubicacion,
      descripcion,
      image,
      fuente,
      scraped_at
    );

    if (!updatedBar) {
      throw new Error("El bar no pudo ser actualizado");
    }

    res.status(200).json(updatedBar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBarHandler = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error("El id es obligatorio para eliminar el registro");
    }

    const result = await deleteBar(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createNewBarHandler,
  getAllBarsHandler,
  updateBarHandler,
  getBarByIdHandler,
  deleteBarHandler,
  createNewBarManualHandler
};
